import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberFormHeaderProps {
  title: string;
  required?: boolean;
  description?: string;
}

export default function MemberFormHeader({ title, required, description }: MemberFormHeaderProps) {
  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      {required && <StyledRequired>*</StyledRequired>}
      {description && <Description>{description}</Description>}
      <StyledLine />
    </>
  );
}

const StyledTitle = styled.h2`
  display: inline;
  color: ${colors.gray30};

  ${textStyles.SUIT_24_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_18_B};
  }
`;

const StyledLine = styled.hr`
  margin-top: 20px;
  margin-bottom: 0;
  border: none;
  background-color: ${colors.gray700};
  width: 100%;
  height: 1.5px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
    background-color: ${colors.gray700};
    height: 1px;
  }
`;

const StyledRequired = styled(Text)`
  display: inline-block;
  transform: translateY(-10px);
  margin-left: 4px;
  line-height: 8px;
  color: ${colors.secondary};
  font-size: 16px;
  font-weight: 500;
`;

const Description = styled(Text)`
  display: block;
  margin-top: 12px;
  color: ${colors.gray300};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    line-height: 150%;
    white-space: pre-line;

    ${textStyles.SUIT_13_M}
  }
`;
