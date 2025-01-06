import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

type FormType = 'upload' | 'edit';
const TYPE_MAP: Record<FormType, string> = { upload: '업로드', edit: '수정' };

interface MemberFormProps {
  type: FormType;
  children: ReactNode;
  onSubmit: () => void;
  isValid: boolean;
}

export default function MemberForm({ type, children, onSubmit, isValid }: MemberFormProps) {
  return (
    <StyledContainer>
      <StyledHeader>
        <div className='title'>프로필 {TYPE_MAP[type]}</div>
        <div className='description'>SOPT 멤버들을 위한 프로필을 {TYPE_MAP[type]}해주세요</div>
      </StyledHeader>
      <StyledForm>
        {children}
        <SubmitButton type='submit' onClick={onSubmit} isDisabled={!isValid} disabled={!isValid}>
          프로필 {TYPE_MAP[type]}하기
        </SubmitButton>
      </StyledForm>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 283px;

  & > * {
    width: 790px;
    @media (max-width: 790px) {
      width: 100%;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 194px;
  }
`;

const StyledHeader = styled.header`
  margin-top: 142px;

  .title {
    color: #fcfcfc;
    font-size: 40px;
    font-weight: 700;

    @media ${MOBILE_MEDIA_QUERY} {
      margin-left: 24px;
      font-size: 24px;
    }
  }

  .description {
    margin-top: 16px;
    color: ${colors.gray400};
    font-size: 18px;
    font-weight: 500;

    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 12px;
      margin-left: 24px;
      font-size: 14px;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 36px;
  }
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 50px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 64px;
    margin-top: 36px;
    padding: 0 20px 48px;
  }
`;

const SubmitButton = styled.button<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  align-self: flex-end;
  justify-content: center;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  margin-top: 26px;
  border-radius: 31px;
  background-color: ${colors.white};
  width: 163px;
  height: 42px;
  line-height: 120%;
  color: ${colors.gray950};

  ${({ isDisabled }) =>
    isDisabled
      ? css`
          background-color: ${colors.gray800};
          color: ${colors.gray400};
          cursor: not-allowed;
        `
      : css`
          &:hover {
            background-color: ${colors.gray50};
            color: ${colors.gray950};
          }
        `}

  ${textStyles.SUIT_14_M}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;
    border-radius: 12px;
    width: 100%;
    height: 52px;
    line-height: 100%;

    ${textStyles.SUIT_16_SB}
  }
`;
