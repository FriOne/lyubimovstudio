import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PagedResponse, Picture } from '@lyubimovstudio/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class PicturesService {
  constructor(private http: HttpClient) {}

  getPicturePath(pictureName: string, forceMobile = true) {
    const isMobile = forceMobile || window.innerWidth < 1025;

    return `/uploads/${isMobile ? 'sm-' : ''}${pictureName}`;
  }

  fetchPictures() {
    return this.http.get<PagedResponse<Picture>>('/api/pictures');
  }

  uploadPicture(picture: File) {
    const formData = new FormData();

    formData.append('file', picture);

    return this.http.put<Picture>(
      '/api/pictures/upload',
      formData,
      {
        params: {
          clientFilename: picture.name,
          mimeType: picture.type
        },
        responseType: 'json',
      },
    );
  }
}
