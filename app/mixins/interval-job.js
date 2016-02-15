import Ember from 'ember';

export default Ember.Mixin.create({
  createJob(fn, interval) { //TODO maybe we should somehow include managing of willDestroy Ember.run.cancel(timer) in the mixin
    let timer;
    return {
      run() {
        if (timer) { throw new Error('already running - you can only call run again after you call stop.'); }
        timer = Ember.run.later(() => {
          timer = undefined;
          fn();
          this.run(fn);  //TODO maybe the timeoutNext should trigger once the fun is actually done - it might be async (like loading img ?)
        }, interval);
        return this;  //for chaining
      },

      stop() {
        Ember.run.cancel(timer);
        timer = undefined;
      },
      reRun() {
        this.stop();
        this.run();
      },
      setIntervalTime(newInterval,options) {
        interval = newInterval;
        if(options && options.reRun){
          this.reRun();
        }
      },
    }
  }
});
