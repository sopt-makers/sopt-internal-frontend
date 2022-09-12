import { FC } from 'react';
import styled from '@emotion/styled';
import { colors } from 'styles/colors';
import { useRouter } from 'next/router';
import IconCloseMenu from '@/public/icons/icon-close-menu.svg';
import { css } from '@emotion/react';
import IconMail from '@/public/icons/icon-mail-logo.svg';
import IconFaceBook from '@/public/icons/icon-facebook-logo.svg';
import IconInstagram from '@/public/icons/icon-instagram-logo.svg';
import IconYoutube from '@/public/icons/icon-youtube-logo.svg';
import IconKakao from '@/public/icons/icon-kakao-logo.svg';

const SOPT_RECRUIT_LINK = 'https://sopt-recruiting.web.app/recruiting/apply/ob';
const ICONS = [
  {
    icon: <IconMail />,
    link: 'mailto:president@sopt.org',
  },
  {
    icon: <IconFaceBook />,
    link: 'https://www.facebook.com/clubsopt/',
  },
  {
    icon: <IconInstagram />,
    link: 'https://www.instagram.com/sopt_timi_tmi/',
  },
  {
    icon: <IconYoutube />,
    link: 'https://www.youtube.com/c/SOPTMEDIA',
  },
  {
    icon: <IconKakao />,
    link: 'http://pf.kakao.com/_JdTKd',
  },
];

interface MenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Menu: FC<MenuProps> = ({ isOpen, onToggle }) => {
  const router = useRouter();

  return (
    <StyledMenu isOpen={isOpen}>
      <MenuWrap>
        <StyledIcon onClick={onToggle} />
        <ContentsWrap>
          <MenuTitlesWrap>
            <MenuTitle href='/' isSelected={router.pathname === '/'}>
              홈
            </MenuTitle>
            <MenuTitle href='/about' isSelected={router.pathname === '/about'}>
              SOPT소개
            </MenuTitle>
            <MenuTitle href='/history' isSelected={router.pathname === '/history'}>
              역대기수소개
            </MenuTitle>
            <MenuTitle href='/projects' isSelected={router.pathname === '/projects'}>
              프로젝트
            </MenuTitle>
            <MenuTitle href='/recruit' isSelected={router.pathname === '/recruit'}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = SOPT_RECRUIT_LINK;
                }}
              >
                신입회원모집
              </a>
            </MenuTitle>
            <MenuTitle href='/partners' isSelected={router.pathname === '/partners'}>
              협력사
            </MenuTitle>
          </MenuTitlesWrap>
          <BottomWrap>
            <Rules href='/rules'>SOPT 회칙</Rules>
            <ChannelWrap>
              <ChannelTitle>SOPT 채널 바로가기</ChannelTitle>
              <ChannelIconWrapper>
                {ICONS.map(({ icon, link }, index) => (
                  <a key={index} href={link} rel='noreferrer' target='_blank'>
                    {icon}
                  </a>
                ))}
              </ChannelIconWrapper>
            </ChannelWrap>
          </BottomWrap>
        </ContentsWrap>
      </MenuWrap>
    </StyledMenu>
  );
};

export default Menu;

const StyledMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  transition: opacity 0.2s;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: 10;
  box-shadow: 0 0 5px rgb(0 0 0 / 50%);
  background-color: #232323;
  width: 100%;
  height: 100%;

  /* 데스크탑 뷰 */
  @media (min-width: 1280px) {
    width: calc((100vw - 1280px) / 2 + 400px);
  }

  /* 모바일 뷰 */
  @media (max-width: 1279px) {
    width: calc((100vw - 375px) / 2 + 250px);
  }
`;

const MenuWrap = styled.div`
  padding: 0 60px;
  width: 100%;

  /* 데스크탑 뷰 */
  @media (min-width: 1280px) {
    /* width: 400px; */
  }

  /* 모바일 뷰 */
  @media (max-width: 1279px) {
    padding: 0 30px;
  }
`;

const StyledIcon = styled(IconCloseMenu)`
  position: relative;
  top: 35px;
  right: -256px;
  cursor: pointer;

  /* 모바일 뷰 */
  @media (max-width: 1279px) {
    top: 47px;
    right: -90%;
  }
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 91px;
  margin-bottom: 50px;
  height: calc(100vh - 200px);

  /* 모바일 세로 짧은 기종 뷰 */
  @media (max-height: 700px) {
    margin-top: 50px;
    margin-bottom: 0;
    height: calc(100vh - 150px);
  }
`;

const MenuTitlesWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(1);
  row-gap: 20px;
  padding-bottom: 30px;
`;

const MenuTitle = styled.a<{ isSelected: boolean }>`
  outline: none;
  cursor: pointer;
  padding-bottom: 4px;
  width: max-content;
  text-align: left;
  text-decoration: none;
  line-height: 25px;
  letter-spacing: -0.03em;
  color: ${colors.gray60};
  font-size: 20px;
  font-weight: 500;

  /* TODO: main-color 수정 */
  ${({ isSelected }) =>
    isSelected &&
    css`
      border-bottom: 3px solid ${colors.purple100};
      color: ${colors.white};
    `}

  /* 모바일 뷰 */
  @media (max-width: 1279px) {
    font-size: 16px;
  }
`;

const BottomWrap = styled.div``;

const Rules = styled.a`
  cursor: pointer;
  text-decoration-line: underline;
  line-height: 20px;
  letter-spacing: -0.04em;
  color: #a9a9a9;
  font-size: 16px;
  font-weight: 800;

  /* 모바일 뷰 */
  @media (max-width: 1279px) {
    font-size: 15px;
  }
`;

const ChannelWrap = styled.div`
  margin-top: 38px;
`;

const ChannelTitle = styled.p`
  margin-bottom: 15px;
  line-height: 17px;
  letter-spacing: -0.04em;
  color: ${colors.white};
  font-size: 14px;
  font-weight: 600;
`;

const ChannelIconWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(30px, auto));
  gap: 16px;
  width: 152px;
  height: 96px;

  & > svg {
    cursor: pointer;
  }
`;
