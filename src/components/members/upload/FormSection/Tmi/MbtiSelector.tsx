import styled from '@emotion/styled';

import MbtiToggle from '@/components/members/upload/FormSection/Tmi/MbtiToggle';
import { Mbti, MbtiIndicator } from '@/components/members/upload/FormSection/Tmi/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MbtiSelectorProps {
  mbti: Mbti;
  onSelect: (mbti: Mbti | null) => void;
}

export default function MbtiSelector({ mbti, onSelect }: MbtiSelectorProps) {
  const handleClickMbtiToggle = (index: number, value: MbtiIndicator | null) => {
    const newMbti: Mbti = [...mbti];
    newMbti[index] = value;

    onSelect(newMbti.every((mbtiIndicator) => mbtiIndicator === null) ? null : newMbti);
  };

  return (
    <Container>
      <MbtiToggle<Mbti[0]>
        left='E'
        right='I'
        selected={mbti[0]}
        onSelect={(value) => handleClickMbtiToggle(0, value)}
      />
      <MbtiToggle<Mbti[1]>
        left='N'
        right='S'
        selected={mbti[1]}
        onSelect={(value) => handleClickMbtiToggle(1, value)}
      />
      <MbtiToggle<Mbti[2]>
        left='F'
        right='T'
        selected={mbti[2]}
        onSelect={(value) => handleClickMbtiToggle(2, value)}
      />
      <MbtiToggle<Mbti[3]>
        left='P'
        right='J'
        selected={mbti[3]}
        onSelect={(value) => handleClickMbtiToggle(3, value)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  row-gap: 14px;
  column-gap: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-wrap: wrap;
    column-gap: 0;
    justify-content: space-between;
    width: 100%;
  }
`;
