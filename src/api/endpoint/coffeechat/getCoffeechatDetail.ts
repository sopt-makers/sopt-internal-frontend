import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { useQuery } from '@tanstack/react-query';

const CoffeechatDetailSchema = z.object({
  bio: z.string(),
  memberId: z.number(),
  name: z.string(),
  career: z.string(),
  organization: z.string().nullable(),
  memberCareerTitle: z.string().nullable(),
  phone: z.string(),
  email: z.string(),
  introduction: z.string(),
  topicTypeList: z.array(z.string()),
  topic: z.string(),
  meetingType: z.string(),
  guideline: z.string().nullable(),
  isMine: z.boolean().nullable(),
  isBlind: z.boolean().nullable(),
  profileImage: z.string().nullable(),
  isCoffeeChatActivate: z.boolean().nullable(),
});

export const getCoffeechatDetail = createEndpoint({
  request: (memberId: string) => ({
    method: 'GET',
    url: `api/v1/members/coffeechat/${memberId}`,
  }),
  serverResponseScheme: CoffeechatDetailSchema,
});

export const useGetCoffeechatDetail = (memberId: string | undefined) => {
  const id = memberId ?? '';

  return useQuery({
    queryKey: getCoffeechatDetail.cacheKey(id),
    queryFn: () => getCoffeechatDetail.request(id),
    enabled: !!memberId,
  });
};