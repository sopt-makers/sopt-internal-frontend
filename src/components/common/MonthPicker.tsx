import 'react-datepicker/dist/react-datepicker.css';

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import DatePicker from 'react-datepicker';

import { textStyles } from '@/styles/typography';

export interface MonthPickerProps {
  onChange: (date: Date) => void;
  value: Date | null;
  placeholder?: string;
}

export default function MonthPicker({ onChange, value, placeholder }: MonthPickerProps) {
  return (
    <StyledDatePicker
      selected={value}
      onChange={(date: Date) => onChange?.(date)}
      dateFormat='yyyy-MM'
      showMonthYearPicker
      preventOpenOnFocus
      placeholderText={placeholder}
    />
  );
}

const StyledDatePicker = styled(DatePicker)`
  box-sizing: border-box;
  transition: all 0.2s;
  border: 1.5px solid ${colors.gray800};
  border-radius: 6px;
  background-color: ${colors.gray800};
  padding: 11px 16px;
  width: 100%;
  color: ${colors.gray300};
  ${textStyles.SUIT_16_M};

  &::placeholder {
    color: ${colors.gray600};
  }

  &:focus {
    outline: none;
    border-color: ${colors.gray200};
    background-color: ${colors.gray800};
  }
`;
