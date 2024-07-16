import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Text from '@/components/common/Text';
import { BackgroundOrange } from '@/components/resolution/read/images';
import { TitleDecoration } from '@/components/resolution/read/images';

const tags = ['창업 기반', '문제 해결 능력', '전문성 강화', '협업 경험', '프로덕트 릴리즈'];
const message = '은서야 멋진 시간 보냈지?';

const ResolutionMessage = () => {
  return (
    <ResolutionMessageWrapper>
      <BackgroundImage />
      <Contents>
        <TitleWrapper>
          <TitleText color={colors.white} typography='SUIT_18_B'>
            NOW SOPT를 마친 태희에게
          </TitleText>
          <StyledTitleDecoration />
        </TitleWrapper>
      </Contents>
    </ResolutionMessageWrapper>
  );
};

export default ResolutionMessage;

const ResolutionMessageWrapper = styled.main`
  position: relative;
  width: 100%;
  max-width: 335px;
`;

const Contents = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

const BackgroundImage = styled(BackgroundOrange)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const TitleWrapper = styled.div`
  position: relative;
`;

const StyledTitleDecoration = styled(TitleDecoration)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleText = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-48%, -49%);
  min-width: 138px;
  text-align: center;
`;
