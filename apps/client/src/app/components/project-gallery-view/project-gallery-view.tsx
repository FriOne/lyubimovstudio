import React, { FunctionComponent, useCallback } from 'react';

import './project-gallery-view.css';

import { Project } from '@lyubimovstudio/api-interfaces';

import { bemClassName, getPicturesUrl } from '../../utils/helpers';

type Props = {
  className?: string;
  project: Project;
  onProjectClick(project: Project): void;
};

const cls = bemClassName('project-gallery-view');

export const ProjectGalleryView: FunctionComponent<Props> = (props) => {
  const { className = '', project, onProjectClick } = props;

  const onClick = useCallback(() => onProjectClick(project), []);

  return (
    <div className={cls(null, [className])} onClick={onClick}>
      {project.pictures?.[0] && (
        <img
          className={cls('picture')}
          src={getPicturesUrl(project.pictures?.[0].image.name)}
        />
      )}
    </div>
  );
};
