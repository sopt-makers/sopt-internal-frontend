import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import FacebookButton from '@/components/auth/identityProvider/facebook/FacebookButton';
import GoogleAuthButton from '@/components/auth/identityProvider/google/GoogleAuthButton';
import useGoogleAuth from '@/components/auth/identityProvider/google/useGoogleAuth';
import useFacebookAuth from '@/components/auth/identityProvider/useFacebookAuth';
import SquareLink from '@/components/common/SquareLink';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

const LoginPage: FC = () => {
  const facebookAuth = useFacebookAuth();
  const googleAuth = useGoogleAuth();

  return (
    <StyledLoginPage>
      <LoginBox>
        <LoginTitle>
          <LoginPrefix>SOPT Playground에</LoginPrefix> 오신 걸 환영합니다
        </LoginTitle>
        <LoginDescription>SOPT회원만 이용할 수 있어요.</LoginDescription>
        <LinkContainer>
          <FacebookButton onClick={facebookAuth.login}>페이스북으로 로그인</FacebookButton>
          {googleAuth.isAvailable && <GoogleAuthButton onClick={googleAuth.login}>Google로 로그인</GoogleAuthButton>}
          <Link href={playgroundLink.register()} passHref legacyBehavior>
            <SquareLink
              css={css`
                color: white;
              `}
            >
              회원가입
            </SquareLink>
          </Link>
        </LinkContainer>
      </LoginBox>
      <Link href={playgroundLink.makers()} passHref legacyBehavior>
        <MadeByMakersLink>
          <MadeByTitle>made by</MadeByTitle>
          <StyledMakersLogo src='/logos/logo-makers-full.svg' alt='makers-logo' />
        </MadeByMakersLink>
      </Link>
    </StyledLoginPage>
  );
};

export default LoginPage;

setLayout(LoginPage, 'fullScreen');

export const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 20px;
  }
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.h2`
  text-align: center;
  ${textStyles.SUIT_32_SB}
`;

const LoginPrefix = styled.span`
  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
  }
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
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;

    & > * {
      width: auto;
    }
  }
`;

const MadeByMakersLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 100%;
  max-width: 234px;
`;

const MadeByTitle = styled.h3`
  ${textStyles.SUIT_20_R};
`;

const StyledMakersLogo = styled.img``;
