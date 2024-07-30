import styled from '@emotion/styled';
import { FC } from 'react';

import Notifier from '@/components/makers/Notifier';
import LogoMakersFull from '@/public/logos/logo-makers-full.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const AboutMakers: FC = () => {
  return (
    <StyledAbout>
      <MakersLogoBox>
        <StyledLogo />
      </MakersLogoBox>
      <Intro>
        sopt makers는 SOPT 구성원들이 가진 불편함을 제품을 통해 해결하여, 3000여명의 구성원들에게 더 많은 가치를
        연결하기 위해 신설된 특수 기구에요.
      </Intro>
      <StyledNotifier />
    </StyledAbout>
  );
};

export default AboutMakers;

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  max-width: 800px;
`;

const MakersLogoBox = styled.div`
  padding-top: 10px;
`;

const StyledLogo = styled(LogoMakersFull)`
  width: 100%;
  max-width: 350px;
`;

const Intro = styled.div`
  margin-top: 80px;
  ${textStyles.SUIT_28_M}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 48px;
    ${textStyles.SUIT_16_M}
  }
`;

const StyledNotifier = styled(Notifier)`
  margin-top: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 48px;
  }
`;
