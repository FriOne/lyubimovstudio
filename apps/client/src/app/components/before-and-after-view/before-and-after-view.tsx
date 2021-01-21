import React, { FunctionComponent, memo } from 'react';
import { Link } from 'react-router-dom';
import ReactCompareImage from 'react-compare-image';

import './before-and-after-view.css';

import { BeforeAndAfter } from '@lyubimovstudio/api-interfaces';

import { bemClassName, getPictureUrlWithSizeCheck } from '../../utils/helpers';

type Props = {
  className?: string;
  beforeAndAfter: BeforeAndAfter;
};

const cls = bemClassName('before-and-after-view');

export const BeforeAndAfterView: FunctionComponent<Props> = memo((props) => {
  const { className = '', beforeAndAfter } = props;
  const { ruTitle, ruDescription, project, before, after } = beforeAndAfter;
  const beforeUrl = getPictureUrlWithSizeCheck(before.name);
  const afterUrl = getPictureUrlWithSizeCheck(after.name);

  return (
    <div className={cls(null, [className])}>
      <div className={cls('images')}>
        <ReactCompareImage
          leftImage={beforeUrl}
          rightImage={afterUrl}
        />
      </div>

      <div className={cls('texts')}>
        <h2 className={cls('title')}>
          {ruTitle || project.ruTitle}
        </h2>
        <div className={cls('description')}>
          {ruDescription || project.ruDescription}
        </div>

        <Link className={cls('project-link')} to={`/projects/${project.id}`}>
          Посмотреть проект
        </Link>
      </div>
    </div>
  );
});
