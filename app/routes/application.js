import Ember from 'ember';
import config from 'airhelp/config/environment';
import LoadingSliderMixin from '../mixins/loading-slider';
//const api_key = 'e84701cd3530ad15ba24004ccfe88877';
const api_key = config.APP.flickr.api_key;
export default Ember.Route.extend(LoadingSliderMixin, {
  queryParams: {
    text: {
      refreshModel: true
    }
  },
  model(params) {
    return Ember.RSVP.hash({
      letters: ['a','b','c'],
      images: [
        'assets/images/blue.png',
        'assets/images/gray.png',
        'assets/images/green.png',
        'assets/images/pink.png'
      ],
      flickr: Ember.$.ajax(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=${params.text}&format=json&nojsoncallback=1`),
    });
  }
});
