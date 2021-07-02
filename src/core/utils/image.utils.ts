import ScreenConverter, { IPoint } from './geometry.utils';

export function cutImage(
	img: HTMLImageElement,
	x: number,
	y: number,
	width: number,
	height: number,
  resultWidth?: number,
  resultHeight?: number
): Promise<Blob> {
	const canvas = document.createElement('canvas');
	canvas.width = resultWidth || width;
	canvas.height = resultHeight || height;
	const ctx = canvas.getContext('2d');
	ctx?.drawImage(img, x, y, width, height, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob as Blob);
    }, 'image/jpeg');
  });
}

export function cutSquareImage(
    img: HTMLImageElement,
    x: number,
    y: number,
    size: number,
    resultSize?: number
) {
	return cutImage(img, x, y, size, size, resultSize, resultSize);
}

export function scaleAndCutImage(
	img: HTMLImageElement,
	x: number,
	y: number,
	recWidth: number,
	recHeight: number,
  resultWidth?: number,
  resultHeight?: number,
  scale = 1
) {
	const converter = new ScreenConverter(img.height * scale, img.naturalHeight, {
		x: (img.width * scale - (recWidth)) / 2,
		y: (img.height * scale - (recHeight)) / 2,
	});
	const leftUp: IPoint = converter.screenPointToReal({ x: x * scale, y: y * scale });
	const width = converter.screenSizeToReal(recWidth);
	const height = converter.screenSizeToReal(recHeight);
	return cutImage(img, leftUp.x, leftUp.y, width, height, resultWidth, resultHeight);
}

export function scaleAndCutSquareImg(
	img: HTMLImageElement,
	x: number,
	y: number,
	size: number,
  resultSize?: number,
  scale = 1,
) {
	return scaleAndCutImage(img, x, y, size, size, resultSize, resultSize, scale);
}
