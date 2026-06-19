import { render, screen, waitFor } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import MountSvelte from "../helpers/mount.svelte";
import { useInfiniteScroll } from "./useInfiniteScroll.svelte";

function mountVoidComposable(composable: () => void) {
	render(MountSvelte, {
		props: { composable, onResult: () => {} },
	});
}

describe("useInfiniteScroll", () => {
	it("does nothing if sentinel is null", () => {
		const onLoadMore = vi.fn();
		useInfiniteScroll(null, { onLoadMore });
		expect(onLoadMore).not.toHaveBeenCalled();
	});

	it("creates intersection observer for valid sentinel", async () => {
		const onLoadMore = vi.fn();
		const sentinel = document.createElement("div");

		const observeSpy = vi.fn();
		const disconnectSpy = vi.fn();

		vi.stubGlobal(
			"IntersectionObserver",
			class {
				constructor() {}
				observe = observeSpy;
				unobserve = vi.fn();
				disconnect = disconnectSpy;
			},
		);

		mountVoidComposable(() => useInfiniteScroll(sentinel, { onLoadMore }));

		await waitFor(() => {
			expect(observeSpy).toHaveBeenCalledWith(sentinel);
		});

		expect(onLoadMore).not.toHaveBeenCalled();

		vi.unstubAllGlobals();
	});
});
