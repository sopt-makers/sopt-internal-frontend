import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import FacebookButton from '@/components/auth/identityProvider/facebook/FacebookButton';
import useFacebookAuth from '@/components/auth/identityProvider/useFacebookAuth';
import SquareLink from '@/components/common/SquareLink';
import { textStyles } from '@/styles/typography';
import useLocalLogin from '@/hooks/useLocalLogin';

const LoginPage: FC = () => {
  const facebookAuth = useFacebookAuth();
  const { isLocal, onClickLocalLogin } = useLocalLogin();

  return (
    <StyledLoginPage>
      <LoginTitle>SOPT Internal에 오신걸 환영합니다</LoginTitle>
      <LoginDescription>SOPT회원만 이용할 수 있어요.</LoginDescription>
      <LinkContainer>
        <FacebookButton onClick={isLocal ? onClickLocalLogin : facebookAuth.login}>페이스북으로 로그인</FacebookButton>
        <Link href='/auth/verify' passHref>
          <SquareLink>회원가입</SquareLink>
        </Link>
      </LinkContainer>
    </StyledLoginPage>
  );
};

export default LoginPage;

export const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20rem;
`;

export const LoginTitle = styled.h2`
  ${textStyles.SUIT_32_SB}
`;

export const LoginDescription = styled.p`
  margin-top: 12px;
  margin-bottom: 80px;
  ${textStyles.SUIT_16_M};
`;

const LinkContainer = styled.div`
  & > * {
    margin-bottom: 20px;
    width: 420px;
  }
`;
