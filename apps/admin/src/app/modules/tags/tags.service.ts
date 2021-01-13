import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Tag } from '@lyubimovstudio/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private http: HttpClient) {}

  fetchTags(name?: string) {
    const params: { name?: string } = {};

    if (name) {
      params.name = name;
    }

    return this.http.get<Tag[]>('/api/tags', { params });
  }

  removeTag(id: number) {
    return this.http.delete(`/api/tags/${id}`);
  }

  addNewTag(name: string) {
    return this.http.post<Tag>('/api/tags', { name });
  }
}
