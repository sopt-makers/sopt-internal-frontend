import { SOJU_CAPACITY_RANGE } from '@/components/members/upload/constants';
import { FavorPeach, FavorTteokbokki, Mbti } from '@/components/members/upload/FormSection/Tmi/types';

import { FavorAlcohol, FavorFishBread, FavorMintChocolate, FavorSweetAndSourPork } from './FormSection/Tmi/types';

export interface MemberUploadForm {
  profileImage: string;
  name: string;
  birthday: Birthday;
  phone: string;
  email: string;
  address: string;
  university: string;
  major: string;
  introduction: string;
  skill: string;
  links: Link[];
  activities: SoptActivity[];
  allowOfficial: boolean;
  careers: Career[];
  mbti: Mbti | null;
  mbtiDescription: string;
  favor: {
    sweetAndSourPork: FavorSweetAndSourPork | null;
    mintChocolate: FavorMintChocolate | null;
    alcohol: FavorAlcohol | null;
    peach: FavorPeach | null;
    fishBread: FavorFishBread | null;
    tteokbokki: FavorTteokbokki | null;
  };
  sojuCapacity: (typeof SOJU_CAPACITY_RANGE)[number]['value'];
  interest: string;
  longIntroduction: string;
  isPhoneBlind: boolean;
  coffeeChatBio: string;
}

export interface SoptActivity {
  generation: string;
  part: string;
  team: string | null;
}

export interface Link {
  title: string;
  url: string;
}

export interface Birthday {
  year: string;
  month: string;
  day: string;
}

export type Career =
  | {
      companyName: string;
      title: string;
      startDate: string;
      endDate: null;
      isCurrent: true;
    }
  | {
      companyName: string;
      title: string;
      startDate: string;
      endDate: string;
      isCurrent: false;
    };
