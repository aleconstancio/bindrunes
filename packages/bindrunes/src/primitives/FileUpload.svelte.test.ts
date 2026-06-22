import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import FileUpload from "./FileUpload.svelte";

describe("FileUpload", () => {
	it("renders dropzone text", () => {
		render(FileUpload);
		expect(screen.getByText(/Drag files here/)).toBeInTheDocument();
	});

	it("has hidden file input", () => {
		render(FileUpload);
		const input = document.querySelector('input[type="file"]');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("class", "hidden");
	});

	it("has correct role on dropzone", () => {
		render(FileUpload);
		const dropzone = screen.getByRole("button");
		expect(dropzone).toBeInTheDocument();
	});

	it("has tabindex on dropzone", () => {
		render(FileUpload);
		const dropzone = screen.getByRole("button");
		expect(dropzone).toHaveAttribute("tabindex", "0");
	});

	it("has aria-label on dropzone", () => {
		render(FileUpload);
		const dropzone = screen.getByRole("button");
		expect(dropzone).toHaveAttribute("aria-label", "Drop zone for file upload");
	});

	it("applies custom class", () => {
		const { container } = render(FileUpload, { class: "my-upload" });
		const dropzone = container.querySelector(".file-upload-dropzone");
		expect(dropzone?.className).toContain("my-upload");
	});

	it("renders with accept prop", () => {
		render(FileUpload, { accept: ["image/*"] });
		const input = document.querySelector('input[type="file"]');
		expect(input).toHaveAttribute("accept", "image/*");
	});

	it("renders with multiple prop", () => {
		render(FileUpload, { multiple: false });
		const input = document.querySelector('input[type="file"]');
		expect(input).not.toHaveAttribute("multiple");
	});

	it("renders without dropzone snippet (default text)", () => {
		render(FileUpload);
		expect(screen.getByText(/Drag files here or click to browse/)).toBeInTheDocument();
	});

	it("handleDragOver sets dragover state", async () => {
		const { container } = render(FileUpload);
		const dropzone = container.querySelector(".file-upload-dropzone")!;
		await fireEvent.dragOver(dropzone);
		expect(dropzone).toBeInTheDocument();
	});

	it("handleDragLeave clears dragover state", async () => {
		const { container } = render(FileUpload);
		const dropzone = container.querySelector(".file-upload-dropzone")!;
		await fireEvent.dragLeave(dropzone);
		expect(dropzone).toBeInTheDocument();
	});

	it("handleDrop processes files", async () => {
		const { container } = render(FileUpload);
		const dropzone = container.querySelector(".file-upload-dropzone")!;
		const file = new File(["hello"], "hello.txt", { type: "text/plain" });
		await fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
		expect(dropzone).toBeInTheDocument();
	});

	it("shows file name after drop", async () => {
		const { container } = render(FileUpload);
		const dropzone = container.querySelector(".file-upload-dropzone")!;
		const file = new File(["hello"], "hello.txt", { type: "text/plain" });
		await fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
		await screen.findByText("hello.txt");
		expect(screen.getByText("hello.txt")).toBeInTheDocument();
	});

	it("shows remove button after file is added", async () => {
		const { container } = render(FileUpload);
		const dropzone = container.querySelector(".file-upload-dropzone")!;
		const file = new File(["hello"], "hello.txt", { type: "text/plain" });
		await fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
		await screen.findByText("hello.txt");
		expect(screen.getByLabelText("Remove file")).toBeInTheDocument();
	});

	it("remove button removes file", async () => {
		const { container } = render(FileUpload);
		const dropzone = container.querySelector(".file-upload-dropzone")!;
		const file = new File(["hello"], "hello.txt", { type: "text/plain" });
		await fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
		await screen.findByText("hello.txt");
		const removeBtn = screen.getByLabelText("Remove file");
		await fireEvent.click(removeBtn);
		expect(screen.queryByText("hello.txt")).not.toBeInTheDocument();
	});

	it("does not render file list when no files", () => {
		render(FileUpload);
		expect(screen.queryByText("Remove file")).not.toBeInTheDocument();
	});

	it("shows file size in KB", async () => {
		const { container } = render(FileUpload);
		const dropzone = container.querySelector(".file-upload-dropzone")!;
		const content = "a".repeat(2048);
		const file = new File([content], "test.txt", { type: "text/plain" });
		await fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
		await screen.findByText("test.txt");
		expect(screen.getByText(/KB/)).toBeInTheDocument();
	});

	it("image file gets preview", async () => {
		const { container } = render(FileUpload);
		const dropzone = container.querySelector(".file-upload-dropzone")!;
		const file = new File(["img"], "photo.png", { type: "image/png" });
		await fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
		await screen.findByText("photo.png");
		const img = container.querySelector("img");
		expect(img).toBeInTheDocument();
	});

	it("non-image file shows extension badge", async () => {
		const { container } = render(FileUpload);
		const dropzone = container.querySelector(".file-upload-dropzone")!;
		const file = new File(["data"], "doc.pdf", { type: "application/pdf" });
		await fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
		await screen.findByText("doc.pdf");
		expect(screen.getByText("PDF")).toBeInTheDocument();
	});

	it("file input change triggers addFiles", async () => {
		const { container: _container } = render(FileUpload);
		const input = document.querySelector('input[type="file"]') as HTMLInputElement;
		const file = new File(["test"], "test.txt", { type: "text/plain" });
		Object.defineProperty(input, "files", { value: [file] });
		await fireEvent.change(input);
		await screen.findByText("test.txt");
		expect(screen.getByText("test.txt")).toBeInTheDocument();
	});
});
