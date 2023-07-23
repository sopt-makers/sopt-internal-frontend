import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import SquareLink from '@/components/common/SquareLink';
import { playgroundLink } from '@/constants/links';
import { textStyles } from '@/styles/typography';

const RegisterFinished: FC = () => {
  return (
    <Container>
      <Title>회원가입 완료!</Title>
      <Description>
        SOPT 회원가입을 완료했습니다.
        <br />
        프로젝트를 등록하여 SOPT에서의 경험을 공유해보세요.
      </Description>
      <Link href={playgroundLink.projectUpload()} passHref legacyBehavior>
        <SendButton variant='primary'>프로젝트 등록하기</SendButton>
      </Link>
    </Container>
  );
};

export default RegisterFinished;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  ${textStyles.SUIT_32_SB}
`;

const Description = styled.p`
  margin-top: 12px;
  margin-bottom: 45px;
  text-align: center;
  line-height: 25px;
  ${textStyles.SUIT_16_M};
`;

const SendButton = styled(SquareLink)`
  align-self: stretch;
`;
