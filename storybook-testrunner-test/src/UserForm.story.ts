import { Meta, StoryObj } from "@storybook/react";
import { UserForm } from "./UserForm";
import { userEvent } from "@storybook/testing-library";

const meta = {
  component: UserForm,
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// nameの入力
export const InputName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const submitButton = canvas.getByRole("button");

    await userEvent.click(submitButton);
  },
};

export const Default: Story = {};
