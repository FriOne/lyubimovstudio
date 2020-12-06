import { withNaming } from '@bem-react/classname';

export const bemClassName = withNaming({
  e: '__',
  m: '_',
  v: '_',
});

export function getPicturesUrl(pictureName: string) {
  return `/uploads/${pictureName}`;
}
