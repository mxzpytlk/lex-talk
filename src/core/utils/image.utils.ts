import ScreenConverter, { IPoint } from './geometry.utils';
import { canvastoFile, EImageType } from 'image-conversion';
import config from '../../assets/config.json';
import { getAuthHeader, updateAvatarUrl } from './api.utils';

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
	return canvastoFile(canvas, 0.95, EImageType.JPEG);
}

export function cutSquareImage(
	img: HTMLImageElement,
	x: number,
	y: number,
	size: number,
	resultSize?: number
): Promise<Blob>  {
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
): Promise<Blob>  {
	const converter = new ScreenConverter(img.height * scale, img.naturalHeight, {
		x: (img.width * scale - recWidth) / 2,
		y: (img.height * scale - recHeight) / 2,
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
	scale = 1
): Promise<Blob>  {
	return scaleAndCutImage(img, x, y, size, size, resultSize, resultSize, scale);
}

export function getImgUrl(imgId: string): string {
	return `${config.serverUrl}/api/file/${imgId}`;
}

export async function updateAvatar(img: Blob): Promise<string> {
	const res = await fetch(updateAvatarUrl(), {
		method: 'POST',
		body: img,
		headers: {
			authorization: getAuthHeader(),
		},
	});
	const imgId = await res.text();
	return imgId.replaceAll('"', '');
}
