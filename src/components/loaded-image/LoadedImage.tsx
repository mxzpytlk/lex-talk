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
  isImgTag?: boolean;
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

  const size = props.isImgTag ? 'auto' : `${props.size}px`;

  const pictureStyle = {
    backgroundImage: !props.isImgTag && `url(${imgSrc})`,
    width: size,
    height: size,
    borderRadius: '50%',
    ...props.style
  };

  if (imgSrc) {
    if (props.isImgTag) {
      return (
        <img src={imgSrc}
          alt=""className={classnames(classes.img, props.className)}
          style={pictureStyle}
          onClick={(e) => props.onClick?.(e)}
        />
      );
    }

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
