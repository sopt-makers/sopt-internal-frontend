import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode } from 'react';

import IconPlus from '@/public/icons/icon-plus.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberAddableWrapperProps {
  children: ReactNode;
  onAppend: () => void;
  className?: string;
  isCheckPage?: boolean;
}

export default function MemberAddableWrapper({
  onAppend,
  children,
  className,
  isCheckPage = true,
}: MemberAddableWrapperProps) {
  return (
    <StyledContainer>
      <StyledAddableItems className={className}>{children}</StyledAddableItems>
      {isCheckPage && (
        <>
          <StyledAddButton onClick={onAppend} className='pc-only'>
            <IconPlus stroke={colors.gray10} />
            <div>추가</div>
          </StyledAddButton>
          <MobileAddButton onClick={onAppend}>
            <IconPlus stroke={colors.gray50} />
            <div>추가</div>
          </MobileAddButton>
        </>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: relative;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledAddButton = styled.button`
  display: flex;
  gap: 11px;
  align-items: center;
  margin-top: 23px;
  color: ${colors.gray10};

  ${textStyles.SUIT_16_SB}
`;

const MobileAddButton = styled.button`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border: 1px solid ${colors.gray50};
    border-radius: 12px;
    padding: 13px 0;
    width: 100%;
    color: ${colors.gray50};

    ${textStyles.SUIT_14_SB}

    & svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const StyledAddableItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 20px;
  }
`;
