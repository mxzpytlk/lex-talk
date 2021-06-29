import { useEffect, useState } from 'react';
import { scaleAndCutSquareImg } from '../../core/utils/image.utils';
import './image-cuter.scss';

type ImageCuterProps = {
	file: File,
  shouldCut: boolean,
  cutFn?: (url: string) => unknown,
};

export function ImageCuter(props: ImageCuterProps) {
	const src = window.URL.createObjectURL(props.file);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);
	const [dx, setDx] = useState(0);
	const [dy, setDy] = useState(0);

	const imgStyle = {
		transform: `translate(${dx}px, ${dy}px)`,
	};

	const gridSize = width > 300 ? 300 : width;

	const gridStyle = {
		width: `${gridSize}px`,
		height: `${gridSize}px`,
	};

	useEffect(() => {
		setDx(0);
		setDy(0);
	}, [props.file]);

	const img = new Image();

	img.src = src;

	img.onload = () => {
		img.width /= img.naturalHeight / 300;
		img.height = 300;
		setWidth(img.width);
		setHeight(img.height);
    if (props.shouldCut) {
      props.cutFn?.(scaleAndCutSquareImg(img, -dx, -dy, gridSize));
    }
	};

	const onMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const { clientX, clientY } = e;
		const widthLimit = (width - gridSize) / 2;
		const heightLimit = (height - gridSize) / 2;

		if (posX && posY) {
			if (height === 300 && Math.abs(posX - clientX) < widthLimit) {
				setDx(clientX - posX);
			} else if (width < height && Math.abs(posY - clientY) <= heightLimit) {
				setDy(clientY - posY);
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
			>
				<div className="cut__cutter_side"></div>
				<div className="cut__cutter_center">
					<div className="cut__cutter_side"></div>
					<table className="cut__cutter_grid" style={gridStyle}>
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
					</table>
					<div className="cut__cutter_side"></div>
				</div>
				<div className="cut__cutter_side"></div>
			</div>
		</div>
	);
}
