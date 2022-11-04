import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import ImageUploader from '@/components/common/ImageUploader';
import Input from '@/components/common/Input';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import FormItem from '@/components/members/upload/forms/FormItem';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import { MemberUploadForm } from '@/components/members/upload/types';
import IconCamera from '@/public/icons/icon-camera.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function MemberBasicFormSection() {
  const { control, register } = useFormContext<MemberUploadForm>();

  return (
    <FormSection>
      <FormHeader title='기본정보' />
      <StyledFormItems>
        <FormItem
          title='프로필 사진'
          description={`가로 300px 세로 300px 권장합니다.\n예외 규격은 잘릴 수 있습니다.`}
          essential
        >
          <Controller
            name='profileImage'
            control={control}
            render={({ field }) => <StyledImageUploader {...field} emptyIcon={IconCamera} />}
          />
        </FormItem>
        <FormItem title='이름' essential>
          <StyledInput {...register('name')} />
        </FormItem>
        <FormItem title='생년월일' essential>
          <StyledBirthdayInputWrapper>
            <Input {...register('birthday.year')} placeholder='년도' />
            <Input {...register('birthday.month')} placeholder='월' />
            <Input {...register('birthday.day')} placeholder='일' />
          </StyledBirthdayInputWrapper>
        </FormItem>
        <FormItem title='연락처'>
          <StyledInput {...register('phone')} />
        </FormItem>
        <FormItem title='이메일' essential>
          <StyledInput {...register('email')} />
        </FormItem>
        <FormItem title='사는 지역' essential>
          <StyledInput {...register('address')} placeholder='ex) 서울시 강남구, 인천시 중구' />
        </FormItem>
        <FormItem title='학교 / 전공'>
          <StyledEducationInputWrapper>
            <Input {...register('university')} placeholder='학교 입력' className='school' />
            <Input {...register('major')} placeholder='전공 입력' className='major' />
          </StyledEducationInputWrapper>
        </FormItem>
      </StyledFormItems>
    </FormSection>
  );
}

const StyledFormItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;
  margin-top: 46px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 30px;
    margin-top: 30px;
  }
`;

const StyledImageUploader = styled(ImageUploader)`
  margin-top: 18px;
  border-radius: 26px;
  width: 138px;
  height: 138px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
    border-radius: 21.4783px;
    background-color: ${colors.black80};
    width: 114px;
    height: 114px;
  }
`;

const StyledInput = styled(Input)`
  margin-top: 20px;
  width: 441px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
    width: 100%;
  }
`;

const StyledBirthdayInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
  width: 441px;

  input {
    width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 7px;
    margin-top: 10px;
    width: 100%;
  }
`;

const StyledEducationInputWrapper = styled.div`
  display: flex;
  gap: 12.04px;
  margin-top: 20px;
  width: 630px;

  input {
    width: 100%;
  }

  .school {
    flex: 4;
  }

  .major {
    flex: 6;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
  }
`;
