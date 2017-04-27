import { AbstractControl } from '@angular/forms';

export function imageURLValidator(control: AbstractControl): Promise<any> {
  if (!document || !document.createElement) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.src = control.value;
    img.onload = () => resolve(null);
    img.onerror = () => resolve({ invalidURL: true });
  });
}
