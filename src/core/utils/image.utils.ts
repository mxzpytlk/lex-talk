import ScreenConverter, { IPoint } from './geometry.utils';

export function cutImage(
	img: HTMLImageElement,
	x: number,
	y: number,
	width: number,
	height: number
): Promise<Blob> {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	ctx?.drawImage(img, x, y, width, height, 0, 0, width, height);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob as Blob);
    }, 'image/jpeg');
  });
	// return canvas.toDataURL('image/jpeg');
}

export function cutSquareImage(img: HTMLImageElement, x: number, y: number, size: number) {
	return cutImage(img, x, y, size, size);
}

export function scaleAndCutImage(
	img: HTMLImageElement,
	x: number,
	y: number,
	recWidth: number,
	recHeight: number,
) {
	const converter = new ScreenConverter(img.height, img.naturalHeight, {
		x: (img.width - recWidth) / 2,
		y: (img.height - recHeight) / 2,
	});
	const leftUp: IPoint = converter.screenPointToReal({ x: x, y: y });
	const width = converter.screenSizeToReal(recWidth);
	const height = converter.screenSizeToReal(recHeight);
	return cutImage(img, leftUp.x, leftUp.y, width, height);
}

export function scaleAndCutSquareImg(
	img: HTMLImageElement,
	x: number,
	y: number,
	size: number
) {
	return scaleAndCutImage(img, x, y, size, size);
}
