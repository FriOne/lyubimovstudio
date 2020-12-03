import React, { FunctionComponent } from 'react';

import './projects-gallery.css';

import { Project } from '@lyubimovstudio/api-interfaces';

import { bemClassName } from '../../utils/helpers';
import { ProjectGalleryView } from '../project-gallery-view/project-gallery-view';

type Props = {
  className?: string;
  projects: Project[];
  onProjectClick(project: Project): void;
};

const cls = bemClassName('projects-gallery');

export const ProjectsGallery: FunctionComponent<Props> = (props) => {
  const { className = '', projects, onProjectClick } = props;

  return (
    <div className={cls(null, [className])}>
      {projects.map((project) => (
        <ProjectGalleryView
          key={project.id}
          className={cls('project')}
          project={project}
          onProjectClick={onProjectClick}
        />
      ))}
    </div>
  );
};
