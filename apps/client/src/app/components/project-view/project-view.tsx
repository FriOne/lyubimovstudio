import React, { FunctionComponent, memo } from 'react';

import './project-view.css';

import type { Project } from '@lyubimovstudio/api-interfaces';

import { bemClassName } from '../../utils/helpers';
import { PictureImg } from '../picture-img/picture-img';

type Props = {
  className?: string;
  project: Project;
};

const cls = bemClassName('project-view');

export const ProjectView: FunctionComponent<Props> = memo((props) => {
  const { className = '', project } = props;
  const { ruTitle, ruDescription, pictures = [] } = project;

  const [firstPicture, ...restPictures] = pictures;

  return (
    <div className={cls(null, [className])}>
      <PictureImg
        key={firstPicture.id}
        className={cls('picture', { first: true })}
        picture={firstPicture.image}
        dontWaitUntilLoad
      />

      <div className={cls('title-and-description')}>
        <h1 className={cls('title')}>
          {ruTitle}
        </h1>

        {ruDescription && (
          <div className={cls('description')}>
            {ruDescription}
          </div>
        )}
      </div>

      <div className={cls('pictures-list')}>
        {restPictures.map((picture) => (
          <PictureImg
            key={picture.id}
            className={cls('picture')}
            picture={picture.image}
          />
        ))}
      </div>
    </div>
  );
});
