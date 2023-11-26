import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import { InputProps } from '@/components/common/Input';
import SearchIcon from '@/public/icons/icon-member-search.svg';
import SearchClearIcon from '@/public/icons/icon-search-clear.svg';
import { textStyles } from '@/styles/typography';

interface MemberSearchProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (searchQuery: string) => void;
}
const MemberSearch: FC<MemberSearchProps> = ({ value, onChange, className, onSearch, ...props }) => {
  const handleSearch = () => {
    onSearch?.(value);
  };
  const handleClear = () => {
    onChange('');
    onSearch?.('');
  };

  return (
    <StyledMemberSearch
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <StyledInput type='text' value={value} onChange={(e) => onChange(e.target.value)} {...props} />
      <StyledSearchIcon onClick={handleSearch} alt='검색 아이콘' />
      {value !== '' && <StyledSearchClearIcon onClick={handleClear} alt='검색어 삭제 아이콘' />}
    </StyledMemberSearch>
  );
};

export default MemberSearch;

const StyledMemberSearch = styled.form`
  position: relative;
`;

const StyledInput = styled.input`
  transition: all 0.2s;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: ${colors.gray800};
  padding: 18px 45px 18px 24px;
  width: 100%;
  min-width: 60px;
  color: ${colors.gray10};

  ${textStyles.SUIT_16_M};

  &::placeholder {
    color: ${colors.gray300};
  }

  &:focus {
    outline: none;
    border-color: ${colors.gray200};
    background-color: ${colors.gray800};
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 18px;
  right: 24px;
  cursor: pointer;
  width: 18px;
  height: 18px;
`;

const StyledSearchClearIcon = styled(SearchClearIcon)`
  position: absolute;
  top: 19.5px;
  right: 24px;
  cursor: pointer;
`;
