export interface Project {
  id?: number;
  ruTitle: string;
  enTitle: string;
  ruDescription?: string;
  enDescription?: string;
  pictures: ProjectPicture[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Picture {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tag {
  id?: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectPicture {
  id?: number;
  ruTitle?: string;
  enTitle?: string;
  ruDescription?: string;
  enDescription?: string;
  image: Picture;
  order: number;
  tags: Tag[];
  createdAt?: string;
  updatedAt?: string;
}

export type PagedResponse<T> = {
  rows: T[];
  total: number;
};
