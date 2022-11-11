import { Category, ServiceType } from '@/components/projects/upload/types';

export type Project = {
  id: number;
  name: string;
  writerId: number;
  generation: number;
  category: Category;
  startAt: string;
  endAt?: string;
  serviceType: ServiceType[];
  isAvailable: boolean;
  isFounding: boolean;
  summary: string;
  detail: string;
  logoImage: string;
  thumbnailImage: string;
  images: string[];
  members: ProjectMember[];
  links: ProjectLink[];
};

type ProjectInputOmitType = 'id' | 'links' | 'generation' | 'members';
export type ProjectInput = Omit<Project, ProjectInputOmitType> & {
  links: Omit<ProjectLink, 'linkId'>[];
  generation?: number;
  members: Omit<ProjectMember, 'memberName' | 'memberGeneration'>[];
};

export enum MemberRole {
  MAINPM = 'MAINPM',
  PM = 'PM',
  DESIGN = 'DESIGN',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  WEB = 'WEB',
  SERVER = 'SERVER',
}

export type ProjectMember = {
  memberId: number;
  memberRole: MemberRole;
  memberDescription: string;
  isTeamMember: boolean;
  memberName: string;
  memberGeneration: number;
};

export const LINK_TITLES = ['website', 'googlePlay', 'appStore', 'github', 'instagram', 'media'] as const;
export type LinkTitle = typeof LINK_TITLES[number];

export type ProjectLink = {
  linkId: number;
  linkTitle: LinkTitle | string;
  linkUrl: string;
};
