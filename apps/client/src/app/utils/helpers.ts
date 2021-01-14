import { withNaming } from '@bem-react/classname';

export const bemClassName = withNaming({
  e: '__',
  m: '_',
  v: '_',
});

export function getPicturesUrl(pictureName: string) {
  const isMobile = (typeof window === 'undefined') ? true : window.innerWidth < 1025;

  return `/uploads/${isMobile ? 'sm-' : ''}${pictureName}`;
}

export function loadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(url);
    image.onerror = (error) => reject(error);

    image.src = url;
  });
}

export function convertUrlSearchParamsToObject(searchParams: URLSearchParams) {
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}
