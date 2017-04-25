import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  available: boolean;

  constructor() {
    this.available = !!(window && window.localStorage);
  }

  getItem(key: string): any {
    if (!this.available) {
      return;
    }

    const value = window.localStorage.getItem(key);
    let parsed: any;
    try {
      parsed = JSON.parse(value);
    } catch (err) {
      parsed = null;
    }

    return parsed;
  }

  setItem(key: string, value: any): void {
    if (!this.available) {
      return;
    }

    let stringified: string;
    try {
      stringified = JSON.stringify(value);
    } catch (err) {
      return;
    }

    window.localStorage.setItem(key, stringified);
  }
}
