<script lang="ts">
import { Moon, Sun } from "lucide-svelte";
import { useDarkMode } from "../utils/useDarkMode.svelte";
import Button from "./Button.svelte";

let { variant = "outline" as "icon" | "outline" } = $props();

const darkMode = useDarkMode();

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
    aria-hidden="true"
    class="transition-all duration-[--duration-snappy] text-warning { darkMode.mode === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0 absolute' }"
  />
  <Moon
    size={16}
    aria-hidden="true"
    class="transition-all duration-[--duration-snappy] text-primary { darkMode.mode === 'dark' ? 'scale-0 rotate-90 opacity-0 absolute' : 'scale-100 rotate-0 opacity-100' }"
  />
</Button>
