import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PagedResponse, BeforeAndAfter } from '@lyubimovstudio/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class BeforeAndAfterService {
  constructor(private http: HttpClient) {}

  fetchAllBeforeAndAfter(page = 0, limit = 10) {
    return this.http.get<PagedResponse<BeforeAndAfter>>('/api/before-and-after');
  }

  fetchBeforeAndAfter(id: string) {
    return this.http.get<BeforeAndAfter>(`/api/before-and-after/${id}`);
  }

  saveBeforeAndAfter(beforeAndAfter: BeforeAndAfter, id?: number) {
    return id
      ? this.http.patch<BeforeAndAfter>(`/api/before-and-after/${id}`, beforeAndAfter)
      : this.http.post<BeforeAndAfter>(`/api/before-and-after`, beforeAndAfter);
  }

  removeBeforeAndAfter(id: number) {
    return this.http.delete(`/api/before-and-after/${id}`);
  }
}
