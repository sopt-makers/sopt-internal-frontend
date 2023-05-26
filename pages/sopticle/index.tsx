import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';

import { uploadSopticle } from '@/api/endpoint/sopticles/uploadSopticle';
import { useGetMemberOfMe } from '@/api/endpoint_LEGACY/hooks';
import UploadSopticle from '@/components/sopticle/UploadSopticle';
import { setLayout } from '@/utils/layout';

const SopticlePage: FC = () => {
  const { data } = useGetMemberOfMe();
  const { mutate, status, error } = useMutation({
    mutationFn: async (url: string) => {
      if (!data) {
        throw new Error('로그인 정보를 찾을 수 없습니다.');
      }
      if (!url.match(/^https*:\/\//)) {
        throw new Error('올바른 링크를 입력해주세요.');
      }
      return uploadSopticle.request(url, [data.id]);
    },
  });

  return (
    <StyledSopticlePage>
      <UploadSopticle state={status} errorMessage={`${error}`} onSubmit={(url) => mutate(url)} />
    </StyledSopticlePage>
  );
};

export default SopticlePage;

setLayout(SopticlePage, 'header');

const StyledSopticlePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 24px 0;
`;
