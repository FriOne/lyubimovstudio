import React, { FunctionComponent, memo } from 'react';
import { Link } from 'react-router-dom';

import './tags-list.css';

import { Tag } from '@lyubimovstudio/api-interfaces';

import { bemClassName } from '../../utils/helpers';

type Props = {
  className?: string;
  tags: Tag[];
};

const cls = bemClassName('tags-list');

export const TagsList: FunctionComponent<Props> = memo((props) => {
  const { className = '', tags } = props;

  return (
    <div className={cls(null, [className])}>
      <Link className={cls('tag')} to="?">
        #все
      </Link>

      {tags.map(tag => (
        <Link
          key={tag.id}
          className={cls('tag')}
          to={`?tagId=${tag.id}&tagName=${tag.name}`}
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
});
