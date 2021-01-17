import { BeforeAndAfter, PagedResponse, Project, ProjectPicture, Tag } from '@lyubimovstudio/api-interfaces';

type Params = Record<string, string | number>;
type FetchInit = {
   params?: Params;
} & RequestInit;

type RequestBody = {
  name: string;
  phoneNumber: string;
  message?: string;
};

const API_URL = process.env.API_URL || '/api';

function appendParamsToUrl(url: string, params: Params) {
  if (!params) {
    return url;
  }

  return Object
    .entries(params)
    .reduce((newUrl, [name, value], index) => {
      if (!value) {
        return newUrl;
      }

      const sign = (index === 0) ? '?' : '&';

      return `${newUrl}${sign}${name}=${value}`;
    }, url);
}

async function fetchRequest<Response>(url: string, init?: FetchInit): Promise<Response> {
  const { params, ...requestIntit } = init || {};
  const response = await fetch(appendParamsToUrl(url, params), requestIntit);

  if (!response.ok || response.status > 299) {
    throw new Error(response.statusText || 'Api error');
  }

  return response.json();
}

export function sendRequest(requestBody: RequestBody) {
  const config: RequestInit = {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    }
  };

  return fetchRequest(`${API_URL}/mail/request`, config);
}

export function fetchProjects() {
  return fetchRequest<PagedResponse<Project>>(`${API_URL}/projects`);
}

export function fetchPicturesByTag(tagId?: number) {
  const params = { tagId };

  return fetchRequest<PagedResponse<ProjectPicture>>(`${API_URL}/projects/pictures`, { params });
}

export function fetchBeforeAndAfter() {
  return fetchRequest<PagedResponse<BeforeAndAfter>>(`${API_URL}/before-and-after`);
}

export function fetchTags() {
  return fetchRequest<Tag[]>(`${API_URL}/tags`);
}

export function fetchProject(id: number) {
  return fetchRequest<Project>(`${API_URL}/projects/${id}`);
}
