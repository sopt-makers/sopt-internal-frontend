import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LogoIcon from 'public/icons/icon-logo.svg';
import MemberIcon from 'public/icons/icon-member.svg';
import MenuIcon from 'public/icons/icon-menu.svg';
import { FC, useState } from 'react';

import { useGetMemberOfMe, useGetMemberProfileById } from '@/apiHooks/members';
import useAuth from '@/components/auth/useAuth';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const Header: FC = () => {
  const { logout } = useAuth();
  const [isUserDropdownOpened, setIsUserDropdownOpened] = useState(false);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const { pathname } = useRouter();

  const { data: me } = useGetMemberOfMe();
  const { data: profile, status: profileStatus } = useGetMemberProfileById(me?.id ?? 0);

  if (profileStatus === 'error') return null;
  return (
    <StyledHeader>
      <LeftGroup>
        <div className='mobile-only' onClick={() => setIsMobileMenuOpened(true)}>
          <MenuIcon />
        </div>
        <Link href='/' passHref>
          <TextLinkButton isCurrentPath={pathname === '/'}>
            <StyledLogo>
              <LogoIcon />
            </StyledLogo>
          </TextLinkButton>
        </Link>

        <MenuGroup className='pc-only'>
          <Link href='/members' passHref>
            <TextLinkButton isCurrentPath={pathname === '/members'}>멤버</TextLinkButton>
          </Link>
          <Link href='/projects' passHref>
            <TextLinkButton isCurrentPath={pathname === '/projects'}>프로젝트</TextLinkButton>
          </Link>
          {/* <Link href='/web-product' passHref>
          <TextLinkButton isCurrentPath={router.pathname === ''}>Web Product</TextLinkButton>
        </Link> */}
        </MenuGroup>
      </LeftGroup>

      <RightGroup>
        <div className='pc-only'>
          <Link href='/projects/upload' passHref>
            <UploadButton>
              <span>+</span>내 프로젝트 올리기
            </UploadButton>
          </Link>
        </div>

        <UserButton onClick={() => setIsUserDropdownOpened((e) => !e)}>
          <MemberIcon />
          <span>{me?.name}</span>
        </UserButton>
      </RightGroup>

      {isUserDropdownOpened && (
        <UserDropdown>
          <Link href={me?.hasProfile ? `/members/${me?.id}` : '/members/upload'}>내 프로필</Link>
          <div onClick={logout}>로그아웃</div>
        </UserDropdown>
      )}

      {isMobileMenuOpened && (
        <MobileMenuWrapper onClick={() => setIsMobileMenuOpened(false)}>
          <MobileMenu>
            <ProfileContainer>
              <ProfileImage src={profile?.profileImage} />
              <Name>{profile?.name}</Name>
            </ProfileContainer>

            <MenuWrapper>
              <div>내 프로필</div>
              <div>로그아웃</div>
            </MenuWrapper>

            <RouterWrapper>
              <Link href='/members' passHref>
                <TextLinkButton isCurrentPath={pathname === '/members'}>멤버</TextLinkButton>
              </Link>
              <Link href='/projects' passHref>
                <TextLinkButton isCurrentPath={pathname === '/projects'}>프로젝트</TextLinkButton>
              </Link>
            </RouterWrapper>
          </MobileMenu>
        </MobileMenuWrapper>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 18px 36px;
  line-height: 100%;
  letter-spacing: -0.01em;
  font-size: 14px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 12px;
    height: 56px;
    font-size: 12px;
  }
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
`;

const MenuGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const RightGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledLogo = styled.div`
  margin-right: 40px;
  padding: 10px;
  @media ${MOBILE_MEDIA_QUERY} {
    svg {
      width: 49px;
      height: auto;
    }
  }
`;

const TextLinkButton = styled.a<{ isCurrentPath: boolean }>`
  cursor: pointer;
  color: ${({ isCurrentPath }) => (isCurrentPath ? '#fff' : '#C0C5C9')};
  font-weight: ${({ isCurrentPath }) => (isCurrentPath ? 700 : 500)};
  @media ${MOBILE_MEDIA_QUERY} {
    ${({ isCurrentPath }) => (isCurrentPath ? textStyles.SUIT_18_B : textStyles.SUIT_18_M)}
  }
`;

const UploadButton = styled.a`
  box-sizing: border-box;
  border-radius: 32px;
  background-color: #8040ff;
  cursor: pointer;
  padding: 12px 20px;
  height: 38px;
  font-weight: 700;

  & > span {
    margin-right: 4px;
    font-weight: 700;
  }
`;

const UserButton = styled.a`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 19px;
  background: #1c1d1e;
  cursor: pointer;
  padding: 3px 12px 3px 4px;
  height: 38px;
  font-weight: 700;

  svg {
    width: 32px;
    height: auto;
  }

  & > span {
    width: 64px;
    text-align: center;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 3px 10px 3px 3px;
    height: 28px;

    svg {
      width: 22px;
    }

    & > span {
      width: 42px;
      text-align: center;
    }
  }
`;

const UserDropdown = styled.div`
  box-sizing: border-box;
  display: flex;
  position: absolute;
  top: 80px;
  right: 36px;
  flex-direction: column;
  gap: 25px;
  z-index: 100;
  border-radius: 14px;
  background: #272828;
  padding: 25px 20px;
  width: 176px;
  font-size: 16px;

  & > div {
    cursor: pointer;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    top: 56px;
    right: 20px;
    gap: 20px;
    padding: 22px 20px;
    width: 144px;
    font-size: 15px;
  }
`;

const MobileMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  background-color: rgb(0 0 0 / 70%);
  width: 100%;
  height: 100vh;
`;

const MobileMenu = styled.div`
  background-color: ${colors.black80};
  padding: 57px 20px;
  width: 212px;
  height: 100vh;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 14px;
  background: ${colors.black60};
  width: 42px;
  height: 42px;
  object-fit: cover;
`;

const Name = styled.div`
  margin-left: 12px;
  color: ${colors.white};
  ${textStyles.SUIT_20_B}
`;

const MenuWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 21px;
  border-bottom: 1px solid ${colors.black60};
  padding-bottom: 30px;
  ${textStyles.SUIT_15_SB}
`;

const RouterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 30px;
  color: ${colors.white100};
`;
