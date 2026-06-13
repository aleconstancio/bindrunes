<script lang="ts">
import { Toolbar } from "bits-ui";
import { onDestroy, onMount } from "svelte";

type ToolbarAction =
	| "bold"
	| "italic"
	| "code"
	| "link"
	| "heading"
	| "list"
	| "quote"
	| "horizontalrule"
	| "undo"
	| "redo";

const iconMap: Record<string, string> = {
	bold: "B",
	italic: "I",
	code: "</>",
	heading: "H",
	list: "\u2261",
	quote: "\u201C",
	horizontalrule: "\u2014",
	undo: "\u21A9",
	redo: "\u21AA",
};

const iconStyles: Record<string, string> = {
	bold: "text-label-md",
	italic: "italic text-label-md font-serif",
	code: "font-mono text-mono-sm",
	heading: "text-label-md",
	list: "text-title-2 leading-none",
	quote: "text-title-2 leading-none",
	horizontalrule: "text-title-2 leading-none",
	undo: "text-label-md",
	redo: "text-label-md",
};

let {
	value = $bindable(""),
	placeholder = "Write something...",
	toolbar = [
		"bold",
		"italic",
		"code",
		"heading",
		"list",
		"quote",
		"horizontalrule",
		"undo",
		"redo",
	] as ToolbarAction[],
	disabled = false,
	onupdate = undefined as ((md: string) => void) | undefined,
	class: className = "",
}: {
	value?: string;
	placeholder?: string;
	toolbar?: ToolbarAction[];
	disabled?: boolean;
	onupdate?: (md: string) => void;
	class?: string;
} = $props();

let editorEl = $state<HTMLDivElement>();
let view:
	| {
			state: { doc: unknown; tr: unknown };
			dispatch: (tr: unknown) => void;
			updateState: (s: unknown) => void;
			destroy: () => void;
	  }
	| undefined;
let prosemirror: {
	schema: {
		marks: Record<string, unknown>;
		nodes: Record<string, unknown>;
		node: (type: string, null_: null, children?: unknown[]) => unknown;
	};
	toggleMark: (mark: unknown) => (state: unknown, dispatch?: (tr: unknown) => void) => void;
	setBlockType: (
		node: unknown,
		attrs?: Record<string, unknown>,
	) => (state: unknown, dispatch?: (tr: unknown) => void) => void;
	wrapIn: (node: unknown) => (state: unknown, dispatch?: (tr: unknown) => void) => void;
	undo: (state: unknown, dispatch?: (tr: unknown) => void) => void;
	redo: (state: unknown, dispatch?: (tr: unknown) => void) => void;
	history: () => unknown;
	keymap: (map: Record<string, () => void>) => unknown;
	baseKeymap: unknown;
	defaultMarkdownParser: { parse: (md: string) => unknown };
	defaultMarkdownSerializer: { serialize: (doc: unknown) => string };
	EditorState: { create: (opts: { doc: unknown; plugins: unknown[] }) => unknown };
	EditorView: new (
		target: HTMLElement,
		opts: { state: unknown; dispatchTransaction: (tr: unknown) => void },
	) => {
		state: { doc: unknown; tr: unknown };
		dispatch: (tr: unknown) => void;
		updateState: (s: unknown) => void;
		destroy: () => void;
	};
} | null = $state(null);
let loadError = $state<string | null>(null);

function getToolbarCommand(tool: ToolbarAction) {
	if (!prosemirror || !view) return () => {};
	switch (tool) {
		case "bold":
			return () =>
				prosemirror.toggleMark(prosemirror.schema.marks.strong)(view.state, view.dispatch);
		case "italic":
			return () => prosemirror.toggleMark(prosemirror.schema.marks.em)(view.state, view.dispatch);
		case "code":
			return () => prosemirror.toggleMark(prosemirror.schema.marks.code)(view.state, view.dispatch);
		case "heading":
			return () =>
				prosemirror.setBlockType(prosemirror.schema.nodes.heading, { level: 2 })(
					view.state,
					view.dispatch,
				);
		case "list":
			return () =>
				prosemirror.wrapIn(prosemirror.schema.nodes.bullet_list)(view.state, view.dispatch);
		case "quote":
			return () =>
				prosemirror.wrapIn(prosemirror.schema.nodes.blockquote)(view.state, view.dispatch);
		case "horizontalrule":
			return () => {
				const hr = prosemirror.schema.nodes.horizontal_rule.create();
				view.dispatch(view.state.tr.replaceSelectionWith(hr));
			};
		case "undo":
			return () => prosemirror.undo(view.state, view.dispatch);
		case "redo":
			return () => prosemirror.redo(view.state, view.dispatch);
		default:
			return () => {};
	}
}

function syncValue() {
	if (!view || !prosemirror) return;
	const serialized = prosemirror.defaultMarkdownSerializer.serialize(view.state.doc);
	const md = serialized?.trim() ?? "";
	value = md;
	onupdate?.(md);
}

onMount(async () => {
	try {
		const [commands, history, keymapMod, markdown, state, viewMod] = await Promise.all([
			import("prosemirror-commands"),
			import("prosemirror-history"),
			import("prosemirror-keymap"),
			import("prosemirror-markdown"),
			import("prosemirror-state"),
			import("prosemirror-view"),
		]);

		prosemirror = {
			schema: markdown.schema,
			toggleMark: commands.toggleMark,
			setBlockType: commands.setBlockType,
			wrapIn: commands.wrapIn,
			undo: commands.undo,
			redo: commands.redo,
			history: history.history,
			keymap: keymapMod.keymap,
			baseKeymap: commands.baseKeymap,
			defaultMarkdownParser: markdown.defaultMarkdownParser,
			defaultMarkdownSerializer: markdown.defaultMarkdownSerializer,
			EditorState: state.EditorState,
			EditorView: viewMod.EditorView,
		};

		const parsed = value ? prosemirror.defaultMarkdownParser.parse(value) : null;
		const doc =
			parsed ?? prosemirror.schema.node("doc", null, [prosemirror.schema.node("paragraph")]);
		const editorState = prosemirror.EditorState.create({
			doc,
			plugins: [
				prosemirror.history(),
				prosemirror.keymap(prosemirror.baseKeymap as Record<string, () => void>),
				prosemirror.keymap({
					"Mod-b": () =>
						prosemirror.toggleMark(prosemirror.schema.marks.strong)(view?.state, view?.dispatch),
					"Mod-i": () =>
						prosemirror.toggleMark(prosemirror.schema.marks.em)(view?.state, view?.dispatch),
					"Mod-`": () =>
						prosemirror.toggleMark(prosemirror.schema.marks.code)(view?.state, view?.dispatch),
					"Mod-z": () => prosemirror.undo(view?.state, view?.dispatch),
					"Mod-y": () => prosemirror.redo(view?.state, view?.dispatch),
					"Mod-Shift-z": () => prosemirror.redo(view?.state, view?.dispatch),
				}),
			],
		});

		view = new prosemirror.EditorView(editorEl ?? document.createElement("div"), {
			state: editorState,
			dispatchTransaction(tr) {
				if (!view) return;
				const newState = view.state.apply(tr);
				view.updateState(newState);
				syncValue();
			},
		});
	} catch {
		loadError =
			"prosemirror packages are not installed. Add them as dependencies: " +
			"bun add prosemirror-commands prosemirror-history prosemirror-keymap prosemirror-markdown prosemirror-state prosemirror-view";
	}
});

onDestroy(() => view?.destroy());
</script>

<div class="rounded-[--radius] border border-border bg-card overflow-hidden {className}">
  {#if loadError}
    <p class="text-body-sm text-destructive p-4">{loadError}</p>
  {:else}
    {#if toolbar.length > 0}
      <Toolbar.Root orientation="horizontal" loop class="flex items-center gap-1 p-2 border-b border-border">
        {#each toolbar as tool}
          <Toolbar.Button disabled={disabled} onclick={getToolbarCommand(tool)}
            class="inline-flex items-center justify-center rounded-[--radius] px-2 py-1 text-label-sm font-medium transition-colors cursor-pointer
                   text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class={iconStyles[tool] || 'text-label-md'}>{iconMap[tool] || tool}</span>
          </Toolbar.Button>
        {/each}
      </Toolbar.Root>
    {/if}
    <div
      bind:this={editorEl}
      class="p-4 min-h-48 focus:outline-none {disabled ? 'pointer-events-none opacity-50' : ''}"
      style="color: var(--foreground);"
    ></div>
  {/if}
</div>
