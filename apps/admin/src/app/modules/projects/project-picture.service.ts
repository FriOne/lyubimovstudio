import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProjectPicture } from '@lyubimovstudio/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectPictureService {
  constructor(private http: HttpClient) {}

  createNew(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<ProjectPicture>(
      '/api/projects/pictures',
      formData,
      {
        params: {
          clientFilename: file.name,
          mimeType: file.type
        },
        responseType: 'json',
      },
    );
  }

  save(id: number, projectPicture: ProjectPicture) {
    return this.http.patch<ProjectPicture>(`/api/projects/pictures/${id}`, projectPicture);
  }
}
