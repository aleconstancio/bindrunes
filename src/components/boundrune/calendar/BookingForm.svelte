<script lang="ts">
import Button from "../../Button.svelte";
import Card from "../../Card.svelte";
import Input from "../../Input.svelte";

let {
	date = "",
	time = "",
	service = "",
	onSubmit = undefined as
		| ((data: { name: string; email: string; date: string; time: string; notes: string }) => void)
		| undefined,
	loading = false,
	error = "",
	class: className = "",
}: {
	date?: string;
	time?: string;
	service?: string;
	onSubmit?: (data: {
		name: string;
		email: string;
		date: string;
		time: string;
		notes: string;
	}) => void;
	loading?: boolean;
	error?: string;
	class?: string;
} = $props();

let name = $state("");
let email = $state("");
let notes = $state("");

function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	onSubmit?.({ name, email, date, time, notes });
}
</script>

<Card padding class={className}>
  <div class="space-y-6">
    <div>
      <h3 class="text-title-2 text-foreground">Book Appointment</h3>
      {#if date || time || service}
        <p class="text-body-sm text-muted-foreground mt-1">
          {#if service}{service}{/if}
          {#if date} on {date}{/if}
          {#if time} at {time}{/if}
        </p>
      {/if}
    </div>

    {#if error}
      <div class="rounded-[--radius] bg-destructive-soft border border-destructive/30 p-3 text-body-sm text-destructive">
        {error}
      </div>
    {/if}

    <form onsubmit={handleSubmit} class="space-y-4">
      <Input label="Name" bind:value={name} placeholder="Your name" required />
      <Input label="Email" type="email" bind:value={email} placeholder="your@email.com" required />
      <div>
        <label for="booking-notes" class="text-label-md text-foreground">Notes</label>
        <textarea
          id="booking-notes"
          bind:value={notes}
          placeholder="Any special requests or notes..."
          rows={3}
          class="mt-1 w-full rounded-[--radius] border border-border bg-background px-3 py-2 text-body-md text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        ></textarea>
      </div>

      <Button type="submit" fullWidth {loading}>
        {loading ? 'Booking...' : 'Confirm Booking'}
      </Button>
    </form>
  </div>
</Card>
