import { PinImage } from './pin-image';
const placeholderImage = require('../../../../assets/placeholder.png');

export function showPlaceholder(image: PinImage): void {
  image.url = placeholderImage;
}
