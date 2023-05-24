import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactNode } from 'react';

import Carousel from '@/components/common/Carousel';
import MentoringCard from '@/components/mentoring/MentoringCard';

export default {
  components: Carousel,
  decorators: [
    (Story) => (
      <div style={{ width: '1440px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '1302px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />;

const MENTORING_DUMMY_DATA = [
  {
    mentor: { name: '남주영', career: '나사' },
    keywords: ['별자리 찾기', '우주의 탄생 과정에 대해 알아보기'],
    title: '정우와 함께하는 CGP Review',
  },
  {
    mentor: { name: '송정우', career: 'AWS' },
    keywords: ['코드 리뷰', '아무거나 물어보세용', '취업 준비 과정에서 우선 순위 정하기'],
    title: '하둘셋넷다여일여아열하둘셋넷다여일여아열하둘셋넷다여일여아열',
  },
  {
    mentor: { name: '박건영', career: '어둠의 커비단' },
    keywords: ['코드 리뷰', '취업 준비 과정에서 우선 순위 정하기', '노동요추천-에스파스파이씨'],
    title: '개발 천재 되는 법',
  },
  {
    mentor: { name: '이정연', career: '당근마켓' },
    keywords: ['개자이피엠'],
    title: '개발 천재 되는 법',
  },
  {
    mentor: { name: '이준호', career: '고수수현' },
    keywords: ['고수수현', '중수수현', '하수수현'],
    title: '개발 천재 되는 법',
  },
];

const CardContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

export const Basic = Template.bind({});
Basic.args = {
  itemList: MENTORING_DUMMY_DATA.map((dummy, index) => <MentoringCard {...dummy} key={index} />),
  limit: 3,
  renderItemContainer: (children: ReactNode) => <CardContainer>{children}</CardContainer>,
};
