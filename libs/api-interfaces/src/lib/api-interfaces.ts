export interface Project {
  ruTitle: string;
  enTitle: string;
  ruDescription?: string;
  enDescription?: string;
  pictures: ProjectPicture[];
}

export interface Picture {
  url: string;
}

export interface ProjectPicture extends Picture {
  ruTitle?: string;
  enTitle?: string;
  ruDescription?: string;
  enDescription?: string;
}
