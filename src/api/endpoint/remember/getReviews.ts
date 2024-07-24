import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { useInfiniteQuery } from '@tanstack/react-query';

const ReviewSchema = z.object({
  reviews: z.array(
    z.object({
      id: z.number(),
      content: z.string(),
    }),
  ),
  hasNext: z.boolean(),
});

export const getReviews = createEndpoint({
  request: ({ page, size }: { page: number; size: number }) => ({
    method: 'GET',
    url: `api/v1/review?page=${page}&size=${size}`,
  }),
  serverResponseScheme: ReviewSchema,
});

const SIZE = 1000;

export const useGetReviewsInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: useGetReviewsInfiniteQuery.getKey(),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getReviews.request({ page: pageParam, size: SIZE });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.reviews[lastPage.reviews.length - 1].id : null;
    },
  });
};

useGetReviewsInfiniteQuery.getKey = () => ['infiniteReviews'];
