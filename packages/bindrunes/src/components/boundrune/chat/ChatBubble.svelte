<script lang="ts">
let {
	content = "",
	sender = "user" as "user" | "assistant",
	variant = "filled" as "filled" | "outlined" | "ghost",
	class: className = "",
}: {
	content?: string;
	sender?: "user" | "assistant";
	variant?: "filled" | "outlined" | "ghost";
	class?: string;
} = $props();

let variantClasses = $derived.by(() => {
	const filled =
		sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground";
	const outlined =
		sender === "user"
			? "border border-primary text-primary"
			: "border border-border text-foreground";
	const ghost = "text-foreground";
	return { filled, outlined, ghost }[variant];
});
</script>

<div class="flex {sender === 'user' ? 'justify-end' : 'justify-start'} {className}">
  <div class="max-w-[75%] rounded-[--radius-lg] px-4 py-2.5 text-body-md
              {variantClasses}
              {sender === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}">
    {content}
  </div>
</div>
