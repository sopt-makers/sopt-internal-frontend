import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { useToggleLikeMutation } from '@/api/endpoint/feed/postLike';

interface HandleToggleLikeParams {
  postId: number;
  isLiked: boolean;
  likes: number;
  allPostsQueryKey: (string | Params | undefined)[];
  postsQueryKey: (string | Params | undefined)[];
  postQueryKey: string[];
}

export const useToggleLike = () => {
  const { mutate } = useToggleLikeMutation();

  const handleToggleLike = async ({
    postId,
    isLiked,
    likes,
    allPostsQueryKey,
    postsQueryKey,
    postQueryKey,
  }: HandleToggleLikeParams) => {
    const action: 'unlike' | 'like' = isLiked ? 'unlike' : 'like';
    const mutationParams = { postId, action, likes, allPostsQueryKey, postsQueryKey, postQueryKey };
    mutate(mutationParams);
  };
  return { handleToggleLike };
};
