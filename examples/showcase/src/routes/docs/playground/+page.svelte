<!-- docs-site/src/routes/docs/playground/+page.svelte -->
<script lang="ts">
import {
	Accordion,
	AccordionItem,
	Alert,
	AlertDialog,
	Avatar,
	Badge,
	BouncingDots,
	Breadcrumb,
	Button,
	Card,
	Checkbox,
	CodeSnippet,
	Collapsible,
	ColorPicker,
	ContextMenu,
	DataGrid,
	DatePicker,
	Dialog,
	Drawer,
	DropdownMenu,
	EmptyState,
	ErrorBanner,
	FileUpload,
	Input,
	Kbd,
	Label,
	MetricCard,
	NavigationMenu,
	NumberInput,
	Omnibar,
	OTPInput,
	Pagination,
	PasswordInput,
	PinInput,
	Playground,
	Popconfirm,
	Popover,
	Progress,
	RadioGroup,
	RangeCalendar,
	RatingGroup,
	RichTextEditor,
	RuleFootnote,
	ScrollArea,
	Select,
	Separator,
	Sheet,
	Skeleton,
	Slider,
	Spinner,
	StatusChip,
	Stepper,
	SuccessBanner,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	TagInput,
	TimeField,
	Timeline,
	Toggle,
	ToggleGroup,
	Tooltip,
	TooltipProvider,
	TreeView,
} from "urupe-ui";

let dialogOpen = $state(false);
let drawerOpen = $state(false);
let sheetOpen = $state(false);
let alertDialogOpen = $state(false);
let collapsibleOpen = $state(false);
let commandPaletteOpen = $state(false);
let contextMenuOpen = $state(false);
let dropdownMenuOpen = $state(false);
let popoverOpen = $state(false);
let popconfirmOpen = $state(false);
let togglePressed = $state(false);
</script>

<div class="p-6 lg:p-8 max-w-7xl">
  <Playground>
    {#snippet preview(definition, props)}
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
      {:else if definition.name === "Accordion"}
        <div class="w-full">
          <Accordion {...props}>
            <AccordionItem value="item1">
              {#snippet trigger()}Section 1{/snippet}
              <p class="text-body-sm text-muted-foreground p-4">Content for section 1</p>
            </AccordionItem>
            <AccordionItem value="item2">
              {#snippet trigger()}Section 2{/snippet}
              <p class="text-body-sm text-muted-foreground p-4">Content for section 2</p>
            </AccordionItem>
          </Accordion>
        </div>
      {:else if definition.name === "AccordionItem"}
        <div class="w-full">
          <Accordion>
            <AccordionItem {...props}>
              {#snippet trigger()}Accordion Item Title{/snippet}
              <p class="text-body-sm text-muted-foreground p-4">Item content goes here.</p>
            </AccordionItem>
          </Accordion>
        </div>
      {:else if definition.name === "AlertDialog"}
        <div>
          <Button variant="outline" onclick={() => (alertDialogOpen = true)}>Open Alert Dialog</Button>
          <AlertDialog
            bind:open={alertDialogOpen}
            title={props.title}
            description={props.description}
            confirmLabel={props.confirmLabel}
            cancelLabel={props.cancelLabel}
            destructive={props.destructive}
            onConfirm={() => {}}
          />
        </div>
      {:else if definition.name === "CodeSnippet"}
        <div class="w-full">
          <CodeSnippet code={props.code} language={props.language} title={props.title || undefined} />
        </div>
      {:else if definition.name === "Collapsible"}
        <div class="w-full">
          <Collapsible bind:open={collapsibleOpen} disabled={props.disabled}>
            {#snippet trigger()}Toggle Section{/snippet}
            <p class="text-body-sm text-muted-foreground p-4">Collapsible content is visible.</p>
          </Collapsible>
        </div>
      {:else if definition.name === "ColorPicker"}
        <ColorPicker disabled={props.disabled} />
      {:else if definition.name === "Combobox"}
        <div class="w-full">
          <Combobox
            placeholder={props.placeholder}
            disabled={props.disabled}
            options={[
              { label: "Apple", value: "apple" },
              { label: "Banana", value: "banana" },
              { label: "Cherry", value: "cherry" },
            ]}
          />
        </div>
      {:else if definition.name === "CommandPalette"}
        <div>
          <Button variant="outline" onclick={() => (commandPaletteOpen = true)}>Open Command Palette</Button>
          <CommandPalette
            bind:open={commandPaletteOpen}
            placeholder={props.placeholder}
            items={[
              { id: "1", label: "New file" },
              { id: "2", label: "Search" },
              { id: "3", label: "Settings" },
            ]}
          />
        </div>
      {:else if definition.name === "ContextMenu"}
        <ContextMenu
          items={[
            { label: "Copy", value: "copy" },
            { label: "Paste", value: "paste" },
            { label: "Delete", value: "delete", separator: true },
          ]}
        >
          <Button variant="outline">{definition.slot}</Button>
        </ContextMenu>
      {:else if definition.name === "DatePicker"}
        <div class="w-full">
          <DatePicker label={props.label} disabled={props.disabled} />
        </div>
      {:else if definition.name === "DropdownMenu"}
        <DropdownMenu
          side={props.side}
          align={props.align}
          items={[
            { label: "Profile", value: "profile" },
            { label: "Settings", value: "settings" },
            { label: "Logout", value: "logout" },
          ]}
        >
          {#snippet trigger()}<Button variant="outline">{definition.slot}</Button>{/snippet}
        </DropdownMenu>
      {:else if definition.name === "Kbd"}
        <Kbd>{definition.slot}</Kbd>
      {:else if definition.name === "Label"}
        <Label>{definition.slot}</Label>
      {:else if definition.name === "MetricCard"}
        <div class="w-full">
          <MetricCard
            label={props.label}
            value={props.value}
            detail={props.detail}
            variant={props.variant}
          />
        </div>
      {:else if definition.name === "NumberInput"}
        <div class="w-full">
          <NumberInput
            min={props.min}
            max={props.max}
            step={props.step}
            disabled={props.disabled}
            size={props.size}
            label={props.label}
          />
        </div>
      {:else if definition.name === "OTPInput"}
        <div class="w-full">
          <OTPInput length={props.length} disabled={props.disabled} />
        </div>
      {:else if definition.name === "PasswordInput"}
        <div class="w-full">
          <PasswordInput
            placeholder={props.placeholder}
            disabled={props.disabled}
            required={props.required}
          />
        </div>
      {:else if definition.name === "PinInput"}
        <div class="w-full">
          <PinInput length={props.length} disabled={props.disabled} type={props.type} />
        </div>
      {:else if definition.name === "Popconfirm"}
        <Popconfirm
          title={props.title}
          confirmLabel={props.confirmLabel}
          cancelLabel={props.cancelLabel}
          destructive={props.destructive}
          onConfirm={() => {}}
        >
          {#snippet trigger()}<Button variant="outline">{definition.slot}</Button>{/snippet}
        </Popconfirm>
      {:else if definition.name === "Popover"}
        <Popover side={props.side} align={props.align}>
          {#snippet trigger()}<Button variant="outline">{definition.slot}</Button>{/snippet}
          <div class="p-4 text-body-sm">Popover content goes here.</div>
        </Popover>
      {:else if definition.name === "RadioGroup"}
        <div class="w-full">
          <RadioGroup
            label={props.label}
            options={[
              { label: "Option A", value: "a" },
              { label: "Option B", value: "b" },
              { label: "Option C", value: "c" },
            ]}
          />
        </div>
      {:else if definition.name === "RangeCalendar"}
        <div class="w-full">
          <RangeCalendar />
        </div>
      {:else if definition.name === "RatingGroup"}
        <RatingGroup max={props.max} disabled={props.disabled} />
      {:else if definition.name === "RichTextEditor"}
        <div class="w-full">
          <RichTextEditor placeholder={props.placeholder} disabled={props.disabled} />
        </div>
      {:else if definition.name === "ScrollArea"}
        <div class="w-full h-40">
          <ScrollArea>
            <div class="p-4">
              <p class="text-body-sm text-muted-foreground">This is scrollable content. Add more text to see the scrollbar appear. The scroll area provides a custom styled scrollbar.</p>
              <p class="text-body-sm text-muted-foreground mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p class="text-body-sm text-muted-foreground mt-2">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </ScrollArea>
        </div>
      {:else if definition.name === "Sheet"}
        <div>
          <Button variant="outline" onclick={() => (sheetOpen = true)}>Open Sheet</Button>
          <Sheet bind:open={sheetOpen} side={props.side} size={props.size} title={props.title}>
            <p class="text-body-md text-muted-foreground">{definition.slot}</p>
          </Sheet>
        </div>
      {:else if definition.name === "StatusChip"}
        <StatusChip variant={props.variant} label={props.label} dot={props.dot} animate={props.animate} />
      {:else if definition.name === "SwipeableList"}
        <div class="w-full">
          <SwipeableList>
            <p class="p-4 text-body-sm text-muted-foreground">{definition.slot}</p>
          </SwipeableList>
        </div>
      {:else if definition.name === "TagInput"}
        <div class="w-full">
          <TagInput
            placeholder={props.placeholder}
            disabled={props.disabled}
            maxTags={props.maxTags}
            label={props.label}
          />
        </div>
      {:else if definition.name === "TimeField"}
        <div class="w-full">
          <TimeField disabled={props.disabled} />
        </div>
      {:else if definition.name === "Timeline"}
        <div class="w-full">
          <Timeline
            items={[
              { title: "Created", description: "Account created", time: "2 min ago" },
              { title: "Updated", description: "Profile updated", time: "1 hour ago" },
              { title: "Published", description: "Post published", time: "Yesterday" },
            ]}
          />
        </div>
      {:else if definition.name === "Toggle"}
        <Toggle bind:pressed={togglePressed} disabled={props.disabled}>{definition.slot}</Toggle>
      {:else if definition.name === "ToggleGroup"}
        <ToggleGroup
          options={[
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ]}
          multiple={props.multiple}
        />
      {:else if definition.name === "TreeView"}
        <div class="w-full">
          <TreeView
            nodes={[
              { id: "1", label: "Documents", children: [
                { id: "1-1", label: "readme.md" },
                { id: "1-2", label: "notes.txt" },
              ]},
              { id: "2", label: "Images", children: [
                { id: "2-1", label: "photo.jpg" },
              ]},
            ]}
          />
        </div>
      {:else if definition.name === "NavigationMenu"}
        <div class="w-full">
          <NavigationMenu
            links={[
              { label: "Home", href: "/" },
              { label: "Docs", href: "/docs" },
              { label: "Blog", href: "/blog" },
            ]}
          />
        </div>
      {:else if definition.name === "FileUpload"}
        <div class="w-full">
          <FileUpload multiple={props.multiple} maxFiles={props.maxFiles} />
        </div>
      {:else if definition.name === "BouncingDots"}
        <BouncingDots />
      {:else if definition.name === "RuleFootnote"}
        <div class="w-full">
          <RuleFootnote title={props.title} description={props.description}>
            {definition.slot}
          </RuleFootnote>
        </div>
      {:else if definition.name === "ErrorBanner"}
        <div class="w-full">
          <ErrorBanner error={props.error} />
        </div>
      {:else if definition.name === "SuccessBanner"}
        <div class="w-full">
          <SuccessBanner>{definition.slot}</SuccessBanner>
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
      {:else if definition.name === "TabsList"}
        <div class="w-full">
          <Tabs value="t1">
            <TabsList>
              {definition.slot}
            </TabsList>
          </Tabs>
        </div>
      {:else if definition.name === "TabsTrigger"}
        <div class="w-full">
          <Tabs value={props.value}>
            <TabsList>
              <TabsTrigger {...props}>{definition.slot}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      {:else if definition.name === "TabsContent"}
        <div class="w-full">
          <Tabs value={props.value}>
            <TabsContent {...props}>{definition.slot}</TabsContent>
          </Tabs>
        </div>
      {:else if definition.name === "Pagination"}
        <div class="w-full">
          <Pagination totalPages={props.totalPages} currentPage={props.currentPage} />
        </div>
      {:else if definition.name === "DataGrid"}
        <div class="w-full">
          <DataGrid
            columns={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "status", label: "Status" },
            ]}
            rows={[
              { id: "1", name: "Alice", role: "Admin", status: "Active" },
              { id: "2", name: "Bob", role: "Editor", status: "Inactive" },
            ]}
            selectable={props.selectable}
            emptyText={props.emptyText}
          />
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
