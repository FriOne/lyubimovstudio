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
