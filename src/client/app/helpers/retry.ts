import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

function shouldRetry(statusCode: number) {
  return [400, 401].indexOf(statusCode) === -1;
}

export function retry(count = 2, delay = 1000) {
  return (errors: Observable<any>) => errors
    .mergeMap(error => shouldRetry(error.status) ?
      Observable.of(error) :
      Observable.throw(error))
    .delay(delay)
    .take(count);
}
