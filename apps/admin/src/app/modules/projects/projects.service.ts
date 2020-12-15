import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Project } from '@lyubimovstudio/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {
  }

  fetchProjects() {
    return this.http.get<Project[]>('/api/projects');
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
