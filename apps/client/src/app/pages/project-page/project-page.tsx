import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';

import './project-page.css';

import { useProject } from './project-page.hook';
import { bemClassName } from '../../utils/helpers';
import { Alert } from '../../components/alert/alert';
import { Spinner } from '../../components/spinner/spinner';
import { ProjectView } from '../../components/project-view/project-view';

const cls = bemClassName('project-page');

export const ProjectPage: FunctionComponent = () => {
  const { id } = useParams();
  const { loading, error, project } = useProject(Number(id));

  return (
    <div className={cls()}>
      {error && (
        <Alert className={cls('error')}>
          {error.message}
        </Alert>
      )}

      {loading && (
        <Spinner className={cls('spinner')}/>
      )}

      {!loading && !error && (
        <ProjectView
          className={cls('project-view')}
          project={project}
        />
      )}
    </div>
  );
};
