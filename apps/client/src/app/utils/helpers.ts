import { withNaming } from '@bem-react/classname';
import type { Picture } from '@lyubimovstudio/api-interfaces';

import { getRouteTitleByKey } from '../routes';

export const bemClassName = withNaming({
  e: '__',
  m: '_',
  v: '_',
});

export function getPictureUrl(pictureName: string) {
  return `/uploads/${pictureName}`;
}

export function getPictureUrlWithSizeCheck(pictureName: string) {
  const isMobile = (typeof window === 'undefined') ? true : window.innerWidth < 1025;

  return getPictureUrl(`${isMobile ? 'sm-' : ''}${pictureName}`);
}

export function getPictureImageUrls(name: string) {
  const large = getPictureUrl(name);
  const small = getPictureUrl(`sm-${name}`);
  const srcSet = `${small} 1025w, ${large}`;

  return { small, large, srcSet };
}

export function loadImage(url: string, srcSet?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(url);
    image.onerror = (error) => reject(error);

    if (srcSet) {
      image.srcset = srcSet;
    }

    image.src = url;
  });
}

export function loadPicture(pricture: Picture) {
  const { small, srcSet } = getPictureImageUrls(pricture.name);

  return loadImage(small, srcSet);
}

export function validatePhoneNumber(phoneNumber: string) {
  return /\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/.test(phoneNumber);
}

export function convertUrlSearchParamsToObject(searchParams: URLSearchParams) {
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export function getTitleByKey(key: string) {
  if (window === undefined) {
    return '';
  }

  const queryParams = new URLSearchParams(window.location.search);
  const title = getRouteTitleByKey(key);

  return (typeof title === 'string')
    ? title
    : title(convertUrlSearchParamsToObject(queryParams));
}
