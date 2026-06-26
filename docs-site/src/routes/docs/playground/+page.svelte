<!-- docs-site/src/routes/docs/playground/+page.svelte -->
<script lang="ts">
import {
	Alert,
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Card,
	Checkbox,
	Dialog,
	Drawer,
	EmptyState,
	Input,
	Pagination,
	Playground,
	Progress,
	Select,
	Separator,
	Skeleton,
	Slider,
	Spinner,
	Stepper,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Tooltip,
	TooltipProvider,
} from "bindrunes";

let dialogOpen = $state(false);
let drawerOpen = $state(false);
</script>

<div class="p-6 lg:p-8 max-w-7xl">
  <Playground>
    {#snippet preview({ definition, props })}
      {#if definition.name === "Button"}
        <Button {...props}>{definition.slot}</Button>
      {:else if definition.name === "Badge"}
        <Badge {...props}>{definition.slot}</Badge>
      {:else if definition.name === "Card"}
        <Card {...props}>{definition.slot}</Card>
      {:else if definition.name === "Alert"}
        <div class="w-full">
          <Alert {...props}>{definition.slot}</Alert>
        </div>
      {:else if definition.name === "Avatar"}
        <Avatar {...props} />
      {:else if definition.name === "Separator"}
        <div class="w-full {props.orientation === 'vertical' ? 'h-8' : ''}">
          <Separator {...props} />
        </div>
      {:else if definition.name === "Skeleton"}
        <div class="w-full">
          <Skeleton {...props} />
        </div>
      {:else if definition.name === "Progress"}
        <div class="w-full">
          <Progress {...props} />
        </div>
      {:else if definition.name === "Input"}
        <div class="w-full">
          <Input {...props} />
        </div>
      {:else if definition.name === "Checkbox"}
        <div class="w-full">
          <Checkbox label={props.label} disabled={props.disabled} />
        </div>
      {:else if definition.name === "Select"}
        <div class="w-full">
          <Select
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
            placeholder={props.placeholder}
            disabled={props.disabled}
          />
        </div>
      {:else if definition.name === "Switch"}
        <Switch disabled={props.disabled} />
      {:else if definition.name === "Slider"}
        <div class="w-full">
          <Slider min={props.min} max={props.max} step={props.step} disabled={props.disabled} />
        </div>
      {:else if definition.name === "Dialog"}
        <div>
          <Button variant="outline" onclick={() => (dialogOpen = true)}>Open Dialog</Button>
          <Dialog bind:open={dialogOpen} title={props.title} size={props.size}>
            <p class="text-body-md text-muted-foreground">{definition.slot}</p>
          </Dialog>
        </div>
      {:else if definition.name === "Tooltip"}
        <TooltipProvider>
          <Tooltip content={props.content} side={props.side}>
            <Button variant="outline">{definition.slot}</Button>
          </Tooltip>
        </TooltipProvider>
      {:else if definition.name === "Drawer"}
        <div>
          <Button variant="outline" onclick={() => (drawerOpen = true)}>Open Drawer</Button>
          <Drawer bind:open={drawerOpen} side={props.side}>
            <p class="text-body-md text-muted-foreground">{definition.slot}</p>
          </Drawer>
        </div>
      {:else if definition.name === "Spinner"}
        <Spinner size={props.size} />
      {:else if definition.name === "EmptyState"}
        <div class="w-full">
          <EmptyState {...props} />
        </div>
      {:else if definition.name === "Tabs"}
        <div class="w-full">
          <Tabs value={props.value}>
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1"><p class="text-body-sm text-muted-foreground p-4">Content for Tab 1</p></TabsContent>
            <TabsContent value="tab2"><p class="text-body-sm text-muted-foreground p-4">Content for Tab 2</p></TabsContent>
            <TabsContent value="tab3"><p class="text-body-sm text-muted-foreground p-4">Content for Tab 3</p></TabsContent>
          </Tabs>
        </div>
      {:else if definition.name === "Pagination"}
        <div class="w-full">
          <Pagination totalPages={props.totalPages} currentPage={props.currentPage} />
        </div>
      {:else if definition.name === "Breadcrumb"}
        <div class="w-full">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Library" },
            { label: "Current Page" },
          ]} separator={props.separator} />
        </div>
      {:else if definition.name === "Stepper"}
        <div class="w-full">
          <Stepper
            steps={[
              { id: "step1", label: "Account" },
              { id: "step2", label: "Profile" },
              { id: "step3", label: "Confirm" },
            ]}
            currentStep={props.currentStep}
          />
        </div>
      {:else}
        <p class="text-body-sm text-muted-foreground">Preview not available for {definition.name}</p>
      {/if}
    {/snippet}
  </Playground>
</div>
