import { useEffect, useState } from 'react';

import { Project } from '@lyubimovstudio/api-interfaces';

import { fetchProjects } from '../../api';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(setError)
      .then(() => setLoading(false));
  }, []);

  return {
    projects,
    loading,
    error,
  };
}
