import type { BeforeAndAfter, PagedResponse, Project, ProjectPicture, Tag } from '@lyubimovstudio/api-interfaces';

type Params = Record<string, string | number | boolean>;
type FetchInit = {
   params?: Params;
} & RequestInit;

type RequestBody = {
  name: string;
  phoneNumber: string;
  message?: string;
};

const API_URL = process.env.API_URL || '/api';
const FETCH_LIMIT = 10;

function appendParamsToUrl(url: string, params?: Params) {
  if (!params) {
    return url;
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      continue;
    }

    searchParams.append(key, value.toString());
  }

  return `${url}?${searchParams}`;
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

export function fetchProjects(page = 0) {
  const params = {
    page,
    limit: FETCH_LIMIT,
  };

  return fetchRequest<PagedResponse<Project>>(`${API_URL}/projects`, { params });
}

export function fetchPicturesByTag(page = 0, tagId?: number) {
  const params: Record<string, any> = {
    page,
    limit: FETCH_LIMIT,
  };

  if (tagId) {
    params.tagId = tagId;
  }

  return fetchRequest<PagedResponse<ProjectPicture>>(`${API_URL}/projects/pictures`, { params });
}

export function fetchBeforeAndAfter(page = 0) {
  const params = {
    page,
    limit: FETCH_LIMIT,
  };

  return fetchRequest<PagedResponse<BeforeAndAfter>>(`${API_URL}/before-and-after`, { params });
}

export function fetchTags() {
  return fetchRequest<Tag[]>(`${API_URL}/tags`);
}

export function fetchProject(id: number) {
  return fetchRequest<Project>(`${API_URL}/projects/${id}`);
}
