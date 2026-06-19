<script lang="ts">
interface MemoryRef {
	id: string;
	preview: string;
	tokens: number;
	pinned?: boolean;
}

interface Props {
	working?: MemoryRef[];
	episodic?: MemoryRef[];
	semantic?: MemoryRef[];
	onSelect?: (ref: MemoryRef) => void;
	class?: string;
}

let {
	working = [],
	episodic = [],
	semantic = [],
	onSelect,
	class: className = "",
}: Props = $props();

const layerColors = {
	working: "border-l-blue-500",
	episodic: "border-l-green-500",
	semantic: "border-l-purple-500",
};
</script>

<div class="space-y-4 {className}">
  {#if working.length > 0}
    <div>
      <h4 class="text-label-sm text-muted-foreground mb-2">Working Memory</h4>
      <div class="space-y-2">
        {#each working as ref}
          <button
            class="w-full text-left p-3 border-l-2 {layerColors.working} bg-muted/20 
                   rounded-r-[--radius-md] hover:bg-muted/40 transition-colors"
            onclick={() => onSelect?.(ref)}
          >
            <p class="text-body-sm text-foreground">{ref.preview}</p>
            <span class="text-label-xs text-muted-foreground">{ref.tokens} tokens</span>
          </button>
        {/each}
      </div>
    </div>
  {/if}
  
  {#if episodic.length > 0}
    <div>
      <h4 class="text-label-sm text-muted-foreground mb-2">Episodic Memory</h4>
      <div class="space-y-2">
        {#each episodic as ref}
          <button
            class="w-full text-left p-3 border-l-2 {layerColors.episodic} bg-muted/20 
                   rounded-r-[--radius-md] hover:bg-muted/40 transition-colors"
            onclick={() => onSelect?.(ref)}
          >
            <p class="text-body-sm text-foreground">{ref.preview}</p>
            <span class="text-label-xs text-muted-foreground">{ref.tokens} tokens</span>
          </button>
        {/each}
      </div>
    </div>
  {/if}
  
  {#if semantic.length > 0}
    <div>
      <h4 class="text-label-sm text-muted-foreground mb-2">Semantic Memory</h4>
      <div class="space-y-2">
        {#each semantic as ref}
          <button
            class="w-full text-left p-3 border-l-2 {layerColors.semantic} bg-muted/20 
                   rounded-r-[--radius-md] hover:bg-muted/40 transition-colors"
            onclick={() => onSelect?.(ref)}
          >
            <p class="text-body-sm text-foreground">{ref.preview}</p>
            <span class="text-label-xs text-muted-foreground">{ref.tokens} tokens</span>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
