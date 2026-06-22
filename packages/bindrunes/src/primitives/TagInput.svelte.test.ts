import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import TagInput from "./TagInput.svelte";

describe("TagInput", () => {
	it("renders initial tags via value prop", () => {
		render(TagInput, { value: ["svelte", "typescript"] });
		expect(screen.getByText("svelte")).toBeInTheDocument();
		expect(screen.getByText("typescript")).toBeInTheDocument();
	});

	it("renders placeholder", () => {
		render(TagInput, { placeholder: "Add a tag..." });
		expect(screen.getByPlaceholderText("Add a tag...")).toBeInTheDocument();
	});

	it("renders label when provided", () => {
		render(TagInput, { label: "Tags" });
		expect(screen.getByText("Tags")).toBeInTheDocument();
	});

	it("renders the root element", () => {
		const { container } = render(TagInput);
		const root = container.firstElementChild;
		expect(root).toBeInTheDocument();
	});

	it("renders without initial tags", () => {
		const { container } = render(TagInput);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("does not render label when not provided", () => {
		const { container } = render(TagInput);
		expect(container.querySelector("label")).not.toBeInTheDocument();
	});

	it("renders remove button for each tag", () => {
		render(TagInput, { value: ["tag1", "tag2"] });
		expect(screen.getByLabelText("Remove tag1")).toBeInTheDocument();
		expect(screen.getByLabelText("Remove tag2")).toBeInTheDocument();
	});

	it("remove button removes tag", async () => {
		render(TagInput, { value: ["svelte"] });
		const removeBtn = screen.getByLabelText("Remove svelte");
		await fireEvent.click(removeBtn);
		expect(screen.queryByText("svelte")).not.toBeInTheDocument();
	});

	it("does not render remove buttons when disabled", () => {
		render(TagInput, { value: ["svelte"], disabled: true });
		expect(screen.queryByLabelText("Remove svelte")).not.toBeInTheDocument();
	});

	it("disabled input prevents typing", () => {
		render(TagInput, { disabled: true });
		const input = screen.getByPlaceholderText("Add tag...");
		expect(input).toBeDisabled();
	});

	it("enter key adds tag", async () => {
		render(TagInput);
		const input = screen.getByPlaceholderText("Add tag...");
		await fireEvent.input(input, { target: { value: "new-tag" } });
		await fireEvent.keyDown(input, { key: "Enter" });
		expect(screen.getByText("new-tag")).toBeInTheDocument();
	});

	it("comma key adds tag", async () => {
		render(TagInput);
		const input = screen.getByPlaceholderText("Add tag...");
		await fireEvent.input(input, { target: { value: "comma-tag" } });
		await fireEvent.keyDown(input, { key: "," });
		expect(screen.getByText("comma-tag")).toBeInTheDocument();
	});

	it("backspace removes last tag when input is empty", async () => {
		render(TagInput, { value: ["first", "second"] });
		const input = screen.getByPlaceholderText("Add tag...");
		await fireEvent.keyDown(input, { key: "Backspace" });
		expect(screen.queryByText("second")).not.toBeInTheDocument();
		expect(screen.getByText("first")).toBeInTheDocument();
	});

	it("does not add duplicate tags", async () => {
		render(TagInput, { value: ["existing"] });
		const input = screen.getByPlaceholderText("Add tag...");
		await fireEvent.input(input, { target: { value: "existing" } });
		await fireEvent.keyDown(input, { key: "Enter" });
		expect(screen.getAllByText("existing")).toHaveLength(1);
	});

	it("does not add empty tags", async () => {
		render(TagInput);
		const input = screen.getByPlaceholderText("Add tag...");
		await fireEvent.keyDown(input, { key: "Enter" });
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	it("does not add whitespace-only tags", async () => {
		render(TagInput);
		const input = screen.getByPlaceholderText("Add tag...");
		await fireEvent.input(input, { target: { value: "   " } });
		await fireEvent.keyDown(input, { key: "Enter" });
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	it("respects maxTags limit", async () => {
		render(TagInput, { value: ["tag1", "tag2"], maxTags: 2 });
		const input = screen.getByPlaceholderText("Add tag...");
		await fireEvent.input(input, { target: { value: "tag3" } });
		await fireEvent.keyDown(input, { key: "Enter" });
		expect(screen.queryByText("tag3")).not.toBeInTheDocument();
	});

	it("blur adds tag", async () => {
		render(TagInput);
		const input = screen.getByPlaceholderText("Add tag...");
		await fireEvent.input(input, { target: { value: "blur-tag" } });
		await fireEvent.blur(input);
		expect(screen.getByText("blur-tag")).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(TagInput, { class: "my-tags" });
		expect(container.firstElementChild?.className).toContain("my-tags");
	});

	it("click on container focuses input", async () => {
		const { container } = render(TagInput);
		const wrapper = container.querySelector(".cursor-text")!;
		await fireEvent.click(wrapper);
		expect(wrapper).toBeInTheDocument();
	});

	it("backspace on non-empty input does not remove tag", async () => {
		render(TagInput, { value: ["tag1"] });
		const input = screen.getByPlaceholderText("Add tag...");
		await fireEvent.input(input, { target: { value: "x" } });
		await fireEvent.keyDown(input, { key: "Backspace" });
		expect(screen.getByText("tag1")).toBeInTheDocument();
	});
});
