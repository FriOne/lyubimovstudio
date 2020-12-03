import React, { FunctionComponent } from 'react';

import './project-view.css';

import { Project } from '@lyubimovstudio/api-interfaces';

import { bemClassName, getPicturesUrl } from '../../utils/helpers';

type Props = {
  className?: string;
  project: Project;
};

const cls = bemClassName('project-view');

export const ProjectView: FunctionComponent<Props> = (props) => {
  const { className = '', project } = props;
  const { ruTitle, ruDescription, pictures = [] } = project;

  return (
    <div className={cls(null, [className])}>
      <h1 className={cls('title')}>
        {ruTitle}
      </h1>

      {ruDescription && (
        <div className={cls('description')}>
          {ruDescription}
        </div>
      )}

      {pictures.map((picture) => (
        <img
          key={picture.id}
          className={cls('picture')}
          src={getPicturesUrl(picture.image.name)}
        />
      ))}
    </div>
  );
};
