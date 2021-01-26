import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

import './portfolio-page.css';

import type { PagedResponse, ProjectPicture, Tag } from '@lyubimovstudio/api-interfaces';

import { fetchPicturesByTag, fetchTags } from '../../api';
import { bemClassName } from '../../utils/helpers';
import { Spinner } from '../../components/spinner/spinner';
import { FC } from '../../utils/types';
import { ProjectImageLink } from '../../components/project-image-link/project-image-link';
import { TagsList } from '../../components/tags-list/tags-list';
import { LoadMoreButton } from '../../components/load-more-button/load-more-button';
import { useInitialState } from '../../utils/hooks';

type PageParams = Partial<{
  tagId: string;
  tagName: string;
}>;
type InitialData = [Tag[], PagedResponse<ProjectPicture>];

const cls = bemClassName('portfolio-page');

export const PortfolioPage: FC<InitialData> = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tagId = searchParams.get('tagId')
    ? Number(searchParams.get('tagId'))
    : undefined;
  const initialState = useInitialState<InitialData>([[], { rows: [], total: 0 }]);

  const [initialTags, innitialProjects] = initialState;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(innitialProjects.total);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [pictures, setPictures] = useState<ProjectPicture[]>(innitialProjects.rows);
  const [loadingTags, setLoadingTags] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLoadMoreClick = useCallback(async () => {
    setLoading(true);

    const { rows, total } = await fetchPicturesByTag(page, tagId);

    setPage(page + 1);
    setPictures([...pictures, ...rows]);
    setTotal(total);
    setLoading(false);
  }, [page, pictures, tagId]);

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
      .then(([tags, { rows, total }]) => {
        setTotal(total);
        setTags(tags);
        setPictures(rows);
      })
      .catch(() => toast.error('Произошла ошибка при загрузке "Портфолио"'))
      .then(() => {
        setLoading(false);
        setLoadingTags(false);
      });
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (firstLoad) {
      return;
    }

    setLoading(true);

    fetchPicturesByTag(tagId)
      .then(({ rows }) => setPictures(rows))
      .catch(() => toast.error('Произошла ошибка при загрузке "Портфолио"'))
      .then(() => setLoading(false));
  // eslint-disable-next-line
  }, [tagId]);

  return (
    <div className={cls()}>
      <h1 className={cls('title')}>
        Портфолио
      </h1>

      {!loadingTags && (
        <TagsList
          className={cls('tags')}
          tags={tags}
        />
      )}

      {pictures?.map(picture => (
        <ProjectImageLink
          key={picture.id}
          className={cls('picture')}
          projectId={picture.project.id}
          picture={picture.image}
        />
      ))}

      {(loading || loadingTags) && (
        <Spinner className={cls('spinner')}/>
      )}

      {!loading && total > pictures.length && (
        <LoadMoreButton
          className={cls('load-more-button')}
          disabled={loading}
          onClick={onLoadMoreClick}
        />
      )}
    </div>
  );
};

PortfolioPage.fetchInitialData = (params: unknown, queryParams: PageParams) => {
  const { tagId } = queryParams;

  return Promise.all([
    fetchTags(),
    fetchPicturesByTag(0, tagId ? Number(tagId) : undefined)
  ]);
};
