import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { graphql, rest } from 'msw';
import MemberSearch from './MemberSearch';

export default {
  component: MemberSearch,
  decorators: [
    (Story) => (
      <StyledContainer>
        <Story />
      </StyledContainer>
    ),
  ],
} as ComponentMeta<typeof MemberSearch>;

const Template: ComponentStory<typeof MemberSearch> = (args) => <MemberSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  members: [
    { generation: 27, name: '이준호', userId: '960921' },
    { generation: 27, name: '이준호', userId: '960921' },
    { generation: 27, name: '이준호', userId: '960921' },
  ],
};
Default.storyName = '기본';

const StyledContainer = styled.div`
  width: 163px;
`;
