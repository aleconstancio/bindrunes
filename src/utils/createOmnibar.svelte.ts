export interface OmnibarOption {
	id: string;
	label: string;
	description?: string;
	category?: string;
	action: () => void;
}

export interface CreateOmnibarOptions {
	options?: OmnibarOption[];
	fetchResults?: (query: string) => Promise<OmnibarOption[]>;
	shortcutKey?: string;
	shortcutCtrl?: boolean;
	onSelect?: (option: OmnibarOption) => void;
}

export interface OmnibarState {
	readonly isOpen: boolean;
	readonly searchQuery: string;
	readonly selectedIndex: number;
	readonly filteredOptions: OmnibarOption[];
	readonly isLoading: boolean;
	open(): void;
	close(): void;
	toggle(): void;
	setOptions(options: OmnibarOption[]): void;
	setQuery(query: string): Promise<void>;
	selectNext(): void;
	selectPrev(): void;
	executeSelected(): void;
}

export function createOmnibar(opts: CreateOmnibarOptions = {}): OmnibarState {
	let isOpen = $state(false);
	let searchQuery = $state("");
	let selectedIndex = $state(0);
	let options = $state<OmnibarOption[]>(opts.options ?? []);
	let isLoading = $state(false);

	let filteredOptions = $derived.by(() => {
		if (!searchQuery) return options;
		const q = searchQuery.toLowerCase();
		return options.filter(
			(o) =>
				o.label.toLowerCase().includes(q) ||
				o.description?.toLowerCase().includes(q) ||
				o.category?.toLowerCase().includes(q),
		);
	});

	function setOptions(newOptions: OmnibarOption[]) {
		options = newOptions;
	}

	async function setQuery(query: string) {
		searchQuery = query;
		selectedIndex = 0;
		if (opts.fetchResults && query) {
			isLoading = true;
			try {
				const results = await opts.fetchResults(query);
				options = results;
			} finally {
				isLoading = false;
			}
		}
	}

	function open() {
		isOpen = true;
		searchQuery = "";
		selectedIndex = 0;
	}

	function close() {
		isOpen = false;
		searchQuery = "";
		selectedIndex = 0;
	}

	function toggle() {
		if (isOpen) close();
		else open();
	}

	function selectNext() {
		if (selectedIndex < filteredOptions.length - 1) selectedIndex++;
	}

	function selectPrev() {
		if (selectedIndex > 0) selectedIndex--;
	}

	function executeSelected() {
		const opt = filteredOptions[selectedIndex];
		if (opt) {
			close();
			opts.onSelect?.(opt);
			opt.action();
		}
	}

	$effect(() => {
		const key = opts.shortcutKey ?? "k";
		const ctrl = opts.shortcutCtrl ?? true;

		function onKeyDown(e: KeyboardEvent) {
			if (e.key.toLowerCase() === key.toLowerCase() && (ctrl ? e.metaKey || e.ctrlKey : true)) {
				e.preventDefault();
				toggle();
			}
			if (e.key === "Escape" && isOpen) {
				close();
			}
			if (isOpen) {
				if (e.key === "ArrowDown") {
					e.preventDefault();
					selectNext();
				}
				if (e.key === "ArrowUp") {
					e.preventDefault();
					selectPrev();
				}
				if (e.key === "Enter") {
					e.preventDefault();
					executeSelected();
				}
			}
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	});

	return {
		get isOpen() {
			return isOpen;
		},
		get searchQuery() {
			return searchQuery;
		},
		get selectedIndex() {
			return selectedIndex;
		},
		get filteredOptions() {
			return filteredOptions;
		},
		get isLoading() {
			return isLoading;
		},
		open,
		close,
		toggle,
		setQuery,
		setOptions,
		selectNext,
		selectPrev,
		executeSelected,
	};
}
