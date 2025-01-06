import { Meta, StoryFn } from '@storybook/react';

import MemberSelectOptions from '@/components/members/upload/forms/SelectOptions';

import EditableSelect from './EditableSelect';

export default {
  component: EditableSelect,
} as Meta<typeof EditableSelect>;

const Template: StoryFn<typeof EditableSelect> = (args) => (
  <EditableSelect {...args}>
    <MemberSelectOptions options={['option1', 'option2', 'option3']} />
  </EditableSelect>
);

export const Default = {
  render: Template,

  args: {
    placeholder: '입력하기',
  },

  name: '기본',
};
