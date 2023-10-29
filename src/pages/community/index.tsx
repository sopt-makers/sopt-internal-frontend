import { FC } from 'react';

import CommunityPage from '@/components/community/page';
import { setLayout } from '@/utils/layout';

const Community: FC = () => {
  return <CommunityPage />;
};

setLayout(Community, 'header');

export default Community;