export interface Project {
  id?: number;
  ruTitle: string;
  enTitle: string;
  ruDescription?: string;
  enDescription?: string;
  pictures: ProjectPicture[];
}

export interface Picture {
  id: number;
  name: string;
}

export interface ProjectPicture {
  id?: number;
  ruTitle?: string;
  enTitle?: string;
  ruDescription?: string;
  enDescription?: string;
  image: Picture;
}
