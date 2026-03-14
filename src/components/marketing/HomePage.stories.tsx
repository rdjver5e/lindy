import type { Meta, StoryObj } from '@storybook/react';
import HomePage from './HomePage';

const meta = {
  title: 'Marketing/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
