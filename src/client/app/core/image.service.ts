import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ImageService {
  constructor(private http: Http) {
  }
}
