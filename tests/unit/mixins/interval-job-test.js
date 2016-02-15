import Ember from 'ember';
import IntervalJobMixin from '../../../mixins/interval-job';
import { module, test } from 'qunit';

module('Unit | Mixin | interval job');

// Replace this with your real tests.
test('it works', function(assert) {
  let IntervalJobObject = Ember.Object.extend(IntervalJobMixin);
  let subject = IntervalJobObject.create();
  assert.ok(subject);
});
