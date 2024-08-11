import { Meta, StoryObj } from "@storybook/react";
import { UserForm } from "./UserForm";

const meta = {
  component: UserForm,
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
