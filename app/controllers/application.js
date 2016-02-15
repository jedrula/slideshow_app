import Ember from 'ember';

export default Ember.Controller.extend({
  text: 'ember.js',
  queryParams: ['text'],

  transitionWithNewQuery(newText) {
    this.transitionToRoute('application', {
      queryParams: {
        text: newText
      }
    });
  },

  actions: {
    textChanged(newText) {
      Ember.run.debounce(this, this.transitionWithNewQuery, newText, 5500);
    }
  }
});
