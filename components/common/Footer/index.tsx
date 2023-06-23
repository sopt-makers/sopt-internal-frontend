import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { FEEDBACK_FORM_URL, playgroundLink } from '@/constants/links';
import useScroll from '@/hooks/useScroll';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({}) => {
  const { isScrollingDown, isScrollTop } = useScroll();
  const { logClickEvent } = useEventLogger();
  const { pathname } = useRouter();

  return (
    <StyledFooter hide={isScrollingDown && !isScrollTop}>
      <Link href={playgroundLink.makers()} passHref legacyBehavior>
        <FooterLink highlight={pathname === playgroundLink.makers()} onClick={() => logClickEvent('aboutMakers')}>
          만든 사람들
        </FooterLink>
      </Link>
      <FooterLink href={FEEDBACK_FORM_URL} target='_blank'>
        의견 제안하기
      </FooterLink>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div<{ hide: boolean }>`
  display: flex;
  position: fixed;
  bottom: 0;
  transition: transform 0.3s;
  z-index: 99999;
  border-top: 1px solid ${colors.black40};
  background-color: ${colors.black80};
  padding: 0 0 0 38px;
  width: 100%;

  ${(props) =>
    props.hide
      ? css`
          transform: translateY(100%);
        `
      : ''}

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 0 0 10px;
  }
`;

const FooterLink = styled.a<{ highlight?: boolean }>`
  padding: 17px 10px;

  ${(props) =>
    props.highlight
      ? css`
          color: ${colors.white100};
        `
      : css`
          color: ${colors.gray40};
        `}
`;
