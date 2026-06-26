<script lang="ts">
import { Card, Badge, Button, Input } from "bindrunes";
import { useCounter, useToggle, useClipboard, useDebounce } from "bindrunes";

const counter = useCounter(0);
const toggle = useToggle(false);
const { copied, copy } = useClipboard();

let searchQuery = $state("");
let debouncedResult = $state("");

const debouncedSearch = useDebounce((value: string) => {
  debouncedResult = value ? `Searching for: "${value}"` : "";
}, 500);

function handleSearch(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  searchQuery = value;
  debouncedSearch(value);
}
</script>

<div class="max-w-4xl mx-auto p-6 space-y-8">
  <div>
    <h1 class="text-display-3 mb-2">Composable Playground</h1>
    <p class="text-body-lg text-muted-foreground">Interactive demos for bindrunes composables.</p>
  </div>

  <Card>
    <div class="p-6 space-y-4">
      <div class="flex items-center gap-2">
        <h2 class="text-title-1">useCounter</h2>
        <Badge variant="soft" size="sm">Reactive</Badge>
      </div>
      <p class="text-body-md text-muted-foreground">A simple counter with increment, decrement, and reset.</p>
      <div class="flex items-center gap-4">
        <Button variant="outline" onclick={() => counter.decrement()}>-</Button>
        <span class="text-display-2 w-16 text-center">{counter.count}</span>
        <Button variant="outline" onclick={() => counter.increment()}>+</Button>
        <Button variant="ghost" onclick={() => counter.reset()}>Reset</Button>
      </div>
      <pre class="text-mono-xs bg-muted p-3 rounded">count: {counter.count}</pre>
    </div>
  </Card>

  <Card>
    <div class="p-6 space-y-4">
      <div class="flex items-center gap-2">
        <h2 class="text-title-1">useToggle</h2>
        <Badge variant="soft" size="sm">Reactive</Badge>
      </div>
      <p class="text-body-md text-muted-foreground">A boolean toggle with set, toggle, and reset.</p>
      <div class="flex items-center gap-4">
        <Button variant={toggle.current ? "primary" : "outline"} onclick={() => toggle.toggle()}>
          {toggle.current ? "ON" : "OFF"}
        </Button>
        <Button variant="ghost" onclick={() => toggle.set(true)}>Set True</Button>
        <Button variant="ghost" onclick={() => toggle.set(false)}>Set False</Button>
      </div>
      <pre class="text-mono-xs bg-muted p-3 rounded">value: {toggle.current}</pre>
    </div>
  </Card>

  <Card>
    <div class="p-6 space-y-4">
      <div class="flex items-center gap-2">
        <h2 class="text-title-1">useClipboard</h2>
        <Badge variant="soft" size="sm">Utility</Badge>
      </div>
      <p class="text-body-md text-muted-foreground">Copy text to clipboard with success state.</p>
      <div class="flex items-center gap-4">
        <Input value="Hello, bindrunes!" readonly class="flex-1" />
        <Button onclick={() => copy("Hello, bindrunes!")}>
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  </Card>

  <Card>
    <div class="p-6 space-y-4">
      <div class="flex items-center gap-2">
        <h2 class="text-title-1">useDebounce</h2>
        <Badge variant="soft" size="sm">Async</Badge>
      </div>
      <p class="text-body-md text-muted-foreground">Debounce a callback. Type to see debounced results.</p>
      <div class="space-y-2">
        <Input placeholder="Type something..." value={searchQuery} oninput={handleSearch} />
        <pre class="text-mono-xs bg-muted p-3 rounded">{debouncedResult || "Waiting for input..."}</pre>
      </div>
    </div>
  </Card>
</div>
