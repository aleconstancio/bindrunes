import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import BookingForm from "./BookingForm.svelte";

describe("BookingForm", () => {
	it("renders title", () => {
		render(BookingForm);
		expect(screen.getByText("Book Appointment")).toBeInTheDocument();
	});

	it("renders name input", () => {
		const { container } = render(BookingForm);
		expect(container.querySelector("input[placeholder='Your name']")).toBeInTheDocument();
	});

	it("renders email input", () => {
		const { container } = render(BookingForm);
		expect(container.querySelector("input[placeholder='your@email.com']")).toBeInTheDocument();
	});

	it("renders submit button", () => {
		render(BookingForm);
		expect(screen.getByRole("button", { name: /Confirm Booking/ })).toBeInTheDocument();
	});

	it("renders date and time", () => {
		render(BookingForm, { date: "2024-01-15", time: "10:00", service: "Consultation" });
		expect(screen.getByText(/Consultation/)).toBeInTheDocument();
		expect(screen.getByText(/2024-01-15/)).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(BookingForm, { class: "my-booking" });
		expect(container.firstElementChild?.className).toContain("my-booking");
	});
});
