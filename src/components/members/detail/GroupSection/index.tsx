import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';

import { MeetingsResponse } from '@/api/endpoint/members/getMemberCrew';
import { ProfileDetail } from '@/api/endpoint_LEGACY/members/type';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import MemberMeetingCard from '@/components/members/detail/ActivitySection/MemberMeetingCard';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface GroupSectionProps {
  profile: ProfileDetail;
  meetingList: MeetingsResponse;
  ref: React.RefObject<HTMLDivElement>;
  meId?: number | undefined;
  memberId: string;
}

const GroupSection = ({ profile, meetingList, ref, meId, memberId }: GroupSectionProps) => {
  return (
    <Container>
      <ActivityTitle>{profile.name}님이 참여한 모임</ActivityTitle>
      {meetingList.length > 0 && (
        <>
          <ActivitySub>{meetingList.length}개의 모임에 참여</ActivitySub>
          <ActivityDisplay>
            {meetingList.map((meeting) => (
              <MemberMeetingCard
                key={meeting.id}
                {...meeting}
                {...(meeting.isMeetingLeader && { userName: profile.name })}
              />
            ))}
          </ActivityDisplay>
          <Target ref={ref} />
        </>
      )}
      {meetingList.length === 0 && (
        <>
          <ActivitySub>아직 참여한 모임이 없어요</ActivitySub>
          {String(meId) === memberId && (
            <ActivityUploadNudge>
              <Text typography='SUIT_14_M' style={{ textAlign: 'center', lineHeight: '24px' }}>
                모임을 참여하여 <br />
                SOPT 구성원들과의 추억을 쌓아보세요!
              </Text>
              <ActivityUploadButton href={playgroundLink.groupList()}>
                <Text typography='SUIT_15_SB'>모임 둘러보러 가기</Text>
              </ActivityUploadButton>
              <ActivityUploadMaskImg src='/icons/img/meeting-mask.png' alt='meeting-mask-image' height={134} />
            </ActivityUploadNudge>
          )}
        </>
      )}
    </Container>
  );
};

export default GroupSection;

const Container = styled.section`
  margin-top: 80px;
`;

const ActivityTitle = styled.div`
  line-height: 100%;
  font-size: 32px;
  font-weight: 700;
  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 22px;
  }
`;

const ActivitySub = styled.div`
  margin-top: 18px;
  line-height: 100%;
  color: #989ba0;
  font-size: 22px;
  font-weight: 500;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
    font-size: 14px;
  }
`;

const ActivityDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(10px, 1fr));
  row-gap: 20px;
  column-gap: 29px;
  margin-top: 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
  }
`;

const ActivityUploadNudge = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  border-radius: 30px;
  background-color: ${colors.gray800};
  height: 317px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 20px;
    height: 212px;
  }
`;

const ActivityUploadMaskImg = styled(ResizedImage)`
  position: absolute;
  max-height: 317px;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    top: 0;
    max-height: 134px;
  }
`;

const ActivityUploadButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-top: 24px;
  border-radius: 14px;
  background-color: ${colors.gray10};
  padding: 14px 48px;
  color: ${colors.gray800};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 50px;
    width: 100%;
  }
`;

const Target = styled.div`
  width: 100%;
`;
