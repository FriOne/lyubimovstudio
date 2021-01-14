import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useSSR } from 'use-ssr';

import './portfolio-page.css';

import { PagedResponse, ProjectPicture, Tag } from '@lyubimovstudio/api-interfaces';

import { fetchPicturesByTag, fetchTags } from '../../api';
import { bemClassName } from '../../utils/helpers';
import { Spinner } from '../../components/spinner/spinner';
import { Alert } from '../../components/alert/alert';
import { FC } from '../../utils/types';
import { InitialDataContext } from '../../../initial-data-context';
import { ProjectImageLink } from '../../components/project-image-link/project-image-link';
import { TagsList } from '../../components/tags-list/tags-list';

type PageParams = Partial<{
  tagId: string;
  tagName: string;
}>;
type InitialData = [Tag[], PagedResponse<ProjectPicture>];

const cls = bemClassName('portfolio-page');

export const PortfolioPage: FC<InitialData> = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tagId = searchParams.get('tagId');
  const initialData = useContext(InitialDataContext);
  const { isBrowser, isServer } = useSSR();

  let initialState: InitialData = [[], { rows: [], total: 0 }];

  if (isBrowser && window.__initialData__) {
    initialState = window.__initialData__;

    delete window.__initialData__;
  } else if (isServer && initialData) {
    initialState = initialData;
  }

  const [initialTags, innitialProjects] = initialState;
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [pictures, setPictures] = useState<ProjectPicture[]>(innitialProjects.rows);
  const [loadingTags, setLoadingTags] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setFirstLoad(false);

    if (innitialProjects.rows.length > 0) {
      return;
    }

    const queryParams: PageParams = {};

    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    setLoading(true);
    setLoadingTags(true);

    PortfolioPage.fetchInitialData(null, queryParams)
      .then(([tags, { rows }]) => {
        setTags(tags);
        setPictures(rows);
      })
      .catch(setError)
      .then(() => {
        setLoading(false);
        setLoadingTags(false);
      });
  }, []);

  useEffect(() => {
    if (firstLoad) {
      return;
    }

    setLoading(true);

    fetchPicturesByTag(Number(tagId))
      .then(({ rows }) => setPictures(rows))
      .catch(setError)
      .then(() => setLoading(false));
  }, [tagId]);

  return (
    <div className={cls()}>
      <h1 className={cls('title')}>
        Портфолио
      </h1>

      {error && (
        <Alert className={cls('error')}>
          {error.message}
        </Alert>
      )}

      {(loading || loadingTags) && (
        <Spinner className={cls('spinner')}/>
      )}

      {!loadingTags && !error && (
        <TagsList
          className={cls('tags')}
          tags={tags}
        />
      )}

      {!loading && !loadingTags && !error && pictures.map(picture => (
        <ProjectImageLink
          key={picture.id}
          className={cls('picture')}
          projectId={picture.project.id}
          imageName={picture.image.name}
        />
      ))}
    </div>
  );
};

PortfolioPage.fetchInitialData = (params: unknown, queryParams: PageParams) => {
  const { tagId } = queryParams;

  return Promise.all([
    fetchTags(),
    fetchPicturesByTag(Number(tagId))
  ]);
};
