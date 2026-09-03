<script lang="ts">
let {
	size = "md" as "sm" | "md" | "lg",
	class: className = "",
}: {
	size?: "sm" | "md" | "lg";
	class?: string;
} = $props();

const sizes = {
	sm: "h-4 w-4 border-2",
	md: "h-6 w-6 border-2",
	lg: "h-10 w-10 border-[3px]",
};
</script>

<svg
  data-size={size}
  class="urupe-ui-spin text-primary {sizes[size]} {className}"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
  <path
    class="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
  />
</svg>

<style>
  @keyframes urupe-ui-spin {
    to { transform: rotate(360deg); }
  }
  .urupe-ui-spin {
    animation: urupe-ui-spin 1s linear infinite;
  }
</style>
