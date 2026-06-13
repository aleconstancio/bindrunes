import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PasswordInput from "./PasswordInput.svelte";

describe("PasswordInput", () => {
	it("renders password input by default", () => {
		render(PasswordInput);
		const input = document.querySelector('input[type="password"]');
		expect(input).toBeInTheDocument();
	});

	it("toggles visibility on button click", async () => {
		render(PasswordInput);
		const toggleBtn = screen.getByRole("button", { name: /show password/i });
		await userEvent.click(toggleBtn);
		const input = document.querySelector('input[type="text"]');
		expect(input).toBeInTheDocument();
	});

	it("toggles back to hidden", async () => {
		render(PasswordInput);
		const toggleBtn = screen.getByRole("button", { name: /show password/i });
		await userEvent.click(toggleBtn);
		const hideBtn = screen.getByRole("button", { name: /hide password/i });
		await userEvent.click(hideBtn);
		const input = document.querySelector('input[type="password"]');
		expect(input).toBeInTheDocument();
	});

	it("renders label when provided", () => {
		render(PasswordInput, { label: "Your Password" });
		expect(screen.getByText("Your Password")).toBeInTheDocument();
	});

	it("renders placeholder", () => {
		render(PasswordInput, { placeholder: "Enter password" });
		expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
	});
});
