import { useEffect, useState } from 'react';
import { getImgUrl } from '../../core/utils/image.utils';
import classes from './loaded-image.module.scss';
import ReactLoading from 'react-loading';
import classnames from 'classnames';

interface ILoadImgProps {
	id?: string;
  size: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => unknown;
  style?: React.CSSProperties | undefined;
  src?: string;
  children?: JSX.Element;
  className?: string;
  loadingColor?: string;
}

export function LoadedImage(props: ILoadImgProps): JSX.Element {
  const [imgSrc, setImgSrc] = useState('');
  const loadingColor = props.loadingColor || 'blue';

  useEffect(() => {
    const src = props.src || getImgUrl(props.id as string);
    if (props.src || props.id) {
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        img.remove();
      };
    }
  }, [props.src, props.id]);

  const pictureStyle = {
    backgroundImage: `url(${imgSrc})`,
    width: `${props.size}px`,
    height: `${props.size}px`,
    borderRadius: '50%',
    ...props.style
  };

  if (imgSrc) {
    return (
      <div
        className={classnames(classes.img, props.className)}
        style={pictureStyle}
        onClick={(e) => props.onClick?.(e)}
      >
        {props.children}
      </div>
    );
  }

  return <ReactLoading
    type={'spinningBubbles'}
    color={loadingColor}
    height={props.size}
    width={props.size}
    className={props.className}
  />;
}
