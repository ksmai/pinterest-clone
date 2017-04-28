import { AbstractControl } from '@angular/forms';

let timer: any;

export function imageURLValidator(control: AbstractControl): Promise<any> {
  if (!document || !document.createElement) {
    return Promise.resolve(null);
  }

  clearTimeout(timer);

  return new Promise((resolve) => {
    timer = setTimeout(() => {
      const img = document.createElement('img');
      img.src = control.value;
      img.onload = () => {
        resolve(null);
        img.onload = null;
        img.onerror = null;
      };
      img.onerror = () => {
        resolve({ invalidURL: true });
        img.onload = null;
        img.onerror = null;
      };
    }, 500);
  });
}

export function httpURLValidator(control: AbstractControl): any {
  if (control.value && control.value.match(/^https?:\/\//)) {
    return null;
  }

  return { notHttp: true };
}
