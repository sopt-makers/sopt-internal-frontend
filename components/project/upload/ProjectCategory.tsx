import Select from '@/components/common/Select';
import Text from '@/components/common/Text';
import { categoryLabel } from '@/components/project/upload/constants';
import FormTitle from '@/components/project/upload/FormTitle';
import { Category } from '@/components/project/upload/types';
import { ProjectUploadForm } from '@/pages/project/upload';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const ProjectCategory: FC = () => {
  const { register } = useFormContext<ProjectUploadForm>();
  return (
    <>
      <StyledTitle essential>어디서 진행했나요?</StyledTitle>
      <StyledDescription>기수는 SOPT 공식 활동을 기준으로 선택해주세요</StyledDescription>
      <StyledSelect placeholder='선택' {...register('category')}>
        {Object.values(Category).map((category) => (
          <option key={category} value={category}>
            {categoryLabel[category]}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};

export default ProjectCategory;

const StyledTitle = styled(FormTitle)`
  margin: 61.25px 0 14px;
`;

const StyledDescription = styled(Text)`
  margin: 0 0 18px;
  color: ${colors.gray100};
  ${textStyles.SUIT_14_M};
`;

const StyledSelect = styled(Select)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 160px;
    ${textStyles.SUIT_14_M}
  }
`;
