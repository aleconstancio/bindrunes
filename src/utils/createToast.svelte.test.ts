import { toast as sonnerToast } from "svelte-sonner";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createToast } from "./createToast.svelte";

vi.mock("svelte-sonner", () => ({
	toast: {
		success: vi.fn().mockReturnValue("success-id"),
		error: vi.fn().mockReturnValue("error-id"),
		warning: vi.fn().mockReturnValue("warning-id"),
		info: vi.fn().mockReturnValue("info-id"),
		dismiss: vi.fn(),
	},
}));

describe("createToast", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("exposes success, error, warning, info, dismiss", () => {
		const t = createToast();
		expect(typeof t.success).toBe("function");
		expect(typeof t.error).toBe("function");
		expect(typeof t.warning).toBe("function");
		expect(typeof t.info).toBe("function");
		expect(typeof t.dismiss).toBe("function");
	});

	it("success calls sonner with default duration and position", async () => {
		const t = createToast();
		await t.success("hi");
		expect(sonnerToast.success).toHaveBeenCalledWith("hi", {
			duration: 4000,
			position: "bottom-right",
		});
	});

	it("error calls sonner with 5000ms default duration", async () => {
		const t = createToast();
		await t.error("oops");
		expect(sonnerToast.error).toHaveBeenCalledWith("oops", {
			duration: 5000,
			position: "bottom-right",
		});
	});

	it("warning and info use default 4000ms duration", async () => {
		const t = createToast();
		await t.warning("warn");
		expect(sonnerToast.warning).toHaveBeenCalledWith("warn", {
			duration: 4000,
			position: "bottom-right",
		});
		await t.info("info");
		expect(sonnerToast.info).toHaveBeenCalledWith("info", {
			duration: 4000,
			position: "bottom-right",
		});
	});

	it("passes custom duration from options", async () => {
		const t = createToast();
		await t.success("hi", { duration: 1000 });
		expect(sonnerToast.success).toHaveBeenCalledWith("hi", {
			duration: 1000,
			position: "bottom-right",
		});
	});

	it("uses defaultDuration from constructor", async () => {
		const t = createToast({ defaultDuration: 2000 });
		await t.success("hi");
		expect(sonnerToast.success).toHaveBeenCalledWith("hi", {
			duration: 2000,
			position: "bottom-right",
		});
	});

	it("uses position from constructor", async () => {
		const t = createToast({ position: "top-right" });
		await t.success("hi");
		expect(sonnerToast.success).toHaveBeenCalledWith("hi", {
			duration: 4000,
			position: "top-right",
		});
	});

	it("forwards action and description options", async () => {
		const t = createToast();
		const onClick = vi.fn();
		await t.success("hi", { description: "desc", action: { label: "go", onClick } });
		expect(sonnerToast.success).toHaveBeenCalledWith("hi", {
			duration: 4000,
			position: "bottom-right",
			description: "desc",
			action: { label: "go", onClick },
		});
	});

	it("dismiss forwards id to sonner", async () => {
		const t = createToast();
		await t.dismiss("abc");
		expect(sonnerToast.dismiss).toHaveBeenCalledWith("abc");
	});

	it("dismiss without id", async () => {
		const t = createToast();
		await t.dismiss();
		expect(sonnerToast.dismiss).toHaveBeenCalledWith(undefined);
	});
});
