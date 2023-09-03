import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import ProjectDetail from '@/components/projects/main/ProjectDetail';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);

  if (status === 'loading') {
    return null;
  }

  if (status === 'error') {
    return null;
  }

  if (status === 'success') {
    return (
      <AuthRequired>
        <ProjectDetail projectId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(ProjectPage, 'headerFooter');

export default ProjectPage;