import { useEffect, useState } from 'react';

import { Project } from '@lyubimovstudio/api-interfaces';

import { fetchProject } from '../../api';

export function useProject(id: number) {
  const [project, setProject] = useState<Project>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProject(id)
      .then(setProject)
      .catch(setError)
      .then(() => setLoading(false));
  }, []);

  return {
    project,
    loading,
    error,
  };
}
