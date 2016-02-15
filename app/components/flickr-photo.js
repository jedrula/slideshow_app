import Ember from 'ember';

export default Ember.Component.extend({
  src: null,
  classNames: ['img-wrapper'],
  didReceiveAttrs() {
    const photo = this.getAttr('photo');
    const src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    this.set('src',src);
  }
});
