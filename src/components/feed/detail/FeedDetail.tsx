import React, { useRef, useState } from 'react';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { usePostCommentMutation } from '@/api/endpoint/feed/postComment';
import { getMemberInfo } from '@/components/feed/common/utils';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

interface FeedDetailProps {
  postId: string;
}

const FeedDetail = ({ postId }: FeedDetailProps) => {
  const { data: postData } = useGetPostQuery(postId);
  const { data: commentData, refetch: refetchCommentQuery } = useGetCommentQuery(postId);
  const { mutate } = usePostCommentMutation(postId);

  const [value, setValue] = useState<string>('');
  const [isBlindWriter, setIsBlindWriter] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        content: value,
        isBlindWriter,
        isChildComment: false,
      },
      {
        onSuccess: async () => {
          setValue('');
          const { isSuccess } = await refetchCommentQuery();
          requestAnimationFrame(() => {
            // MEMO(@jun): refecth 이후 render가 완료되기 전에 scroll 처리가 되어버려서, 리렌더링 이후에 실행하도록
            if (isSuccess && containerRef.current) {
              containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
          });
        },
      },
    );
  };

  if (postData == null || commentData == null) {
    return null;
  }

  return (
    <DetailFeedCard>
      {/* TODO: 하드코딩 제거 */}
      <DetailFeedCard.Header category='파트' tag='기획' />
      <DetailFeedCard.Body ref={containerRef}>
        <DetailFeedCard.Main>
          <DetailFeedCard.Top
            name={postData.member.name}
            profileImage={postData.member.profileImage}
            info={getMemberInfo({
              categoryId: postData.category.id,
              categoryName: postData.category.name,
              member: postData.member,
            })}
            createdAt={postData.posts.createdAt}
          />
          <DetailFeedCard.Content
            isQuestion
            title={postData.posts.title}
            hits={postData.posts.hits}
            commentLength={postData.posts.comments.length}
            content={postData.posts.content}
            images={postData.posts.images}
          />
        </DetailFeedCard.Main>
        <DetailFeedCard.Divider />
        {commentData.map((comment) => (
          <DetailFeedCard.Comment
            key={comment.id}
            name={comment.member.name}
            profileImage={comment.member.profileImage}
            info={getMemberInfo({
              member: comment.member,
              categoryId: postData.category.id,
              categoryName: postData.category.name,
            })}
            comment={comment.content}
            isBlindWriter={comment.isBlindWriter}
          />
        ))}
      </DetailFeedCard.Body>
      <form onSubmit={handleSubmit}>
        <DetailFeedCard.Input
          value={value}
          onChange={setValue}
          isBlindChecked={isBlindWriter}
          onChangeIsBlindChecked={setIsBlindWriter}
        />
      </form>
    </DetailFeedCard>
  );
};

export default FeedDetail;
