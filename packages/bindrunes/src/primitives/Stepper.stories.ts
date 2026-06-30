import type { Meta, StoryObj } from "@storybook/svelte";
import Stepper from "./Stepper.svelte";

const meta = {
	title: "Primitives/Stepper",
	component: Stepper,
	tags: ["autodocs"],
	argTypes: {
		currentStep: { control: "text" },
	},
	args: {
		steps: [
			{ id: "step-1", label: "Account" },
			{ id: "step-2", label: "Profile" },
			{ id: "step-3", label: "Confirm" },
		],
		currentStep: "step-1",
		completedSteps: new Set(),
	},
} satisfies Meta<Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Step2: Story = {
	args: {
		currentStep: "step-2",
		completedSteps: new Set(["step-1"]),
	},
};

export const Step3: Story = {
	args: {
		currentStep: "step-3",
		completedSteps: new Set(["step-1", "step-2"]),
	},
};

export const AllCompleted: Story = {
	args: {
		currentStep: "",
		completedSteps: new Set(["step-1", "step-2", "step-3"]),
	},
};
