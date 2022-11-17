import { DefaultValues } from 'react-hook-form';

import { MemberUploadForm } from '@/components/members/upload/types';

export const MEMBER_DEFAULT_VALUES: DefaultValues<MemberUploadForm> = {
  profileImage: '',
  name: '',
  birthday: { year: '', month: '', day: '' },
  phone: '',
  email: '',
  address: '',
  university: '',
  major: '',
  introduction: '',
  skill: '',
  links: [{ title: '', url: '' }],
  activities: [{ generation: '', part: '', team: '' }],
  openToWork: false,
  openToSideProject: false,
  allowOfficial: false,
};

export const PARTS = [
  '기획',
  '디자인',
  '서버',
  '안드로이드',
  '웹',
  'iOS',
  '회장',
  '부회장',
  '총무',
  '운영 팀장',
  '미디어 팀장',
  '기획 파트장',
  '디자인 파트장',
  '서버 파트장',
  '웹 파트장',
  '안드로이드 파트장',
  'iOS 파트장',
];

export const TEAMS = ['운영팀', '미디어팀', '해당 없음'];

export const LINK_TITLES = ['Facebook', 'Instagram', 'LinkedIn', 'GitHub', 'Behance'];

export const PHONE_REG_EXP = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
export const EMAIL_REG_EXP = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
