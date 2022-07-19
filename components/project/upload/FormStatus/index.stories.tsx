import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FORM_ITEMS } from '@/components/project/upload/constants';
import UploadStatus from '@/components/project/upload/FormStatus';

export default {
  component: UploadStatus,
} as ComponentMeta<typeof UploadStatus>;

const Template: ComponentStory<typeof UploadStatus> = (args) => <UploadStatus {...args} />;

export const Default = Template.bind({});
Default.args = {
  formItems: FORM_ITEMS,
};
Default.storyName = '기본';
