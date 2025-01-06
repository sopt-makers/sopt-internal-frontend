import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import WarningIcon from 'public/icons/icon-warning.svg';
import { HTMLAttributes, ReactNode, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import IconDelete from '@/public/icons/icon-delete.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MemberAddableItemProps extends HTMLAttributes<HTMLDivElement> {
  onRemove: () => void;
  errorMessage?: string;
  children: ReactNode;
  required?: boolean;
  isFirstItem?: boolean;
}

export default function MemberAddableItem({
  onRemove,
  errorMessage,
  children,
  required,
  isFirstItem = false,
  ...props
}: MemberAddableItemProps) {
  return (
    <StyledContainer {...props}>
      <StyledItemWrapper>
        {children}
        <Responsive only='desktop' asChild>
          <StyledDeleteButton onClick={required ? undefined : onRemove} isVisible={!required && !isFirstItem}>
            <IconDelete />
          </StyledDeleteButton>
        </Responsive>
        <Responsive only='mobile' asChild>
          <MobileDeleteButton onClick={required ? undefined : onRemove} isVisible={!required && !isFirstItem}>
            삭제
          </MobileDeleteButton>
        </Responsive>
      </StyledItemWrapper>
      {errorMessage && (
        <StyledError>
          <WarningIcon />
          <StyledErrorMessage type='error'>{errorMessage}</StyledErrorMessage>
        </StyledError>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
`;

const StyledItemWrapper = styled.div`
  display: flex;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
  }
`;

const StyledDeleteButton = styled.button<{ isVisible: boolean }>`
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  margin-left: 8px;
`;

const MobileDeleteButton = styled.button<{ isVisible: boolean }>`
  align-self: flex-end;
  margin-top: 20px;
  margin-right: 5px;
  color: ${colors.gray200};
  font-size: 14px;
  font-weight: 600;

  ${({ isVisible }) => isVisible || 'visibility: hidden;'}
`;

const StyledError = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const StyledErrorMessage = styled(Text)`
  display: block;
`;
