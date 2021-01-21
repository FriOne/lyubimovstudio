import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import useSSR from 'use-ssr';

import './projects-gallery.css';

import { Project } from '@lyubimovstudio/api-interfaces';

import { bemClassName } from '../../utils/helpers';
import { ProjectImageLink } from '../project-image-link/project-image-link';

type Props = {
  className?: string;
  projects: Project[];
};

const cls = bemClassName('projects-gallery');

export const ProjectsGallery: FunctionComponent<Props> = memo((props) => {
  const { className = '', projects } = props;
  const { isServer } = useSSR();
  const [mounted, setMounted] = useState(false)
  const projectsLinks = projects.map((project) => (
    <ProjectImageLink
      key={project.id}
      className={cls('project')}
      projectId={project.id}
      picture={project.pictures?.[0].image}
    />
  ));

  useEffect(() => setMounted(true), []);

  // On the server side Masonry doesn't work so we make plain links.
  if (isServer) {
    return (
      <div className={cls(null, [className])}>
        <div className={cls('column')}>
          {projectsLinks}
        </div>
      </div>
    );
  }

  if (!mounted) {
    return null;
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
});
