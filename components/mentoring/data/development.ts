import { Mentor, Mentoring, MentoringData } from '@/components/mentoring/data/types';

const MENTOR_LIST = [
  { id: 1, name: '송정우' },
  { id: 4, name: '남주영' },
  { id: 7, name: '이화정' },
  { id: 8, name: '김은수' },
  { id: 9, name: '이준호' },
] as const;
// FIXME: satisfies 사용 위해 스토리북 7.0 업데이트 필요
// satisfies readonly Mentor[];

type MentorList = typeof MENTOR_LIST[number];

type MentoringByMentorId<Mentor extends MentorList> = {
  [M in Mentor as M['id']]: {
    mentorName: M['name'];
  } & Mentoring;
};

const MENTORING_BY_MENTOR_ID: MentoringByMentorId<MentorList> = {
  '1': {
    mentorName: '송정우',
    title: '정우와 함께하는 CGP Review',
    keywords: ['백엔드 커리어패스 상담', '개발 실력을 키우기 위한 방법'],
    introduce: '성장에 대한 고민, 커리어/이직에 대한 고민을 듣고 이에 대한 도움을 드릴 수 있을 거 같습니다.',
    howTo: `- 대면 혹은 비대면으로 진행됩니다. 대면으로 진행 시 강남, 선릉 방면에서 진행 예정입니다.
- 진행 시간은 약 1시간 정도를 생각하고 있으며, 주기적으로 진행할지는 멘티와 논의를 통해 결정할 생각입니다.
- 쪽지에 다음과 같은 내용을 적어주세요(자기소개, 멘토링 받고 싶은 내용, 답장 받을 연락처)
- 만약 신청 인원이 너무 많을 경우, 멘토링 받고 싶은 내용에 기반하여 인원을 선별할 수 있음을 사전에 안내드립니다.
- (가능하다면) 포폴 링크도 첨부 부탁드립니다.`,
    target: `- 어떻게 공부해야 더 성장할 수 있을지 고민하고 있는 학생 개발자
- 커리어에 대한 고민이 있는 주니어 개발자
- 주기적으로 상황을 공유하고 이에 대한 피드백을 받고 싶은 개발자`,
    nonTarget: `- 지속적으로 성장하고 싶은 욕구가 부족한 분에게는 권장하지 않습니다.
- 안타깝게도 간편하게 성장할 수 있는 방법은 제시하지 않습니다. 따라서 쉽게 취업하기 위한 방법으로 본 멘토링을 택하시는 것은 큰 도움이 되지 않을 수 있습니다.`,
    isOpened: true,
  },
  '4': {
    mentorName: '남주영',
    title: '주영과 함께하는 CGP Review',
    keywords: ['웹 프론트엔드 개발자의 커리어/개발 지식/업무 경험'],
    introduce: '성장에 대한 고민, 커리어/이직에 대한 고민을 듣고 이에 대한 도움을 드릴 수 있을 거 같습니다.',
    howTo: `- 대면 혹은 비대면으로 진행됩니다. 대면으로 진행 시 강남, 선릉 방면에서 진행 예정입니다.
- 진행 시간은 약 1시간 정도를 생각하고 있으며, 주기적으로 진행할지는 멘티와 논의를 통해 결정할 생각입니다.
- 쪽지에 다음과 같은 내용을 적어주세요(자기소개, 멘토링 받고 싶은 내용, 답장 받을 연락처)
- 만약 신청 인원이 너무 많을 경우, 멘토링 받고 싶은 내용에 기반하여 인원을 선별할 수 있음을 사전에 안내드립니다.
- (가능하다면) 포폴 링크도 첨부 부탁드립니다.`,
    target: `- 어떻게 공부해야 더 성장할 수 있을지 고민하고 있는 학생 개발자
- 커리어에 대한 고민이 있는 주니어 개발자
- 주기적으로 상황을 공유하고 이에 대한 피드백을 받고 싶은 개발자`,
    nonTarget: `- 지속적으로 성장하고 싶은 욕구가 부족한 분에게는 권장하지 않습니다.
- 안타깝게도 간편하게 성장할 수 있는 방법은 제시하지 않습니다. 따라서 쉽게 취업하기 위한 방법으로 본 멘토링을 택하시는 것은 큰 도움이 되지 않을 수 있습니다.`,
    isOpened: true,
  },
  '7': {
    mentorName: '이화정',
    title: '안드로이드 프레임워크 개발을 하고 있는 이화정 입니다 :)',
    keywords: ['백엔드 입문', '취업 준비'],
    introduce: '성장에 대한 고민, 커리어/이직에 대한 고민을 듣고 이에 대한 도움을 드릴 수 있을 거 같습니다.',
    howTo: `- 대면 혹은 비대면으로 진행됩니다. 대면으로 진행 시 강남, 선릉 방면에서 진행 예정입니다.
- 진행 시간은 약 1시간 정도를 생각하고 있으며, 주기적으로 진행할지는 멘티와 논의를 통해 결정할 생각입니다.
- 쪽지에 다음과 같은 내용을 적어주세요(자기소개, 멘토링 받고 싶은 내용, 답장 받을 연락처)
- 만약 신청 인원이 너무 많을 경우, 멘토링 받고 싶은 내용에 기반하여 인원을 선별할 수 있음을 사전에 안내드립니다.
- (가능하다면) 포폴 링크도 첨부 부탁드립니다.`,
    target: `- 어떻게 공부해야 더 성장할 수 있을지 고민하고 있는 학생 개발자
- 커리어에 대한 고민이 있는 주니어 개발자
- 주기적으로 상황을 공유하고 이에 대한 피드백을 받고 싶은 개발자`,
    nonTarget: `- 지속적으로 성장하고 싶은 욕구가 부족한 분에게는 권장하지 않습니다.
- 안타깝게도 간편하게 성장할 수 있는 방법은 제시하지 않습니다. 따라서 쉽게 취업하기 위한 방법으로 본 멘토링을 택하시는 것은 큰 도움이 되지 않을 수 있습니다.`,
    isOpened: true,
  },
  '8': {
    mentorName: '김은수',
    title: '은수와 함께하는 CGP Review',
    keywords: ['백엔드 커리어패스 상담', '개발 실력을 키우기 위한 방법'],
    introduce: '성장에 대한 고민, 커리어/이직에 대한 고민을 듣고 이에 대한 도움을 드릴 수 있을 거 같습니다.',
    howTo: `- 대면 혹은 비대면으로 진행됩니다. 대면으로 진행 시 강남, 선릉 방면에서 진행 예정입니다.
- 진행 시간은 약 1시간 정도를 생각하고 있으며, 주기적으로 진행할지는 멘티와 논의를 통해 결정할 생각입니다.
- 쪽지에 다음과 같은 내용을 적어주세요(자기소개, 멘토링 받고 싶은 내용, 답장 받을 연락처)
- 만약 신청 인원이 너무 많을 경우, 멘토링 받고 싶은 내용에 기반하여 인원을 선별할 수 있음을 사전에 안내드립니다.
- (가능하다면) 포폴 링크도 첨부 부탁드립니다.`,
    target: `- 어떻게 공부해야 더 성장할 수 있을지 고민하고 있는 학생 개발자
- 커리어에 대한 고민이 있는 주니어 개발자
- 주기적으로 상황을 공유하고 이에 대한 피드백을 받고 싶은 개발자`,
    nonTarget: `- 지속적으로 성장하고 싶은 욕구가 부족한 분에게는 권장하지 않습니다.
- 안타깝게도 간편하게 성장할 수 있는 방법은 제시하지 않습니다. 따라서 쉽게 취업하기 위한 방법으로 본 멘토링을 택하시는 것은 큰 도움이 되지 않을 수 있습니다.`,
    isOpened: false,
  },
  '9': {
    mentorName: '이준호',
    title: '준호와 함께하는 CGP Review',
    keywords: ['백엔드 커리어패스 상담', '개발 실력을 키우기 위한 방법'],
    introduce: '성장에 대한 고민, 커리어/이직에 대한 고민을 듣고 이에 대한 도움을 드릴 수 있을 거 같습니다.',
    howTo: `- 대면 혹은 비대면으로 진행됩니다. 대면으로 진행 시 강남, 선릉 방면에서 진행 예정입니다.
- 진행 시간은 약 1시간 정도를 생각하고 있으며, 주기적으로 진행할지는 멘티와 논의를 통해 결정할 생각입니다.
- 쪽지에 다음과 같은 내용을 적어주세요(자기소개, 멘토링 받고 싶은 내용, 답장 받을 연락처)
- 만약 신청 인원이 너무 많을 경우, 멘토링 받고 싶은 내용에 기반하여 인원을 선별할 수 있음을 사전에 안내드립니다.
- (가능하다면) 포폴 링크도 첨부 부탁드립니다.`,
    target: `- 어떻게 공부해야 더 성장할 수 있을지 고민하고 있는 학생 개발자
- 커리어에 대한 고민이 있는 주니어 개발자
- 주기적으로 상황을 공유하고 이에 대한 피드백을 받고 싶은 개발자`,
    nonTarget: `- 지속적으로 성장하고 싶은 욕구가 부족한 분에게는 권장하지 않습니다.
- 안타깝게도 간편하게 성장할 수 있는 방법은 제시하지 않습니다. 따라서 쉽게 취업하기 위한 방법으로 본 멘토링을 택하시는 것은 큰 도움이 되지 않을 수 있습니다.`,
    isOpened: true,
  },
};

export const MENTORING_DATA_FOR_DEVELOPMENT: MentoringData = {
  mentorList: MENTOR_LIST,
  mentoringByMentorId: MENTORING_BY_MENTOR_ID,
};
