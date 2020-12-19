import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PagedResponse, Project } from '@lyubimovstudio/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  fetchProjects(page = 0, limit = 10) {
    const params = { page: page.toString(), limit: limit.toString() };

    return this.http.get<PagedResponse<Project>>('/api/projects', { params });
  }

  fetchProject(id: string) {
    return this.http.get<Project>(`/api/projects/${id}`);
  }

  saveProject(project: Project) {
    return project.id
      ? this.http.patch<Project>(`/api/projects/${project.id}`, project)
      : this.http.post<Project>(`/api/projects`, project);
  }

  removeProject(id: number) {
    return this.http.delete(`/api/projects/${id}`);
  }
}
