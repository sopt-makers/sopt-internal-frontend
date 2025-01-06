import dayjs from 'dayjs';

import { SOJU_CAPACITY_RANGE } from '@/components/members/upload/constants';
import { isMbti } from '@/components/members/upload/FormSection/Tmi/types';
import { Birthday } from '@/components/members/upload/types';

export const formatBirthday = (birthday: Birthday) => {
  const { year, month, day } = birthday;
  const parsedBirthDay = dayjs(`${year}-${month}-${day}`);
  return parsedBirthDay.isValid() ? parsedBirthDay.format('YYYY-MM-DD') : '';
};

export const getSojuCapacityApiValue = (sojuCapacity: (typeof SOJU_CAPACITY_RANGE)[number]['value']) => {
  switch (sojuCapacity) {
    case '못마셔요':
      return 0;
    case '0.5병':
      return 0.5;
    case '1병':
      return 1;
    case '1.5병':
      return 1.5;
    case '2병':
      return 2;
    case '2.5병':
      return 2.5;
    case '3병 이상':
      return 3;
  }
};

export const getSojuCapacityFromApiValue = (
  sojuCapacity: number,
): (typeof SOJU_CAPACITY_RANGE)[number]['value'] | undefined => {
  switch (sojuCapacity) {
    case 0:
      return '못마셔요';
    case 0.5:
      return '0.5병';
    case 1:
      return '1병';
    case 1.5:
      return '1.5병';
    case 2:
      return '2병';
    case 2.5:
      return '2.5병';
    case 3:
      return '3병 이상';
  }
};

export const getMbtiFromApiValue = (apiMbti: string | null) => {
  if (apiMbti === null) {
    return null;
  }
  const mbti = apiMbti.split('');
  return isMbti(mbti) ? mbti : null;
};
