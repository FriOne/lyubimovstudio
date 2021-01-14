import React, { FunctionComponent } from 'react';
import Masonry from 'react-masonry-css';

import './projects-gallery.css';

import { Project } from '@lyubimovstudio/api-interfaces';

import { bemClassName } from '../../utils/helpers';
import { ProjectImageLink } from '../project-image-link/project-image-link';
import useSSR from 'use-ssr';

type Props = {
  className?: string;
  projects: Project[];
};

const cls = bemClassName('projects-gallery');

export const ProjectsGallery: FunctionComponent<Props> = (props) => {
  const { className = '', projects } = props;
  const { isServer } = useSSR();
  const projectsLinks = projects.map((project) => (
    <ProjectImageLink
      key={project.id}
      className={cls('project')}
      projectId={project.id}
      imageName={project.pictures?.[0].image.name}
    />
  ));

  // On the server side Masonry doesn't work so we emitate it.
  if (isServer) {
    return (
      <div className={cls(null, [className])}>
        <div style={{ width: '50%'}} className={cls('column')}>
          {projectsLinks}
        </div>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={{ default: 2, 768: 1 }}
      className={cls(null, [className])}
      columnClassName={cls('column')}
    >
      {projectsLinks}
    </Masonry>
  );
};
