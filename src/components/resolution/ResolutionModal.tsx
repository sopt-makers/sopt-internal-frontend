import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { colors } from '@sopt-makers/colors';
import ProfileIcon from 'public/icons/icon-profile.svg';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { usePostResolutionMutation } from '@/api/endpoint/resolution/postResolution';
import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import TextArea from '@/components/common/TextArea';
import { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

// 서버 변경 후 반영 필요
export enum ResolutionTag {
  SKILL_ENHANCEMENT = '능력 향상',
  IT_KNOWLEDGE = 'IT 지식',
  FRIENDSHIP = '친목',
  ENTREPRENEURSHIP_FOUNDATION = '창업 기반',
  COLLABORATION_EXPERIENCE = '협업 경험',
  GREAT_TEAM = '좋은 팀',
}

interface Tag {
  icon: string;
  value: ResolutionTag;
}
// 서버 변경 후 반영 필요
const TAG: Tag[] = [
  {
    icon: '🏃',
    value: ResolutionTag.SKILL_ENHANCEMENT,
  },
  {
    icon: '👨‍💻',
    value: ResolutionTag.IT_KNOWLEDGE,
  },
  {
    icon: '🍻',
    value: ResolutionTag.FRIENDSHIP,
  },
  {
    icon: '🚀',
    value: ResolutionTag.ENTREPRENEURSHIP_FOUNDATION,
  },
  {
    icon: '🤝',
    value: ResolutionTag.COLLABORATION_EXPERIENCE,
  },
  {
    icon: '👍',
    value: ResolutionTag.GREAT_TEAM,
  },
];

const schema = yup.object().shape({
  content: yup.string().required('내용을 입력해주세요.').max(300, '300자 이내로 입력해주세요.'),
});

interface ResolutionForm {
  tags: ResolutionTag[];
  content: string;
}

interface ResolutionModalProps extends ModalProps {
  profileImageUrl: string;
}

const ResolutionModal: FC<ResolutionModalProps> = ({ profileImageUrl, ...props }) => {
  const [selectedTag, setSelectedTag] = useState<ResolutionTag[]>([]);
  const { handleSubmit, control, formState } = useForm<ResolutionForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const isValid = formState.isValid;

  const { mutateAsync, isPending } = usePostResolutionMutation();

  const onClickTag = (tag: ResolutionTag) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag(selectedTag.filter((t) => t !== tag));
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };

  const submit = async ({ content }: ResolutionForm) => {
    // 재확인 모달 추가하기
    try {
      if (!isValid) return;
      await mutateAsync({
        content,
        tags: selectedTag,
      });
      props.onClose();
    } catch (error) {
      throw error;
    }
  };

  return (
    <StyledModal isOpen {...props} zIndex={101}>
      <StyledForm onSubmit={handleSubmit(submit)}>
        {profileImageUrl ? (
          <ProfileImage src={profileImageUrl} />
        ) : (
          <EmptyProfileImage>
            <ProfileIcon />
          </EmptyProfileImage>
        )}
        <Text mt={30} typography='SUIT_24_B'>
          SOPT 34기를 마친 나에게
        </Text>
        <Text mt={4} typography='SUIT_14_M' color={colors.gray200}>
          종무식을 맞이하고 있을 미래의 나를 상상하며 적어봐요!
        </Text>
        <TagTextWrapper>
          <Text typography='SUIT_14_M' color={colors.gray30}>
            NOW SOPT에서 이루고 싶은 목표
          </Text>
          <Text typography='SUIT_14_M' color={colors.gray400}>
            (다중 선택 가능)
          </Text>
        </TagTextWrapper>
        <StyledTags>
          {TAG.map((tag, index) => (
            <StyledTagItem
              key={index}
              onClick={() => onClickTag(tag.value)}
              isSelected={selectedTag.includes(tag.value)}
            >
              <Text typography='SUIT_16_SB' color={colors.gray200}>
                {tag.icon} {tag.value}
              </Text>
            </StyledTagItem>
          ))}
        </StyledTags>
        <RHFControllerFormItem
          maxCount={300}
          control={control}
          name='content'
          component={StyledTextArea}
          count={true}
          placeholder='솝트에서 이루고 싶은 것, 현재의 다짐 등 34기 활동을 시작하는 스스로에게 하고 싶은 말을 자유롭게 적어주세요!'
        />
        <StyledButton isDisabled={!isValid}>
          {isPending ? (
            <Loading color='white' />
          ) : (
            <Text typography='SUIT_14_SB' color={isValid ? colors.black : colors.gray500}>
              미래의 나에게 편지 보내기
            </Text>
          )}
        </StyledButton>
      </StyledForm>
    </StyledModal>
  );
};

export default ResolutionModal;

const StyledModal = styled(Modal)`
  background-color: ${colors.gray900};
  padding-top: 20px;
  max-height: 100vh;
  overflow-y: auto;

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  width: 426px;
`;

const ProfileImage = styled.img`
  border-radius: 20px;
  width: 84px;
  height: 84px;
  object-fit: cover;
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 20px;
    width: 88px;
    height: 88px;
  }
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: ${colors.gray700};
  width: 84px;
  height: 84px;

  & > svg {
    width: 32px;
  }
`;

const StyledTags = styled.section`
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;

const StyledTagItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  transition: border all 0.2s;
  border: 1px solid ${({ isSelected }) => (isSelected ? colors.white : colors.gray900)};
  border-radius: 20px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 6px 16px 6px 10px;
`;

const StyledTextArea = styled(TextArea)`
  margin-top: 40px;
  border: 1px solid ${colors.gray800};
  background-color: ${colors.gray800};
  width: 386px;
  height: 198px;
`;

const StyledButton = styled.button<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  margin-top: 60px;
  margin-bottom: 44px;
  border-radius: 12px;
  background: ${({ isDisabled }) =>
    isDisabled ? colors.gray800 : ' linear-gradient(90deg, #effdb4 0%, #bdec00 100%)'};
  cursor: pointer;
  padding: 14px 28px;
`;

const TagTextWrapper = styled.div`
  display: flex;
  gap: 3px;
  margin-top: 36px;
`;
