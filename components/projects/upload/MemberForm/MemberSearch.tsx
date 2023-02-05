import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Command } from 'cmdk';
import { FC, HTMLAttributes, useMemo, useState } from 'react';
import { useCallback } from 'react';

import { Member } from '@/api/members/type';
import Text from '@/components/common/Text';
import IconClear from '@/public/icons/icon-member-search-clear.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const getProfileImage = (profileImage: Member['profileImage']) => {
  if (profileImage == null || profileImage === '') {
    return '/icons/icon-member-search-default.svg';
  }
  return profileImage;
};

interface MemberSearchProps extends HTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  searchedMembers: Member[];
  onSearch?: (searchQuery: string) => void;
  onClear?: () => void;
}

const MemberSearch: FC<MemberSearchProps> = ({ searchedMembers, isError, onSearch, onClear, ...props }) => {
  const [value, setValue] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>();
  // 이 로직을 부모 컴포넌트로 빼고, react-hook-form 에서는 id로만 value를 트래킹 하도록 바꿔보자!
  // 그럼 selectedMember와 members를 받아야겠지?
  const memberMap = useMemo(
    () => new Map(searchedMembers.map((member) => [String(member.id), member])),
    [searchedMembers],
  );
  const memberList = selectedId ? [] : searchedMembers;

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId(id);
      setValue('');
    },
    [setSelectedId, setValue],
  );
  const handleClear = useCallback(() => {
    setSelectedId(undefined);
    onClear?.();
  }, [setSelectedId, onClear]);

  return (
    <StyledSearch shouldFilter={false}>
      <StyledInput
        isError={isError}
        {...props}
        value={value}
        onValueChange={(value) => {
          setValue(value);
          onSearch?.(value);
        }}
        placeholder={!selectedId ? 'SOPT 멤버 검색' : ''}
        readOnly={!!selectedId}
      />
      {selectedId && (
        <StyledLabel>
          <ProfileImageWrapper>
            <ProfileImage width={24} height={24} src={getProfileImage(memberMap.get(selectedId)?.profileImage)} />
            <Text>{memberMap.get(selectedId)?.name}</Text>
          </ProfileImageWrapper>
          <StyledIconClear onClick={handleClear} alt='검색된 멤버 제거 아이콘' />
        </StyledLabel>
      )}
      {memberList.length > 0 && (
        <StyledList>
          {memberList.map((member) => (
            <StyledItem key={member.id} value={String(member.id)} onSelect={handleSelect}>
              <MemberInfo>
                <ProfileImage src={getProfileImage(member.profileImage)} alt='멤버의 프로필 이미지' />
                <Text>{member.name}</Text>
              </MemberInfo>
              <Text>{`${member.generation}기`}</Text>
            </StyledItem>
          ))}
        </StyledList>
      )}
    </StyledSearch>
  );
};

export default MemberSearch;

const StyledSearch = styled(Command)`
  position: relative;
  ${textStyles.SUIT_14_M};
  @media ${MOBILE_MEDIA_QUERY} {
    z-index: 1;
    max-width: 135px;
  }
`;

const StyledInput = styled(Command.Input)<{ isError?: boolean }>`
  transition: all 0.2s;
  border: 1px solid ${colors.black60};
  border-radius: 6px;
  background: ${colors.black60};
  padding: 14px 20px;
  color: ${colors.gray100};

  &:focus {
    outline: none;
    border-color: ${colors.purple100};
    background-color: ${colors.black80};
  }

  ${({ isError }) =>
    isError &&
    css`
      border-color: ${colors.red100};
      /* stylelint-disable-next-line no-duplicate-selectors */
      &:focus {
        border-color: ${colors.red100};
      }
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    border: 1px solid ${colors.black40};
  }
`;

const StyledLabel = styled.label`
  display: flex;
  position: absolute;
  top: 0;
  align-items: center;
  justify-content: space-between;
  column-gap: 6px;
  z-index: 1;
  padding: 12px 20px;
  width: 100%;
  ${textStyles.SUIT_16_SB};
  ${colors.gray10};

  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const StyledIconClear = styled(IconClear)`
  transition: opacity 0.1s linear;
  opacity: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
`;

const StyledList = styled(Command.List)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  background: ${colors.black60};
  padding: 8px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    top: 49px;
    border: 1px solid ${colors.black40};
  }
`;

const StyledItem = styled(Command.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.black60};
  cursor: pointer;
  padding: 10px 16px;
  color: ${colors.gray100};

  &:hover {
    background-color: ${colors.black40};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 135px;
  }
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  width: 20px;
  height: 20px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
