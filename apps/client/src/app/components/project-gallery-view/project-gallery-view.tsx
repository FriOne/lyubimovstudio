import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';

import './project-gallery-view.css';

import { Project } from '@lyubimovstudio/api-interfaces';

import { bemClassName, getPicturesUrl, loadImage } from '../../utils/helpers';

type Props = {
  className?: string;
  project: Project;
  onProjectClick(project: Project): void;
};

const cls = bemClassName('project-gallery-view');

export const ProjectGalleryView: FunctionComponent<Props> = (props) => {
  const { className = '', project, onProjectClick } = props;
  const firstImageUrl = getPicturesUrl(project.pictures?.[0].image.name);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);

  useEffect(() => {
    loadImage(firstImageUrl)
      .then(() => setFirstImageLoaded(true))
      .catch(error => console.log('Image load error', error));
  }, []);

  const onClick = useCallback(() => onProjectClick(project), []);

  if (!firstImageLoaded) {
    return null;
  }

  return (
    <div className={cls(null, [className])} onClick={onClick}>
      {firstImageUrl && (
        <img
          className={cls('picture')}
          src={firstImageUrl}
        />
      )}
    </div>
  );
};
