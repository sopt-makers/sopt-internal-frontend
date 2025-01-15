import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconMail, IconUser } from '@sopt-makers/icons';
import { useDialog } from '@sopt-makers/ui';
import Link from 'next/link';

import { useGetCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import MessageModal from '@/components/coffeechat/CoffeeChatModal/CoffeeChatModal';
import RegisterCoffeechatButton from '@/components/coffeechat/detail/RegisterCoffeechatButton';
import ShowCoffeechatToggle from '@/components/coffeechat/detail/ShowCoffeechatToggle';
import useModalState from '@/components/common/Modal/useModalState';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface OpenerProfileProps {
  memberId: string;
}

export default function OpenerProfile({ memberId }: OpenerProfileProps) {
  const { data: openerProfile } = useGetCoffeechatDetail(memberId);
  const { isOpen: isOpenMessageModal, onOpen: onOpenMessageModal, onClose: onCloseMessageModal } = useModalState();
  const { open } = useDialog();

  const handleImpossibleToRegister = () => {
    open({
      title: `비활성화된 커피챗이에요.`,
      description: ``,
      type: 'single',
      typeOptions: {
        approveButtonText: '확인',
        buttonFunction: async () => {
          //
        },
      },
    });
  };

  return (
    <>
      {openerProfile && (
        <OpenerProfileSection isMine={!!openerProfile.isMine}>
          <Link href={'/members/' + memberId}>
            <ProfileImageBox>
              {openerProfile.profileImage ? (
                <ProfileImage src={openerProfile.profileImage} alt='프로필 이미지' />
              ) : (
                <StIconBox>
                  <StIconUser />
                </StIconBox>
              )}
            </ProfileImageBox>
          </Link>
          <ProfileInfoBox>
            <ProfileHeader>
              <Name>{openerProfile.name}</Name>
              <Career>{openerProfile.career}</Career>
            </ProfileHeader>
            <Company>
              {openerProfile.organization && openerProfile.organization}
              {openerProfile.memberCareerTitle && ' | ' + openerProfile.memberCareerTitle}
            </Company>
            <InfoWrapper>
              {openerProfile.phone && (
                <IconInfo>
                  <PhoneIcon /> <InfoText>{openerProfile.phone}</InfoText>
                </IconInfo>
              )}
              <IconInfo>
                <MailIcon /> <InfoText>{openerProfile.email}</InfoText>
              </IconInfo>
            </InfoWrapper>
          </ProfileInfoBox>
          <ButtonSection>
            {openerProfile.isMine ? (
              <ShowCoffeechatToggle isBlind={!!openerProfile.isCoffeeChatActivate} memberId={memberId} />
            ) : (
              <RegisterCoffeechatButton
                onClick={() => {
                  openerProfile.isCoffeeChatActivate ? onOpenMessageModal() : handleImpossibleToRegister();
                }}
              />
            )}
          </ButtonSection>
          {isOpenMessageModal && <MessageModal receiverId={memberId} onClose={onCloseMessageModal} />}
        </OpenerProfileSection>
      )}
    </>
  );
}

const IconPhone = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21' fill='none'>
      <path
        d='M17.2202 16.1423C17.2202 16.1423 16.2546 17.0906 16.018 17.3686C15.6325 17.78 15.1784 17.9742 14.583 17.9742C14.5258 17.9742 14.4647 17.9742 14.4075 17.9704C13.274 17.898 12.2207 17.4562 11.4307 17.0792C9.27058 16.0356 7.37382 14.5541 5.79764 12.6764C4.49624 11.1111 3.6261 9.66381 3.04982 8.10989C2.6949 7.16155 2.56514 6.42268 2.62238 5.7257C2.66055 5.28009 2.83229 4.91066 3.14905 4.59454L4.45045 3.2958C4.63745 3.12061 4.83591 3.02539 5.03054 3.02539C5.27098 3.02539 5.46561 3.17012 5.58774 3.29199C5.59156 3.2958 5.59537 3.29961 5.59919 3.30342C5.83199 3.52051 6.05334 3.74522 6.28614 3.98516C6.40445 4.10704 6.52658 4.22891 6.6487 4.3546L7.69058 5.39435C8.09512 5.79806 8.09512 6.17131 7.69058 6.57502C7.57991 6.68547 7.47305 6.79592 7.36237 6.90256C7.04179 7.2301 7.29363 6.97878 6.9616 7.27586C6.95397 7.28347 6.94633 7.28728 6.94252 7.2949C6.6143 7.62244 6.67537 7.94236 6.74406 8.15946C6.74788 8.17088 6.7517 8.18231 6.75551 8.19373C7.02648 8.84881 7.40812 9.46581 7.98821 10.2009L7.99203 10.2047C9.04536 11.4996 10.1559 12.5089 11.381 13.282C11.5375 13.3811 11.6978 13.461 11.8504 13.5372C11.9878 13.6058 12.1176 13.6705 12.2283 13.7391C12.2435 13.7467 12.2588 13.7581 12.274 13.7657C12.4038 13.8305 12.5259 13.861 12.6519 13.861C12.9686 13.861 13.1671 13.6629 13.232 13.5982L13.98 12.8516C14.1098 12.7221 14.3159 12.566 14.5563 12.566C14.7929 12.566 14.9876 12.7145 15.1059 12.844C15.1097 12.8478 15.1097 12.8478 15.1135 12.8516L17.2164 14.9502C17.6094 15.3386 17.2202 16.1423 17.2202 16.1423Z'
        stroke='#808087'
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

const InfoText = styled.p`
  width: 100%;
  overflow-wrap: anywhere;
`;

const ButtonSection = styled.div`
  grid-area: buttonSection;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  color: ${colors.gray300};
  ${fonts.BODY_13_M};

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 4px;
    ${fonts.BODY_13_M};
  }
`;

const IconInfo = styled.div`
  display: flex;
  gap: 4px;
  align-items: flex-start;
`;

const ProfileHeader = styled.header`
  display: flex;
  gap: 11px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
  }

  @media (max-width: 360px) {
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
    margin-bottom: 4px;
  }
`;

const Company = styled.p`
  overflow-wrap: break-word;
  word-wrap: break-word;
  color: ${colors.gray200};
  ${fonts.BODY_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M};
  }
`;

const Name = styled.h1`
  color: ${colors.white};
  ${fonts.HEADING_28_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_24_B};
  }
`;

const Career = styled.h2`
  color: ${colors.gray100};
  ${fonts.BODY_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M};
  }
`;

const MailIcon = styled(IconMail)`
  width: 20px;
  height: 20px;
`;
const StIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray900};
  width: 100%;
  height: 100%;
`;
const StIconUser = styled(IconUser)`
  margin-top: 5px;
  width: 60px;
  color: ${colors.gray400};
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 3.5px;
    width: 46px;
  }
`;
// TODO: 폰 아이콘 mds에 반영되면 반영 필요
const PhoneIcon = styled(IconPhone)`
  width: 20px;
  height: 20px;
`;

const OpenerProfileSection = styled.section<{ isMine: boolean }>`
  display: grid;
  grid: [row1-start] 'profileImageBox profileInfoBox  buttonSection' auto [row1-end]/ auto;
  grid-template-columns: 1fr 5fr 2fr;
  gap: 28px;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ isMine }) =>
      isMine
        ? css`
            grid:
              [row1-start] 'profileImageBox profileInfoBox' auto [row1-end]
              [row2-start] 'blank buttonSection' auto [row2-end]/ auto;
            grid-template-columns: 1fr 10fr;
          `
        : css`
            grid:
              [row1-start] 'profileImageBox profileInfoBox' auto [row1-end]
              [row2-start] 'buttonSection buttonSection' auto [row2-end]/ auto;
            grid-template-columns: 1fr 10fr;
          `}

    gap: 16px 24px;
    align-items: flex-start;
    justify-content: start;
  }

  @media (max-width: 360px) {
    grid:
      [row1-start] 'profileImageBox profileInfoBox' auto [row1-end]
      [row2-start] 'buttonSection buttonSection' auto [row2-end]/ auto;
    grid-template-columns: 1fr 10fr;
  }
`;

const ProfileImageBox = styled.div`
  display: flex;
  position: relative;
  grid-area: profileImageBox;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: ${colors.gray700};
  width: 134px;
  height: 134px;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 21px;
    width: 120px;
    height: 120px;
  }

  @media (max-width: 430px) {
    width: 100px;
    height: 100px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: profileInfoBox;
  width: 100%;
`;
