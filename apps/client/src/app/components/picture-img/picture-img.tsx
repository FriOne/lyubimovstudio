import React, { FunctionComponent, useEffect, memo, useState } from 'react';
import useSSR from 'use-ssr';

import './picture-img.css';

import { Picture } from '@lyubimovstudio/api-interfaces';

import { bemClassName, getPictureImageUrls, loadImage } from '../../utils/helpers';

type Props = {
  className?: string;
  picture: Picture;
  dontWaitUntilLoad?: boolean;
};

const cls = bemClassName('picture-img');

export const PictureImg: FunctionComponent<Props> = memo((props) => {
  const { className = '', picture, dontWaitUntilLoad = false } = props;
  const { name } = picture;
  const { small, srcSet } = getPictureImageUrls(name);

  const { isBrowser, isServer } = useSSR();
  const [imageLoaded, setImageLoaded] = useState(dontWaitUntilLoad);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (dontWaitUntilLoad) {
      return;
    }

    loadImage(small, srcSet)
      .then(() => setImageLoaded(true))
      .catch(error => console.log('Image load error', error));
  // eslint-disable-next-line
  }, [srcSet]);

  useEffect(() => {
    if (!imageLoaded) {
      return;
    }

    setTimeout(() => setAnimated(true));
  }, [imageLoaded]);

  if (isBrowser && !imageLoaded) {
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      className={cls({ animated: isServer || animated }, [className])}
      src={small}
      srcSet={srcSet}
    />
  );
});
