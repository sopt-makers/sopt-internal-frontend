import { Career } from '@/components/members/upload/types';
import { Category, ServiceType } from '@/components/projects/upload/types';

export type Profile = {
  id: number;
  name: string;
  profileImage: string;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  university: string;
  major: string;
  introduction: string;
  skill: string;
  activities: {
    generation: number;
    id: number;
    part: string;
    team: string;
  }[];
  links: Link[];
  openToWork: boolean;
  openToSideProject: boolean;
  allowOfficial: boolean;
  careers: Career[];
};

export type PagedMemberProfile = {
  members: Profile[];
  hasNext: boolean;
};

export type ProfileDetail = {
  name: string;
  isMine: boolean;
  profileImage: string;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  university: string;
  major: string;
  introduction: string;
  skill: string;
  activities: {
    cardinalActivities: Activity[];
    cardinalInfo: string;
  }[];
  links: Link[];
  openToWork: boolean;
  openToSideProject: boolean;
  allowOfficial: boolean;
  projects: MemberProject[];
  careers: Career[];
};

export type Activity = {
  id: number;
  generation: number;
  isProject: boolean;
  team: string;
};

type Link = {
  id: number;
  title: string;
  url: string;
};

export type Member = {
  id: number;
  name: string;
  generation: number;
  hasProfile: true;
  profileImage?: string | null;
};

export type MemberProject = {
  category: Category;
  generation: number;
  id: number;
  serviceType: ServiceType[];
  logoImage: string;
  name: string;
  summary: string;
  thumbnailImage: string;
};

export type ProfileRequest = {
  name: string;
  profileImage: string | null;
  birthday: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  university: string | null;
  major: string | null;
  introduction: string | null;
  skill: string | null;
  activities: {
    generation: string;
    part: string;
    team: string;
  }[];
  links: Omit<Link, 'id'>[] | null;
  openToWork: boolean;
  openToSideProject: boolean;
  allowOfficial: boolean;
  careers: Career[];
};

export interface PostMemberCoffeeChatVariables {
  receiverId: string;
  senderEmail: string;
  category: string;
  content: string;
}
