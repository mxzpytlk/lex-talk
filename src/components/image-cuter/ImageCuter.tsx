import { useEffect, useState } from 'react';
import { scaleAndCutSquareImg } from '../../core/utils/image.utils';
import './image-cuter.scss';

type ImageCuterProps = {
	file: File,
	shouldCut: boolean,
	cutFn?: (img: Blob) => unknown,
};

export function ImageCuter(props: ImageCuterProps) {
	const src = window.URL.createObjectURL(props.file);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);
	const [dx, setDx] = useState(0);
	const [dy, setDy] = useState(0);
	const [scale, setScale] = useState(1);

	const imgStyle = {
		transform: `translate(${dx * scale}px, ${dy * scale}px) scale(${scale})`,
	};

	const gridSize = width > 300 ? 300 : width;

	const gridStyle = {
		width: `${gridSize}px`,
		height: `${gridSize}px`,
	};

	useEffect(() => {
		setDx(0);
		setDy(0);
		setScale(1);
	}, [props.file]);

	const img = new Image();

	img.src = src;

	img.onload = async () => {
		img.width /= img.naturalHeight / 300;
		img.height = 300;
		setWidth(img.width);
		setHeight(img.height);
		if (props.shouldCut) {
			props.cutFn?.(await scaleAndCutSquareImg(img, -dx, -dy, gridSize, gridSize, scale));
		}
	};

	const getDiff = (
		clientCoord: number,
		posCoord: number,
		dif: number,
		set: (n: number) => void
	) => {
		const eps = 3;
		if (Math.abs(clientCoord - posCoord) <= eps) {
			return dif;
		}
		const directCoef = 5;
		set(clientCoord);
		return dif + (clientCoord > posCoord ? directCoef : -directCoef);
	};

	const onMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();
		const { clientX, clientY } = e;
		const widthLimit = (width - gridSize / scale) / 2;
		const heightLimit = (height - gridSize / scale) / 2;

		if (posX || posY) {
			const resultDx = getDiff(clientX, posX, dx, setPosX);
			const resultDy = getDiff(clientY, posY, dy, setPosY);

			if (Math.abs(resultDx) < widthLimit) {
				setDx(resultDx);
			}
			if (Math.abs(resultDy) < heightLimit) {
				setDy(resultDy);
			}
		}
	};

	const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		const deltaY = e.deltaY;
		const scaleCoef = deltaY > 0 ? 1 / 1.05 : 1.05;
		const resultScale = scale * scaleCoef;
		if (resultScale >= 1 && resultScale <= 3) {
			setScale(resultScale);
			if (scaleCoef < 1) {
				setDx(dx * scaleCoef);
				setDy(dy * scaleCoef);
			}
		}
	};

	const onMouseUp = () => {
		if (posX || posY) {
			setPosX(0);
			setPosY(0);
		}
	};

	return (
		<div className="cut__container">
			{(posX || posY) && (
				<div className="cut__move" onMouseUp={onMouseUp} onMouseMove={onMove}></div>
			)}
			<img
				src={src}
				alt=""
				height={height}
				width={width}
				style={imgStyle}
				className="cut__img"
				draggable="false"
			/>
			<div
				className="cut__cutter"
				onMouseDown={(e) => {
					setPosX(e.clientX);
					setPosY(e.clientY);
				}}
				onWheel={onWheel}
			>
				<div className="cut__cutter_side"></div>
				<div className="cut__cutter_center">
					<div className="cut__cutter_side"></div>
					<table className="cut__cutter_grid" style={gridStyle}>
						<tbody>
							<tr>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
					<div className="cut__cutter_side"></div>
				</div>
				<div className="cut__cutter_side"></div>
			</div>
		</div>
	);
}
