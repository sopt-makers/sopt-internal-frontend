import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Controller, FieldError, useFieldArray, useFormContext } from 'react-hook-form';

import BottomSheetSelect from '@/components/coffeechat/upload/CoffeechatForm/BottomSheetSelect';
import Responsive from '@/components/common/Responsive';
import AddableItem from '@/components/members/upload/AddableItem';
import AddableWrapper from '@/components/members/upload/AddableWrapper';
import { DEFAULT_ACTIVITY, PARTS, TEAMS } from '@/components/members/upload/constants';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import Select from '@/components/members/upload/forms/Select';
import { MemberUploadForm } from '@/components/members/upload/types';
import { GENERATIONS, LAST_EDITABLE_GENERATION } from '@/constants/generation';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MemberSoptActivityFormSectionProps {
  isEditable?: boolean;
  isCheckPage?: boolean;
  handleClickDisabled?: () => void;
}

export default function MemberSoptActivityFormSection({
  isEditable,
  isCheckPage = false,
  handleClickDisabled,
}: MemberSoptActivityFormSectionProps) {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext<MemberUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities',
  });

  const onAppend = () => append(DEFAULT_ACTIVITY);
  const onRemove = (index: number) => remove(index);
  const getActivityErrorMessage = (
    activityError:
      | {
          generation?: FieldError | undefined;
          part?: FieldError | undefined;
          team?: FieldError | undefined;
        }
      | undefined,
  ) => {
    if (!activityError) return;
    if (activityError.hasOwnProperty('generation')) return activityError.generation?.message;
    if (activityError.hasOwnProperty('part')) return activityError.part?.message;
    return activityError.team?.message;
  };

  const checkDuplicateGeneration = (value: string, id: number) => {
    const activities = getValues('activities');
    return (
      activities.find(({ generation }, index) => index !== id && generation === value) === undefined ||
      '기수가 중복되었어요.'
    );
  };

  const checkEditableGeneration = (generation: string) => {
    if (generation === '') return true;
    const num = generation.match(/\d+/g);
    if (!num) return false;
    return Number(num[0]) <= LAST_EDITABLE_GENERATION;
  };

  return (
    <StyledFormSection>
      {!isCheckPage && (
        <FormHeader title='SOPT 활동 정보' description='추가적인 수정은 채널톡 문의를 통해서만 가능합니다.' required />
      )}
      <StyledAddableWrapper onAppend={onAppend} isCheckPage={isCheckPage}>
        {fields.map((field, index) =>
          isEditable && checkEditableGeneration(field.generation) ? (
            <AddableItem
              onRemove={() => onRemove(index)}
              key={field.id}
              isFirstItem={index === 0}
              errorMessage={getActivityErrorMessage(errors.activities?.[index])}
            >
              <StyledSelectWrapper>
                <Controller
                  name={`activities.${index}.generation`}
                  control={control}
                  rules={{
                    validate: (value) => checkDuplicateGeneration(value, index),
                  }}
                  render={({ field }) => (
                    <>
                      <Responsive only='desktop'>
                        <StyledSelect
                          placeholder='활동기수'
                          options={FILTERED_GENERATIONS}
                          onChange={(value) => {
                            field.onChange(value);
                            handleClickDisabled?.();
                          }}
                        />
                      </Responsive>
                      <Responsive only='mobile'>
                        <BottomSheetSelect
                          options={FILTERED_GENERATIONS}
                          value={field.value}
                          placeholder='활동기수'
                          onChange={(value) => {
                            field.onChange(value);
                            handleClickDisabled?.();
                          }}
                        />
                      </Responsive>
                    </>
                  )}
                />
                <Controller
                  name={`activities.${index}.part`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <Responsive only='desktop'>
                        <StyledSelect
                          placeholder='파트'
                          options={PARTS}
                          value={PARTS.find((option) => option.value === field.value)}
                          onChange={(value) => {
                            field.onChange(value);
                            handleClickDisabled?.();
                          }}
                        />
                      </Responsive>
                      <Responsive only='mobile'>
                        <BottomSheetSelect
                          options={PARTS}
                          value={field.value}
                          placeholder='파트'
                          onChange={(value) => {
                            field.onChange(value);
                            handleClickDisabled?.();
                          }}
                        />
                      </Responsive>
                    </>
                  )}
                />
                <Controller
                  name={`activities.${index}.team`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <Responsive only='desktop'>
                        <StyledSelect
                          placeholder='운팀/미팀 여부'
                          options={TEAMS}
                          onChange={(value) => {
                            field.onChange(value);
                            handleClickDisabled?.();
                          }}
                        />
                      </Responsive>
                      <Responsive only='mobile'>
                        <BottomSheetSelect
                          options={TEAMS}
                          value={field.value}
                          placeholder='운팀/미팀 여부'
                          onChange={(value) => {
                            field.onChange(value);
                            handleClickDisabled?.();
                          }}
                        />
                      </Responsive>
                    </>
                  )}
                />
              </StyledSelectWrapper>
            </AddableItem>
          ) : (
            <StyledSelectWrapper key={field.id}>
              <Controller
                name={`activities.${index}.generation`}
                control={control}
                render={({ field }) => (
                  <>
                    <Responsive only='desktop'>
                      <StyledSelect
                        disabled
                        value={
                          FILTERED_GENERATIONS.find((option) => option.value === field.value) || {
                            label: field.value,
                            value: field.value,
                          }
                        }
                        placeholder='활동기수'
                        options={FILTERED_GENERATIONS}
                        className='generation'
                      />
                    </Responsive>
                    <Responsive only='mobile'>
                      <BottomSheetSelect
                        disabled
                        options={FILTERED_GENERATIONS}
                        value={field.value}
                        placeholder='활동기수'
                        onChange={(value) => {
                          field.onChange(value);
                          handleClickDisabled?.();
                        }}
                      />
                    </Responsive>
                  </>
                )}
              />
              <Controller
                name={`activities.${index}.part`}
                control={control}
                render={({ field }) => (
                  <>
                    <Responsive only='desktop'>
                      <StyledSelect
                        disabled
                        value={PARTS.find((option) => option.value === field.value)}
                        placeholder='파트'
                        options={PARTS}
                        className='part'
                      />
                    </Responsive>
                    <Responsive only='mobile'>
                      <BottomSheetSelect
                        disabled
                        options={PARTS}
                        value={field.value}
                        placeholder='파트'
                        onChange={(value) => {
                          field.onChange(value);
                          handleClickDisabled?.();
                        }}
                      />
                    </Responsive>
                  </>
                )}
              />
              <Controller
                name={`activities.${index}.team`}
                control={control}
                render={({ field }) => (
                  <>
                    <Responsive only='desktop'>
                      <StyledSelect
                        value={TEAMS.find((option) => option.value === field.value)}
                        placeholder='운팀/미팀 여부'
                        className='team'
                        options={TEAMS}
                        onChange={(value) => field.onChange(value)}
                      />
                    </Responsive>
                    <Responsive only='mobile'>
                      <BottomSheetSelect
                        options={TEAMS}
                        value={field.value}
                        placeholder='운팀/미팀 여부'
                        onChange={(value) => {
                          field.onChange(value);
                          handleClickDisabled?.();
                        }}
                      />
                    </Responsive>
                  </>
                )}
              />
            </StyledSelectWrapper>
          ),
        )}
      </StyledAddableWrapper>
    </StyledFormSection>
  );
}

const FILTERED_GENERATIONS = GENERATIONS.filter((generation) => parseInt(generation) <= LAST_EDITABLE_GENERATION).map(
  (generation) => ({
    value: generation + '기',
    label: generation + '기',
  }),
);

const StyledFormSection = styled(FormSection)`
  background-color: ${colors.gray900};
  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 17px;
  }
`;

const StyledAddableWrapper = styled(AddableWrapper)<{ isCheckPage: boolean }>`
  margin-top: ${({ isCheckPage }) => !isCheckPage && '32px'};
  width: 683px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: ${({ isCheckPage }) => !isCheckPage && '32px'};
    width: 100%;
  }
`;

const StyledSelectWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid-template-areas:
      'generation part'
      'team team';
    grid-template-columns: 1fr 1fr;

    & > div {
      width: 100%;
    }

    & > div:last-child {
      grid-area: team;
    }
  }
`;

const StyledSelect = styled(Select)`
  width: 203px;

  & button,
  & div {
    width: 100%;
  }
`;
