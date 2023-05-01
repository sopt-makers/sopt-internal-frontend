import styled from '@emotion/styled';
import { ChangeEvent, FC } from 'react';

import Switch from '@/components/common/Switch';
import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

type Status = {
  isAvailable: boolean;
  isFounding: boolean;
};

interface StatusFieldProps {
  className?: string;
  value: Status;
  onChange: (value: Status) => void;
}

const StatusField: FC<StatusFieldProps> = ({ className, value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <StyledStatusField className={className}>
      <StyledWrapper>
        <StyledSubTitle>현재 이 서비스를 이용할 수 있나요?</StyledSubTitle>
        <Switch name='isAvailable' checked={value.isAvailable} onChange={handleChange} />
      </StyledWrapper>
      <StyledWrapper>
        <StyledSubTitle>현재 이 프로젝트로 창업을 진행하고 있나요?</StyledSubTitle>
        <Switch name='isFounding' checked={value.isFounding} onChange={handleChange} />
      </StyledWrapper>
    </StyledStatusField>
  );
};

export default StatusField;

const StyledStatusField = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
`;

const StyledSubTitle = styled(Text)`
  color: ${colors.gray100};
  ${textStyles.SUIT_14_M};
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;
