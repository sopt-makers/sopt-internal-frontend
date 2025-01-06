import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { TextArea, TextField } from '@sopt-makers/ui';
import { MouseEvent, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import ImageUploader from '@/components/common/ImageUploader';
import useConfirm from '@/components/common/Modal/useConfirm';
import Responsive from '@/components/common/Responsive';
import Switch from '@/components/common/Switch';
import Text from '@/components/common/Text';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import FormItem from '@/components/members/upload/forms/FormItem';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import { MemberUploadForm } from '@/components/members/upload/types';
import IconCamera from '@/public/icons/icon-camera.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function MemberBasicFormSection() {
  const {
    control,
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<MemberUploadForm>();

  const getBirthdayErrorMessage = () => {
    if (errors.birthday?.year) return errors.birthday?.year.message;
    if (errors.birthday?.month) return errors.birthday?.month.message;
    if (errors.birthday?.day) return errors.birthday?.day.message;
    return '';
  };

  const { confirm } = useConfirm();

  const openMaskingModal = (title: ReactNode, description: ReactNode) => {
    return confirm({ title, description, okButtonText: '확인', cancelButtonText: '취소', maxWidth: 400 });
  };

  const openMaskingPhoneModal = () => {
    return openMaskingModal(
      '연락처를 숨기시겠어요?',
      <StyledMaskingModalDesc>
        <li>내 프로필에 연락처가 노출되지 않아요!</li>
        <li>연락처를 숨겨도 동일 모임장, 임원진, 메이커스 운영진은 해당 정보를 확인할 수 있어요.</li>
      </StyledMaskingModalDesc>,
    );
  };

  const handleBlind = async (e: MouseEvent, name: keyof MemberUploadForm, openModal: () => Promise<boolean>) => {
    if (getValues(name)) {
      setValue(name, false);
      return;
    }
    e.preventDefault();
    const result = await openModal();
    setValue(name, result);
  };

  return (
    <FormSection>
      <FormHeader title='기본정보' />
      <StyledFormItems>
        <FormItem title='프로필 사진' description={`예외 규격은 잘릴 수 있기 때문에,\n가로 300px 세로 300px 권장해요.`}>
          <Controller
            name='profileImage'
            control={control}
            render={({ field }) => (
              <StyledImageUploader src={getValues('profileImage')} {...field} emptyIcon={IconCamera} />
            )}
          />
        </FormItem>
        <FormItem title='이름' required errorMessage={errors.name?.message}>
          <StyledTextField
            disabled
            {...register('name')}
            isError={errors.hasOwnProperty('name')}
            errorMessage={errors.name?.message}
            placeholder='이름 입력'
          />
        </FormItem>
        <FormItem title='생년월일' errorMessage={getBirthdayErrorMessage()}>
          <BirthdayInputWrapper>
            <StyledTextField
              {...register('birthday.year')}
              placeholder='년도'
              isError={errors.birthday?.hasOwnProperty('year')}
              type='number'
              pattern='\d*'
            />
            <StyledTextField
              {...register('birthday.month')}
              placeholder='월'
              isError={errors.birthday?.hasOwnProperty('month')}
              type='number'
              pattern='\d*'
            />
            <StyledTextField
              {...register('birthday.day')}
              placeholder='일'
              isError={errors.birthday?.hasOwnProperty('day')}
              type='number'
              pattern='\d*'
            />
          </BirthdayInputWrapper>
        </FormItem>
        <FormItem title='연락처' errorMessage={errors.phone?.message} required className='maskable'>
          <StyledBlindSwitch>
            <StyledBlindSwitchTitle>정보 숨기기</StyledBlindSwitchTitle>
            <Switch
              {...register('isPhoneBlind')}
              onClick={(e) => handleBlind(e, 'isPhoneBlind', openMaskingPhoneModal)}
            />
          </StyledBlindSwitch>
          <StyledTextField {...register('phone')} placeholder='010XXXXXXXX' />
        </FormItem>
        <FormItem title='이메일' required errorMessage={errors.email?.message} className='maskable'>
          <StyledTextField {...register('email')} type='email' placeholder='이메일 입력' />
        </FormItem>
        <FormItem
          title='활동 지역'
          description={`가까운 지하철역을 작성해주세요. \n활동 지역이 여러개일 경우 쉼표(,)로 구분해서 적어주세요.`}
        >
          <StyledTextField
            {...register('address')}
            placeholder='ex) 광나루역, 서울역, 홍대입구역'
            style={{ marginTop: '4px' }}
          />
        </FormItem>
        <Responsive only='desktop'>
          <EducationInputWrapper>
            <FormItem title='학교'>
              <StyledEducationInput {...register('university')} placeholder='학교 입력' />
            </FormItem>
            <FormItem title='전공'>
              <StyledEducationInput {...register('major')} placeholder='전공 입력' />
            </FormItem>
          </EducationInputWrapper>
        </Responsive>
        <Responsive only='mobile' asChild>
          <FormItem title='학교 / 전공'>
            <EducationInputWrapper>
              <StyledEducationInput {...register('university')} placeholder='학교 입력' />
              <StyledEducationInput {...register('major')} placeholder='전공 입력' />
            </EducationInputWrapper>
          </FormItem>
        </Responsive>
        <FormItem title='나를 한 마디로 표현한다면?' description='아래 작성해주신 내용은 멤버 프로필 카드에 표시돼요!'>
          <Responsive only='desktop' asChild>
            <Controller
              name='introduction'
              render={({ field }) => (
                <StyledTextarea {...field} placeholder='ex) 프로 밤샘러, 데드리프트 잘하고 싶어요 등 ' maxLength={15} />
              )}
              control={control}
            />
          </Responsive>
          <Responsive only='mobile' asChild>
            <Controller
              name='introduction'
              render={({ field }) => (
                <StyledTextarea
                  placeholder='ex) 프로 밤샘러, 데드리프트 잘하고 싶어요 등 '
                  {...field}
                  maxLength={15}
                  fixedHeight={78}
                />
              )}
              control={control}
            />
          </Responsive>
        </FormItem>
      </StyledFormItems>
    </FormSection>
  );
}

const StyledFormItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 24px;

  .maskable {
    position: relative;

    input[type='checkbox'] {
      padding: 0;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 32px;
    margin-top: 24px;
  }
`;

const StyledImageUploader = styled(ImageUploader)`
  margin-top: 18px;
  border-radius: 26px;
  background-color: ${colors.gray800};
  width: 138px;
  height: 138px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
    border-radius: 21.4783px;
    width: 114px;
    height: 114px;
  }
`;

const StyledTextField = styled(TextField)`
  margin-top: 12px;
  width: 441px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
    width: 100%;
  }
`;

const StyledEducationInput = styled(StyledTextField)`
  width: 260px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;
  }
`;

const EducationInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 10px;
  }
`;

const BirthdayInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 441px;

  input {
    width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 7px;
    width: 100%;
  }
`;

const StyledTextarea = styled(TextArea)`
  margin-top: 16px;
  width: 444px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledBlindSwitch = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 70px;
  column-gap: 8px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    left: 60px;
  }
`;

const StyledBlindSwitchTitle = styled(Text)`
  ${fonts.BODY_16_M};

  line-height: 22px;
  color: ${colors.gray300};
`;

const StyledMaskingModalDesc = styled.ul`
  ${fonts.BODY_16_R};

  margin-left: 24px;
  list-style-type: disc;
  color: ${colors.gray300};
`;
