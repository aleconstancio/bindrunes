import { createMetaContext, useMetaContext } from "../../utils/createMetaContext.svelte";
import { browser } from "./sidebar-constants";

export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export type SidebarState = ReturnType<typeof createSidebarState>;

const KEY = Symbol("bindrunes-sidebar");

export function useSidebar(): SidebarState {
	return useMetaContext<SidebarState>(KEY);
}

export function createSidebarState(initialOpen = true) {
	let open = $state<boolean>(initialOpen);
	let openMobile = $state<boolean>(false);
	let isMobile = $state<boolean>(false);

	let state = $derived(open ? ("expanded" as const) : ("collapsed" as const));

	$effect(() => {
		if (browser) {
			document.documentElement.style.setProperty("--sidebar-width", open ? "16rem" : "3rem");
		}
	});

	$effect(() => {
		if (browser) {
			function handleKeydown(e: KeyboardEvent) {
				if ((e.metaKey || e.ctrlKey) && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
					e.preventDefault();
					open = !open;
				}
			}
			window.addEventListener("keydown", handleKeydown);
			return () => window.removeEventListener("keydown", handleKeydown);
		}
	});

	function toggle() {
		open = !open;
	}
	function toggleMobile() {
		openMobile = !openMobile;
	}

	const state$ = {
		get open() {
			return open;
		},
		get openMobile() {
			return openMobile;
		},
		get isMobile() {
			return isMobile;
		},
		get state() {
			return state;
		},
		setOpen(v: boolean) {
			open = v;
		},
		setOpenMobile(v: boolean) {
			openMobile = v;
		},
		setIsMobile(v: boolean) {
			isMobile = v;
		},
		toggle,
		toggleMobile,
	};

	return createMetaContext(KEY, () => state$);
}
