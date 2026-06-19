import { render, screen, waitFor } from "@testing-library/svelte";
import MountSvelte from "./mount.svelte";

/**
 * Mount a composable function inside a Svelte component context.
 * Returns the composable result after the component has mounted.
 */
export async function mountComposable<T>(composable: () => T): Promise<T> {
	let result: T | undefined;

	render(MountSvelte, {
		props: {
			composable,
			onResult: (r: T) => {
				result = r;
			},
		},
	});

	await waitFor(() => {
		expect(screen.getAllByTestId("ready").length).toBeGreaterThanOrEqual(1);
	});

	return result as T;
}
