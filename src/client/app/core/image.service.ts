import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  RequestOptions,
  URLSearchParams,
} from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import { Observable } from 'rxjs/Observable';

import { PinImage } from '../helpers/pin-image';
import { retry } from '../helpers/retry';

@Injectable()
export class ImageService {
  private url = '/api/v1/image';

  constructor(private http: Http) {
  }

  list(skip = 0, limit = 10): Observable<PinImage[]> {
    const search = new URLSearchParams();
    search.set('skip', String(skip));
    search.set('limit', String(limit));

    return this.http
      .get(this.url, { search })
      .map((res) => res.json().images as PinImage)
      .retryWhen(retry())
      .catch(() => Observable.of([]));
  }

  getOwn(): Observable<PinImage[]> {
    return this.http
      .get(this.url + '/me')
      .map((res) => res.json().images as PinImage)
      .retryWhen(retry())
      .catch(() => Observable.of([]));
  }

  upload(url: string, description: string): Observable<PinImage> {
    return this.http
      .post(this.url, { url, description }, this.jsonHeaders())
      .map((res) => res.json().image as PinImage)
      .retryWhen(retry())
      .catch(this.handleError);
  }

  like(imageID: string): Observable<PinImage> {
    return this.http
      .put(this.url, { imageID }, this.jsonHeaders())
      .map((res) => res.json().image as PinImage)
      .retryWhen(retry())
      .catch(this.handleError);
  }

  delete(imageID: string): Observable<PinImage> {
    const options = this.jsonHeaders();
    options.body = { imageID };

    return this.http
      .delete(this.url, options)
      .map((res) => res.json().image as PinImage)
      .retryWhen(retry())
      .catch(this.handleError);
  }

  private handleError(err: any): Observable<string> {
    return err.json ?
      Observable.throw(err.json().error as string) :
      Observable.throw(String(err));
  }

  private jsonHeaders() {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return new RequestOptions({ headers });
  }
}
