import type { Meta, StoryObj } from '@storybook/react';
import AuthGate from './AuthGate';

const meta = {
  title: 'Onboarding/AuthGate',
  component: AuthGate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof AuthGate>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Desktop View
export const Default: Story = {};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
