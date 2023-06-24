import { Meta } from '@storybook/react';

import HeaderFooterLayout from '@/components/layout/HeaderFooterLayout';

export default {
  component: HeaderFooterLayout,
} as Meta<typeof HeaderFooterLayout>;

export const Default = {
  args: {
    children: <div style={{ backgroundColor: '#7d7d7d', textAlign: 'center', height: '200px' }}>Page Content</div>,
  },

  name: '기본',
};
