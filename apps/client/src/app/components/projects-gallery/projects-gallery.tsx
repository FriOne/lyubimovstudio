import React, { FunctionComponent } from 'react';
import Masonry from 'react-masonry-css';

import './projects-gallery.css';

import { Project } from '@lyubimovstudio/api-interfaces';

import { bemClassName } from '../../utils/helpers';
import { ProjectImageLink } from '../project-image-link/project-image-link';

type Props = {
  className?: string;
  projects: Project[];
};

const cls = bemClassName('projects-gallery');

export const ProjectsGallery: FunctionComponent<Props> = (props) => {
  const { className = '', projects } = props;

  return (
    <Masonry
      breakpointCols={{ default: 2, 768: 1 }}
      className={cls(null, [className])}
      columnClassName={cls('column')}
    >
      {projects.map((project) => (
        <ProjectImageLink
          key={project.id}
          className={cls('project')}
          projectId={project.id}
          imageName={project.pictures?.[0].image.name}
        />
      ))}
    </Masonry>
  );
};
