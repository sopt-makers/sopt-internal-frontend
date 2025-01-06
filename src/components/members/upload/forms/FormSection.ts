import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export const MemberFormSection = styled.section`
  border-radius: 30px;
  background-color: ${colors.gray900};
  padding: 40px 40px 50px;

  input {
    border-radius: 14px;
    padding: 14.5px 20px;

    &::placeholder {
      color: ${colors.gray400};
    }

    @media ${MOBILE_MEDIA_QUERY} {
      border-radius: 12px;
      border-color: ${colors.gray800};
      background-color: ${colors.gray800};
    }
  }

  textarea {
    ${textStyles.SUIT_16_M}

    &::placeholder {
      color: ${colors.gray400};
    }

    @media ${MOBILE_MEDIA_QUERY} {
      border-radius: 12px;
      border-color: ${colors.gray800};
      background-color: ${colors.gray800};
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: initial;
    padding: 0;
  }
`;
