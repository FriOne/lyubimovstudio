import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSSR from 'use-ssr';

import './project-image-link.css';

import { bemClassName, getPicturesUrl, loadImage } from '../../utils/helpers';

type Props = {
  className?: string;
  projectId: number;
  imageName: string;
};

const cls = bemClassName('project-image-link');

export const ProjectImageLink: FunctionComponent<Props> = (props) => {
  const { className = '', projectId, imageName } = props;
  const imageUrl = getPicturesUrl(imageName);
  const { isBrowser } = useSSR();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    loadImage(imageUrl)
      .then(() => setImageLoaded(true))
      .catch(error => console.log('Image load error', error));
  }, []);

  if (isBrowser && !imageLoaded) {
    return null;
  }

  return (
    <Link className={cls(null, [className])} to={`/projects/${projectId}`}>
      {imageUrl && (
        <img
          className={cls('picture')}
          src={imageUrl}
        />
      )}
    </Link>
  );
};
