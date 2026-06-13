<script lang="ts">
import { Moon, Sun } from "lucide-svelte";
import { createDarkMode } from "../utils/createDarkMode.svelte";
import Button from "./Button.svelte";

let { variant = "outline" as "icon" | "outline" } = $props();

const darkMode = createDarkMode();

let _buttonVariant = $derived(variant === "icon" ? "ghost" : variant);
</script>

<Button
  variant={_buttonVariant}
  onclick={darkMode.toggle}
  aria-label={darkMode.mode === 'dark' ? 'Light mode' : 'Dark mode'}
  class="relative"
>
  <Sun
    size={16}
    class="transition-all duration-[--duration-snappy] { darkMode.mode === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0 absolute' }"
    style="color: var(--warning)"
  />
  <Moon
    size={16}
    class="transition-all duration-[--duration-snappy] { darkMode.mode === 'dark' ? 'scale-0 rotate-90 opacity-0 absolute' : 'scale-100 rotate-0 opacity-100' }"
    style="color: var(--primary)"
  />
</Button>
