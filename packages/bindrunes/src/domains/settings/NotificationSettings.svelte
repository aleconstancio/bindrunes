<script lang="ts">
import PageSection from "../../layouts/PageSection.svelte";
import Card from "../../primitives/Card.svelte";
import Switch from "../../primitives/Switch.svelte";

interface NotificationPreference {
	id: string;
	label: string;
	description: string;
	email: boolean;
	push: boolean;
	inApp: boolean;
}

let {
	preferences = [] as NotificationPreference[],
	onSave = undefined as ((prefs: NotificationPreference[]) => void) | undefined,
	class: className = "",
}: {
	preferences?: NotificationPreference[];
	onSave?: (prefs: NotificationPreference[]) => void;
	class?: string;
} = $props();

let items = $state([...preferences]);

function updatePref(id: string, field: "email" | "push" | "inApp", value: boolean) {
	items = items.map((p) => (p.id === id ? { ...p, [field]: value } : p));
}
</script>

<PageSection reveal={false} size="md" spacing="compact" class={className}>
  <Card padding>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-title-2 text-foreground">Notifications</h3>
        {#if onSave}
          <button
            type="button"
            class="text-body-sm text-primary hover:underline cursor-pointer bg-transparent border-none"
            onclick={() => onSave(items)}
          >
            Save preferences
          </button>
        {/if}
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-4 gap-4 text-label-sm text-muted-foreground font-medium">
          <div></div>
          <div class="text-center">Email</div>
          <div class="text-center">Push</div>
          <div class="text-center">In-App</div>
        </div>

        {#each items as pref}
          <div class="grid grid-cols-4 gap-4 items-center py-2 border-b border-border last:border-0">
            <div>
              <p class="text-label-md text-foreground">{pref.label}</p>
              <p class="text-body-xs text-muted-foreground">{pref.description}</p>
            </div>
            <div class="flex justify-center">
              <Switch checked={pref.email} onchange={(v) => updatePref(pref.id, 'email', v)} />
            </div>
            <div class="flex justify-center">
              <Switch checked={pref.push} onchange={(v) => updatePref(pref.id, 'push', v)} />
            </div>
            <div class="flex justify-center">
              <Switch checked={pref.inApp} onchange={(v) => updatePref(pref.id, 'inApp', v)} />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </Card>
</PageSection>
