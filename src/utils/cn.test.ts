import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
	it("joins multiple classes", () => {
		expect(cn("foo", "bar", "baz")).toBe("foo bar baz");
	});

	it("filters falsy values", () => {
		expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
	});

	it("handles empty input", () => {
		expect(cn()).toBe("");
	});

	it("handles single class", () => {
		expect(cn("p-4")).toBe("p-4");
	});

	describe("conflict resolution — last wins", () => {
		it("resolves padding conflicts (p-1 vs p-2)", () => {
			expect(cn("p-1", "p-2")).toBe("p-2");
		});

		it("resolves px conflicts", () => {
			expect(cn("px-2", "px-4")).toBe("px-4");
		});

		it("resolves mx-auto vs mx-0", () => {
			expect(cn("mx-auto", "mx-0")).toBe("mx-0");
		});

		it("resolves gap conflicts", () => {
			expect(cn("gap-2", "gap-4")).toBe("gap-4");
		});

		it("resolves gap-x conflicts", () => {
			expect(cn("gap-x-2", "gap-x-4")).toBe("gap-x-4");
		});

		it("resolves width conflicts", () => {
			expect(cn("w-full", "w-auto")).toBe("w-auto");
		});

		it("resolves height conflicts", () => {
			expect(cn("h-4", "h-8")).toBe("h-8");
		});

		it("resolves min-width conflicts", () => {
			expect(cn("min-w-0", "min-w-full")).toBe("min-w-full");
		});

		it("resolves max-width conflicts", () => {
			expect(cn("max-w-sm", "max-w-lg")).toBe("max-w-lg");
		});

		it("resolves z-index conflicts", () => {
			expect(cn("z-0", "z-10")).toBe("z-10");
		});

		it("resolves top/right/bottom/left conflicts", () => {
			expect(cn("top-0", "top-4")).toBe("top-4");
			expect(cn("left-0", "left-auto")).toBe("left-auto");
		});

		it("resolves inset conflicts", () => {
			expect(cn("inset-0", "inset-4")).toBe("inset-4");
		});

		it("resolves text color conflicts", () => {
			expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
		});

		it("resolves bg conflicts", () => {
			expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
		});

		it("resolves border color conflicts", () => {
			expect(cn("border-red-500", "border-blue-500")).toBe("border-blue-500");
		});

		it("resolves rounded conflicts", () => {
			expect(cn("rounded-sm", "rounded-full")).toBe("rounded-full");
		});

		it("resolves opacity conflicts", () => {
			expect(cn("opacity-0", "opacity-100")).toBe("opacity-100");
		});

		it("resolves transition conflicts", () => {
			expect(cn("transition-none", "transition-all")).toBe("transition-all");
		});

		it("resolves duration conflicts", () => {
			expect(cn("duration-150", "duration-300")).toBe("duration-300");
		});

		it("resolves flex conflicts", () => {
			expect(cn("flex-1", "flex-none")).toBe("flex-none");
		});

		it("resolves overflow conflicts", () => {
			expect(cn("overflow-hidden", "overflow-auto")).toBe("overflow-auto");
		});

		it("resolves cursor conflicts", () => {
			expect(cn("cursor-pointer", "cursor-not-allowed")).toBe("cursor-not-allowed");
		});

		it("resolves shadow conflicts", () => {
			expect(cn("shadow-sm", "shadow-lg")).toBe("shadow-lg");
		});
	});

	describe("non-conflicting classes are preserved", () => {
		it("keeps p-1 and m-2 (different prefixes)", () => {
			expect(cn("p-1", "m-2")).toBe("p-1 m-2");
		});

		it("keeps text-red-500 and bg-blue-500 (different prefixes)", () => {
			expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
		});

		it("keeps font-bold and text-lg (different prefixes)", () => {
			expect(cn("font-bold", "text-lg")).toBe("font-bold text-lg");
		});

		it("preserves order of non-conflicting classes", () => {
			expect(cn("flex", "items-center", "p-4", "bg-white")).toBe("flex items-center p-4 bg-white");
		});
	});

	describe("complex scenarios", () => {
		it("resolves conflicts while keeping non-conflicting classes", () => {
			expect(cn("p-1", "m-2", "p-4", "bg-white")).toBe("p-4 m-2 bg-white");
		});

		it("handles many classes with mixed conflicts", () => {
			const result = cn(
				"flex",
				"items-center",
				"p-2",
				"p-4",
				"text-red-500",
				"text-blue-500",
				"bg-white",
				"rounded-sm",
				"rounded-full",
			);
			expect(result).toBe("flex items-center p-4 text-blue-500 bg-white rounded-full");
		});

		it("handles empty strings in input", () => {
			expect(cn("", "p-4", "", "m-2")).toBe("p-4 m-2");
		});

		it("handles whitespace-only strings", () => {
			expect(cn("  ", "p-4", "  ")).toBe("p-4");
		});
	});
});
