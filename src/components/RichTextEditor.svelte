<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { EditorState } from 'prosemirror-state';
  import { EditorView } from 'prosemirror-view';
  import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown';
  import { keymap } from 'prosemirror-keymap';
  import { baseKeymap } from 'prosemirror-commands';
  import { history, undo, redo } from 'prosemirror-history';
  import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
  import { Toolbar } from 'bits-ui';

  type ToolbarAction = 'bold' | 'italic' | 'code' | 'link' | 'heading' | 'list' | 'quote' | 'horizontalrule' | 'undo' | 'redo';

  const iconMap: Record<string, string> = {
    bold: 'B',
    italic: 'I',
    code: '</>',
    heading: 'H',
    list: '\u2261',
    quote: '\u201C',
    horizontalrule: '\u2014',
    undo: '\u21A9',
    redo: '\u21AA',
  };

  const iconStyles: Record<string, string> = {
    bold: 'text-label-md',
    italic: 'italic text-label-md font-serif',
    code: 'font-mono text-mono-sm',
    heading: 'text-label-md',
    list: 'text-title-2 leading-none',
    quote: 'text-title-2 leading-none',
    horizontalrule: 'text-title-2 leading-none',
    undo: 'text-label-md',
    redo: 'text-label-md',
  };

  let {
    value = $bindable(''),
    placeholder = 'Write something...',
    toolbar = ['bold', 'italic', 'code', 'heading', 'list', 'quote', 'horizontalrule', 'undo', 'redo'] as ToolbarAction[],
    disabled = false,
    onupdate = undefined as ((md: string) => void) | undefined,
    class: className = '',
  }: {
    value?: string;
    placeholder?: string;
    toolbar?: ToolbarAction[];
    disabled?: boolean;
    onupdate?: (md: string) => void;
    class?: string;
  } = $props();

  let editorEl = $state<HTMLDivElement>();
  let view: EditorView | undefined;

  function getToolbarCommand(tool: ToolbarAction) {
    switch (tool) {
      case 'bold': return () => toggleMark(schema.marks.strong)(view!.state, view!.dispatch);
      case 'italic': return () => toggleMark(schema.marks.em)(view!.state, view!.dispatch);
      case 'code': return () => toggleMark(schema.marks.code)(view!.state, view!.dispatch);
      case 'heading': return () => setBlockType(schema.nodes.heading, { level: 2 })(view!.state, view!.dispatch);
      case 'list': return () => wrapIn(schema.nodes.bullet_list)(view!.state, view!.dispatch);
      case 'quote': return () => wrapIn(schema.nodes.blockquote)(view!.state, view!.dispatch);
      case 'horizontalrule': return () => {
        const hr = schema.nodes.horizontal_rule.create();
        view!.dispatch(view!.state.tr.replaceSelectionWith(hr));
      };
      case 'undo': return () => undo(view!.state, view!.dispatch);
      case 'redo': return () => redo(view!.state, view!.dispatch);
      default: return () => {};
    }
  }

  function syncValue() {
    if (!view) return;
    const serialized = defaultMarkdownSerializer.serialize(view.state.doc);
    const md = serialized?.trim() ?? '';
    value = md;
    onupdate?.(md);
  }

  onMount(() => {
    const parsed = value ? defaultMarkdownParser.parse(value) : null;
    const doc = parsed ?? schema.node('doc', null, [schema.node('paragraph')]);
    const state = EditorState.create({
      doc,
      plugins: [
        history(),
        keymap(baseKeymap),
        keymap({
          'Mod-b': () => toggleMark(schema.marks.strong)(view!.state, view!.dispatch),
          'Mod-i': () => toggleMark(schema.marks.em)(view!.state, view!.dispatch),
          'Mod-`': () => toggleMark(schema.marks.code)(view!.state, view!.dispatch),
          'Mod-z': () => undo(view!.state, view!.dispatch),
          'Mod-y': () => redo(view!.state, view!.dispatch),
          'Mod-Shift-z': () => redo(view!.state, view!.dispatch),
        }),
      ],
    });

    view = new EditorView(editorEl!, {
      state,
      dispatchTransaction(tr) {
        if (!view) return;
        const newState = view.state.apply(tr);
        view.updateState(newState);
        syncValue();
      },
    });
  });

  onDestroy(() => view?.destroy());
</script>

<div class="rounded-[--radius] border overflow-hidden {className}" style="border-color: var(--border); background: var(--card);">
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
    class="p-4 min-h-[200px] focus:outline-none {disabled ? 'pointer-events-none opacity-50' : ''}"
    style="color: var(--foreground);"
  ></div>
</div>
