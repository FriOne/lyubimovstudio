import React, { FunctionComponent, memo } from 'react';
import { Link } from 'react-router-dom';

import './project-image-link.css';

import type { Picture } from '@lyubimovstudio/api-interfaces';

import { bemClassName } from '../../utils/helpers';
import { PictureImg } from '../picture-img/picture-img';

type Props = {
  className?: string;
  projectId: number;
  picture: Picture;
};

const cls = bemClassName('project-image-link');

export const ProjectImageLink: FunctionComponent<Props> = memo((props) => {
  const { className = '', projectId, picture } = props;

  return (
    <Link className={cls(null, [className])} to={`/projects/${projectId}`}>
      <PictureImg
        className={cls('picture')}
        picture={picture}
      />
    </Link>
  );
});
