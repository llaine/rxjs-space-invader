import Rx from 'rx';

var subject = new Rx.ReplaySubject(2);

subject.onNext(1);
subject.onNext(2);
subject.onNext(3);

subject.subscribe((n) => {
  console.log('Received n values', n);
});

