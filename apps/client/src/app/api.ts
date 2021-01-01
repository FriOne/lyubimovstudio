import { PagedResponse, Project } from '@lyubimovstudio/api-interfaces';

const API_URL = process.env.API_URL || '/api';

async function fetchRequest<Response>(input: RequestInfo, init?: RequestInit): Promise<Response> {
   const response = await fetch(input, init);

   if (!response.ok || response.status !== 200) {
     throw new Error(response.statusText || 'Api error');
   }

   return response.json();
}

export function fetchProjects() {
  return fetchRequest<PagedResponse<Project>>(`${API_URL}/projects`);
}

export function fetchProject(id: number) {
  return fetchRequest<Project>(`${API_URL}/projects/${id}`);
}
