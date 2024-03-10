import { Meta } from '@storybook/react';

import MemberCrewCard from '@/components/members/detail/MemberCrewCard';

export default {
  component: MemberCrewCard,
} as Meta<typeof MemberCrewCard>;

export const Default = {
  args: {
    id: 85,
    isMeetingLeader: false,
    title: '주술사되는법',
    imageUrl:
      'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/10/01/21c6ea54-8965-4ed7-a691-bb0a1e11382c.png',
    category: '스터디',
    isActiveMeeting: true,
    mstartDate: '2023-10-04T00:00:00',
    mendDate: '2024-10-04T00:00:00',
    userName: '김솝트',
  },
};
