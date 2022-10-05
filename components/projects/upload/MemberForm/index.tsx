// @ts-nocheck
// FIXME: react-hook-form의 타입이 옵셔널해서 맞춰지지 않아 임시로 주석처리(selectedMembers)
import styled from '@emotion/styled';
import _debounce from 'lodash/debounce';
import React, { FC, useState } from 'react';
import { Controller, useFieldArray, UseFieldArrayProps, useFormContext, useWatch } from 'react-hook-form';

import { Role } from '@/api/project/types';
import FormItem from '@/components/common/form/FormItem';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Text from '@/components/common/Text';
import useGetUsersByNameQuery from '@/components/projects/upload/hooks/useGetUsersByNameQuery';
import { DEFAULT_MEMBER, Member } from '@/components/projects/upload/MemberForm/constants';
import MemberSearch from '@/components/projects/upload/MemberForm/MemberSearch';
import useScreenSize from '@/hooks/useScreenSize';
import { ProjectUploadForm } from '@/pages/projects/upload';
import IconDelete from '@/public/icons/icon-delete.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberFormProps {
  name: UseFieldArrayProps<ProjectUploadForm, 'members' | 'releaseMembers', 'id'>['name'];
}

const MemberForm: FC<MemberFormProps> = ({ name }) => {
  const {
    formState: { errors },
    control,
    register,
    setValue,
  } = useFormContext<ProjectUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { members, releaseMembers } = useWatch({
    control,
  });
  const [searchName, setSearchName] = useState<string>('');
  const { data } = useGetUsersByNameQuery({
    name: searchName,
  });

  // MEMO: 모바일 뷰를 위한 변수,함수들 입니다.
  // 기존 데스크탑과 멤버 추가 방식과 UI가 아예 달라서 이를 분기처리하는 로직과, 수정상태인지 여부인 isEdit를 이용해야 하기 때문에 아래와 같은 로직들이 필요합니다.
  const selectedMembers: Member[] = (name === 'members' ? members : releaseMembers) ?? [];
  const onEdit = (index: number) => {
    setValue(`${name}.${index}.isEdit`, true);
  };
  const onAppend = () => {
    append({ ...DEFAULT_MEMBER, isTeamMember: name === 'members' });
  };
  const onComplete = (index: number) => {
    if (!(selectedMembers[index].user || selectedMembers[index].role || selectedMembers[index].description)) {
      return;
    }
    setValue(`${name}.${index}.isEdit`, false);
  };
  const onRemove = (index: number) => {
    setValue(
      `${name}`,
      selectedMembers.filter((_, memberIndex) => memberIndex !== index),
    );
  };

  return (
    <>
      <Container>
        {fields.map((field, index) => (
          <MemberItemWrapper key={field.id}>
            <Controller
              control={control}
              name={`${name}.${index}.user`}
              render={({ field: { value, onChange, name } }) => (
                <MemberSearchWrapper errorMessage={errors.members?.[index]?.user?.name?.message}>
                  <MemberSearch
                    error={!!errors?.members?.[index].user?.name}
                    members={data?.data ?? []}
                    onSearch={_debounce((e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value), 300)}
                    value={value}
                    onChange={onChange}
                    name={name}
                  />
                </MemberSearchWrapper>
              )}
            />
            <StyledSelect placeholder='역할' {...register(`${name}.${index}.role`)}>
              {Object.values(Role).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </StyledSelect>
            <Controller
              control={control}
              name={`${name}.${index}.description`}
              render={({ field }) => (
                <StyledInputFormItem errorMessage={errors.members?.[index]?.description?.message}>
                  <Input
                    error={!!errors.members?.[index]?.description}
                    placeholder='어떤 역할을 맡았는지 적어주세요'
                    {...field}
                  />
                </StyledInputFormItem>
              )}
            />
            <IconDeleteWrapper>
              <IconDelete onClick={() => remove(index)} />
            </IconDeleteWrapper>
          </MemberItemWrapper>
        ))}
        <MemberAddButton type='button' onClick={onAppend}>
          + 추가
        </MemberAddButton>
      </Container>
      <MobileContainer>
        {selectedMembers.map((selectedMember, memberIndex) => (
          <>
            {!selectedMember.isEdit ? (
              <MobileMemberItem key={selectedMember.user?.auth_user_id} onClick={() => onEdit(memberIndex)}>
                <Text typography='SUIT_12_M' color={colors.gray100}>
                  {selectedMember.user?.name}
                </Text>
                <Text style={{ marginLeft: '29px' }} typography='SUIT_12_M' color={colors.gray100}>
                  {selectedMember.role}
                </Text>
                <Text style={{ marginLeft: '40px' }} typography='SUIT_12_M' color={colors.gray100}>
                  {selectedMember.description}
                </Text>
              </MobileMemberItem>
            ) : (
              <MobileMemberApplyForm>
                <MobileMemberSelect>
                  <Controller
                    control={control}
                    name={`${name}.${memberIndex}.user`}
                    render={({ field: { value, onChange, name } }) => (
                      <MemberSearch
                        value={value}
                        onChange={onChange}
                        name={name}
                        members={data?.data ?? []}
                        onSearch={_debounce(
                          (e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value),
                          300,
                        )}
                      />
                    )}
                  />
                  <FormItem errorMessage={errors.members?.[index]?.role?.message}>
                    <MobileSelect placeholder='역할' {...register(`${name}.${memberIndex}.role`)}>
                      {Object.values(Role).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </MobileSelect>
                  </FormItem>
                </MobileMemberSelect>
                <Controller
                  control={control}
                  name={`${name}.${memberIndex}.description`}
                  render={({ field }) => <MobileDescription placeholder='어떤 역할을 맡았는지 적어주세요' {...field} />}
                />
                <MobileApplyFormFooter>
                  <IconDelete onClick={() => onRemove(memberIndex)} />
                  <MobileCompleteButton type='button' onClick={() => onComplete(memberIndex)}>
                    완료
                  </MobileCompleteButton>
                </MobileApplyFormFooter>
              </MobileMemberApplyForm>
            )}
          </>
        ))}
        <MobileAddButton type='button' onClick={onAppend}>
          추가하기
        </MobileAddButton>
      </MobileContainer>
    </>
  );
};

export default MemberForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 10px;

    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 12px;
    }
  }
  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const MemberAddButton = styled.button`
  align-self: start;
  margin: 8px 0 0 20px;
  cursor: pointer;
  color: ${colors.gray100};

  ${textStyles.SUIT_16_M};
`;

const MemberSearchWrapper = styled.div`
  width: 163px;
`;

const MemberItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledSelect = styled(Select)`
  margin: 0 10px;
  min-width: 200px;

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 158px;
  }
`;

const StyledInputFormItem = styled(FormItem)`
  width: 100% !important;

  & > input {
    ${textStyles.SUIT_14_M};

    border-width: 1px;
  }
`;

const IconDeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 14px 0 4px;
  cursor: pointer;
  min-width: 42px;
  min-height: 42px;
`;

// MEMO: Mobile view
const MobileContainer = styled.div`
  display: none;
  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
  }
`;
const MobileMemberApplyForm = styled.div`
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 12px;
`;

const MobileMemberSelect = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const MobileSelect = styled(Select)`
  ${textStyles.SUIT_14_M};

  border: 1px solid ${colors.black40};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 158px;
  }
`;

const MobileDescription = styled(Input)`
  ${textStyles.SUIT_14_M};

  margin-top: 12px;
  border: 1px solid ${colors.black40};
`;

const MobileApplyFormFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 15px;
`;

const MobileCompleteButton = styled.button`
  border-radius: 4px;
  background-color: ${colors.black40};
  padding: 6.5px 30px;
  color: ${colors.gray100};

  ${textStyles.SUIT_14_M};
`;

const MobileAddButton = styled.button`
  margin-top: 12px;
  border: 1px solid ${colors.black40};
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  width: 100%;
`;

const MobileMemberItem = styled.div`
  display: flex;
  border-radius: 6px;
  background-color: ${colors.black40};
  padding: 15px 20px;
`;
