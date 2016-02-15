import Ember from 'ember';
import IntervalJob from 'airhelp/mixins/interval-job';

export default Ember.Component.extend(IntervalJob, {
  classNames: ['carousel', 'slide'],
  interval: 2,
  curIndex: 0,
  itemsArr: Ember.A(),
  intervalOptions: [1, 2, 3, 5, 10, 15],

  init() {
    this._super(...arguments);
    this.intervalJob = this.createJob(this.moveToNext.bind(this), this.interval * 1000).run();
  },

  willDestroy() {
    this._super(...arguments);
    this.intervalJob.stop();
  },

  // intervalChanged(newInterval) {
  //   this.intervalJob.setIntervalTime(newInterval, {reRun: true});
  // },

  cur: Ember.computed('curIndex','itemsArr', function() {
    console.log('computing cur based on curIndex and itemsArr');
		var curIndex = this.curIndex;
    var itemsArr = this.itemsArr;
		var curItem = itemsArr[curIndex];
		return curItem;
	}),

  isLastItem() {
    return this.curIndex === this.itemsArr.length - 1;
  },


  isAtStart: Ember.computed.equal('curIndex',0),

  isAtEnd: Ember.computed('curIndex','itemsArr.length', function() {
    return this.isLastItem();
  }),

  didUpdateAttrs() {
    this._super(...arguments);
    console.log('didUpdateAttrs');
  },
  didReceiveAttrs() {
    this._super(...arguments);
    console.log('didReceiveAttrs',arguments);
    this.set('curIndex',0);
    this.set('itemsArr',this.getAttr('items'));//tcan get it also using attrs proxy like this.get('items') or from first arg passed to this fun - for example arguments[0].newAttrs.items.value - but it seem like not the way to go. Although i have not found getAttr in official docs
  },

  moveToNext() {
    if(!this.isLastItem()) {
      this.set('curIndex',this.curIndex + 1);
    }
    else {
      console.log('no more items');
    }
  },

  moveToPrev() {
    var curIndex = this.curIndex;
    if(curIndex > 0) {
      this.set('curIndex',curIndex - 1);
    }
    else {
      console.log('we are at the first item');
    }
  },

  actions: {
    changeInterval(newIntervalInSeconds) {
      this.intervalJob.setIntervalTime(newIntervalInSeconds * 1000, {reRun: true});
    },
    next(){
      this.intervalJob.reRun();
      this.moveToNext();
  	},
    prev() {
      this.intervalJob.reRun();
      this.moveToPrev();
    }
  }
});
