# Migration Guide: Material UI to bindrunes

This guide covers migrating a React project from Material UI (MUI) to bindrunes (Svelte 5). MUI is a comprehensive React component library implementing Material Design; bindrunes is a Svelte 5 component library with a 3-axis design system. The migration involves rewriting React components to Svelte, replacing MUI's sx prop and styled-components with Tailwind, and swapping the theme system to OKLCH custom properties.

## Component Mapping

| Material UI | bindrunes | Notes |
|---|---|---|
| `Button` | `Button` | Similar API; variant prop instead of variant/color |
| `Card`, `CardContent`, `CardHeader`, `CardActions` | `Card` | Single component with slots |
| `TextField` | `Input` | MUI's TextField is a complex wrapper; bindrunes uses a simpler Input |
| `Select` | `Select` | Similar API |
| `Checkbox` | `Checkbox` | Similar API |
| `Switch` | `Switch` | Same API |
| `Radio`, `RadioGroup` | `RadioGroup` | Simplified |
| `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions` | `Dialog` | Single component with named slots |
| `Drawer` | `Sheet` or `Drawer` | Sheet for side panels, Drawer for bottom sheets |
| `Tabs`, `Tab` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Decomposed API |
| `Table`, `TableBody`, `TableCell`, `TableHead`, `TableRow` | `DataTable` | Higher-level component with column config |
| `Chip` | `Badge` | Different name and semantics |
| `Alert`, `AlertTitle` | `Alert` | Simplified |
| `Snackbar` | `useToast()` composable | Composable-based |
| `Tooltip` | `Tooltip` | Similar API |
| `Menu`, `MenuItem` | `DropdownMenu` | Component-based |
| `Breadcrumbs` | `Breadcrumb` | Single component |
| `Stepper`, `Step` | `Stepper` | Similar pattern |
| `LinearProgress` | `Progress` | Different name |
| `CircularProgress` | `Spinner` | Different name |
| `Grid` (MUI Grid) | Tailwind grid classes | Utility-first |
| `Stack` | Tailwind flex classes | Utility-first |
| `Box` | `<div>` with Tailwind classes | Utility-first |
| `ThemeProvider` | `ThemeProvider` / `AppProvider` | Theme configuration |
| `createTheme` | `createTheme()` | OKLCH-based |
| `Typography`, `Typography.h1` | `text-display-*`, `text-body-*` tokens | Token-based typography |
| `Avatar` | `Avatar` | Similar API |
| `Divider` | `Separator` | Different name |
| `Skeleton` | `Skeleton` | Same API |
| `Rating` | `RatingGroup` | Different name |
| `Slider` | `Slider` | Same API |
| `Badge` (MUI Badge) | `Badge` | Similar API |
| `Accordion`, `AccordionSummary`, `AccordionDetails` | `Accordion`, `AccordionItem` | Simplified |
| `Fab` | `Button variant="primary"` | Use primary button with rounded classes |
| `IconButton` | `Button variant="ghost"` | Use ghost button |
| `ListItem`, `ListItemText` | `Card` + flex layout | Use Card with flex children |
| `ListItemText` (secondary) | Use `text-muted-foreground` | Tailwind text color |
| `Autocomplete` | `Combobox` | Different name |
| `DatePicker` | `DatePicker` | Direct mapping |
| `TimePicker` | `TimeField` | Different name |
| `TreeView` | `TreeView` | Direct mapping |

## Styling Migration

MUI uses the `sx` prop, `styled()` API, or CSS-in-JS. bindrunes uses Tailwind CSS utility classes.

### Before (MUI sx prop)

```tsx
<Box sx={{ display: "flex", gap: 2, mt: 4, alignItems: "center" }}>
  <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
    Title
  </Typography>
  <Button sx={{ ml: "auto" }}>Action</Button>
</Box>
```

### After (Tailwind)

```svelte
<div class="flex gap-2 mt-4 items-center">
  <h6 class="text-lg font-semibold text-foreground">Title</h6>
  <Button class="ml-auto">Action</Button>
</div>
```

### MUI sx Prop to Tailwind

| MUI sx | Tailwind |
|---|---|
| `sx={{ display: "flex" }}` | `class="flex"` |
| `sx={{ display: "grid" }}` | `class="grid"` |
| `sx={{ gap: 2 }}` | `class="gap-2"` (0.5rem units) |
| `sx={{ mt: 2 }}` | `class="mt-2"` (0.5rem units) |
| `sx={{ p: 3 }}` | `class="p-3"` |
| `sx={{ width: "100%" }}` | `class="w-full"` |
| `sx={{ maxWidth: 600 }}` | `class="max-w-[600px]"` |
| `sx={{ textAlign: "center" }}` | `class="text-center"` |
| `sx={{ fontWeight: 600 }}` | `class="font-semibold"` |
| `sx={{ fontSize: "1.25rem" }}` | `class="text-xl"` |
| `sx={{ color: "text.secondary" }}` | `class="text-muted-foreground"` |
| `sx={{ bgcolor: "background.paper" }}` | `class="bg-card-solid"` |
| `sx={{ borderRadius: 2 }}` | `class="rounded-lg"` |
| `sx={{ position: "absolute" }}` | `class="absolute"` |
| `sx={{ overflow: "hidden" }}` | `class="overflow-hidden"` |
| `sx={{ display: { xs: "none", md: "block" } }}` | `class="hidden md:block"` |

### MUI styled() to Tailwind

```tsx
// Before
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
}));

// After — just use Tailwind
<Card class="bg-card-solid rounded-xl p-6">...</Card>
```

### MUI Typography to Tailwind

| MUI Variant | Tailwind Classes |
|---|---|
| `variant="h1"` | `text-display-1 text-foreground` |
| `variant="h2"` | `text-display-2 text-foreground` |
| `variant="h3"` | `text-title-1 text-foreground` |
| `variant="h4"` | `text-title-2 text-foreground` |
| `variant="h5"` | `text-title-3 text-foreground` |
| `variant="h6"` | `text-title-4 text-foreground` |
| `variant="subtitle1"` | `text-body-lg font-semibold text-foreground` |
| `variant="subtitle2"` | `text-body font-semibold text-foreground` |
| `variant="body1"` | `text-body text-foreground` |
| `variant="body2"` | `text-body-sm text-foreground` |
| `variant="caption"` | `text-xs text-muted-foreground` |
| `variant="overline"` | `text-xs uppercase tracking-wide text-muted-foreground` |

## Theme Migration

MUI uses `createTheme` with a JavaScript object. bindrunes uses CSS custom properties with OKLCH color space.

### Before (MUI)

```ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
    error: { main: "#d32f2f" },
    warning: { main: "#ed6c02" },
    success: { main: "#2e7d32" },
    background: { default: "#fafafa", paper: "#ffffff" },
    text: { primary: "#212121", secondary: "#757575" },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
});
```

### After (bindrunes)

```ts
import { defineTheme } from "bindrunes";

const myBrand = defineTheme("my-brand", {
  "--primary": "oklch(0.48 0.18 260)",          // MUI primary #1976d2
  "--primary-foreground": "oklch(0.99 0 0)",
  "--accent": "oklch(0.45 0.18 320)",           // MUI secondary #9c27b0
  "--accent-foreground": "oklch(0.99 0 0)",
  "--destructive": "oklch(0.52 0.22 25)",       // MUI error #d32f2f
  "--warning": "oklch(0.65 0.18 55)",           // MUI warning #ed6c02
  "--success": "oklch(0.55 0.18 145)",          // MUI success #2e7d32
  "--background": "oklch(0.98 0.005 260)",      // MUI background.default
  "--foreground": "oklch(0.18 0.01 260)",       // MUI text.primary
  "--card-solid": "oklch(1 0 0)",               // MUI background.paper
  "--muted-foreground": "oklch(0.5 0.01 260)",  // MUI text.secondary
  "--border": "oklch(0.88 0.005 260)",
  "--ring": "oklch(0.48 0.18 260)",
});

myBrand.apply();
```

### MUI Palette to bindrunes

| MUI Token | bindrunes Token | Notes |
|---|---|---|
| `palette.primary.main` | `--primary` | Main brand color |
| `palette.primary.light` | Use `--primary` with opacity | Or define a lighter shade |
| `palette.primary.dark` | Use `--primary` with lower lightness | Or define a darker shade |
| `palette.secondary.main` | `--accent` | Secondary emphasis |
| `palette.error.main` | `--destructive` | Error/negative state |
| `palette.warning.main` | `--warning` | Caution state |
| `palette.success.main` | `--success` | Positive state |
| `palette.info.main` | `--info` | Informational state |
| `palette.background.default` | `--background` | Page background |
| `palette.background.paper` | `--card-solid` | Card/container background |
| `palette.text.primary` | `--foreground` | Default text color |
| `palette.text.secondary` | `--muted-foreground` | Muted text |
| `palette.divider` | `--border` | Divider/border color |
| `shape.borderRadius` | `--radius` | Border radius |

## Form Migration

MUI uses `Controller` with react-hook-form or formik. bindrunes uses `createForm()` with Valibot.

### Before (MUI + react-hook-form)

```tsx
import { TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

function MyForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Email"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true, minLength: 8 }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="password"
            label="Password"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Button type="submit" variant="contained">Submit</Button>
    </form>
  );
}
```

### After (bindrunes + Valibot)

```svelte
<script lang="ts">
  import * as v from "valibot";
  import { createForm, Form, FormField, Input, Button, Label } from "bindrunes";

  const formSchema = v.object({
    email: v.pipe(v.string(), v.email()),
    password: v.pipe(v.string(), v.minLength(8)),
  });

  const form = createForm({
    schema: formSchema,
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      // submit
    },
  });
</script>

<Form {form}>
  <FormField name="email">
    <Label>Email</Label>
    <Input type="email" bind:value={form.values.email} />
    {#if form.errors.email}
      <span class="text-destructive text-sm">{form.errors.email}</span>
    {/if}
  </FormField>

  <FormField name="password">
    <Label>Password</Label>
    <Input type="password" bind:value={form.values.password} />
    {#if form.errors.password}
      <span class="text-destructive text-sm">{form.errors.password}</span>
    {/if}
  </FormField>

  <Button type="submit" variant="primary">Submit</Button>
</Form>
```

## Layout Migration

MUI uses `Grid` with a 12-column system, `Stack` for spacing, and `Box` as a generic container. bindrunes uses Tailwind utilities.

### MUI Grid to Tailwind Grid

```tsx
// Before
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <Card>Left</Card>
  </Grid>
  <Grid item xs={12} md={6}>
    <Card>Right</Card>
  </Grid>
</Grid>

// After
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Card>Left</Card>
  <Card>Right</Card>
</div>
```

### MUI Stack to Tailwind

```tsx
// Before
<Stack spacing={2} direction="row" alignItems="center">
  <Button>One</Button>
  <Button>Two</Button>
</Stack>

// After
<div class="flex gap-2 items-center">
  <Button>One</Button>
  <Button>Two</Button>
</div>
```

### MUI Box to div

```tsx
// Before
<Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
  Content
</Box>

// After
<div class="p-6 bg-card-solid rounded-lg">Content</div>
```

## Icon Migration

MUI has its own icon package (`@mui/icons-material`). bindrunes uses `lucide-svelte`.

### Before (MUI)

```tsx
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

<IconButton><DeleteIcon /></IconButton>
<TextField InputProps={{ startAdornment: <SearchIcon /> }} />
```

### After (bindrunes)

```svelte
<script lang="ts">
  import { Button, Input } from "bindrunes";
  import { Trash2, Search, Settings } from "lucide-svelte";
</script>

<Button variant="ghost"><Trash2 class="w-4 h-4" /></Button>
<Input><Search class="w-4 h-4" slot="prefix" /></Input>
```

### Common Icon Mappings

| MUI Icon | lucide-svelte |
|---|---|
| `SearchIcon` | `Search` |
| `DeleteIcon` | `Trash2` |
| `EditIcon` | `Pencil` |
| `AddIcon` | `Plus` |
| `CloseIcon` | `X` |
| `CheckIcon` | `Check` |
| `ArrowBackIcon` | `ArrowLeft` |
| `ArrowForwardIcon` | `ArrowRight` |
| `SettingsIcon` | `Settings` |
| `PersonIcon` | `User` |
| `NotificationsIcon` | `Bell` |
| `FavoriteIcon` | `Heart` |
| `StarIcon` | `Star` |
| `VisibilityIcon` | `Eye` |
| `VisibilityOffIcon` | `EyeOff` |
| `LockIcon` | `Lock` |
| `CloudUploadIcon` | `Upload` |
| `CloudDownloadIcon` | `Download` |
| `MenuIcon` | `Menu` |
| `MoreVertIcon` | `MoreVertical` |
| `ExpandMoreIcon` | `ChevronDown` |
| `ExpandLessIcon` | `ChevronUp` |
| `ArrowDropDownIcon` | `ChevronDown` |
| `CalendarTodayIcon` | `Calendar` |
| `AccessTimeIcon` | `Clock` |
| `InfoIcon` | `Info` |
| `WarningIcon` | `AlertTriangle` |
| `ErrorIcon` | `AlertCircle` |
| `CheckCircleIcon` | `CheckCircle` |
| `Brightness4Icon` | `Moon` |
| `Brightness7Icon` | `Sun` |

## Table Migration

MUI's `Table` is a low-level component. bindrunes' `DataTable` provides built-in sorting, pagination, and selection.

### Before (MUI)

```tsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Age</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.age}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

### After (bindrunes)

```svelte
<script lang="ts">
  import { DataTable } from "bindrunes";

  const columns = [
    { accessor: "name", header: "Name" },
    { accessor: "age", header: "Age", sortable: true },
  ];

  const data = [
    { name: "John", age: 32 },
    { name: "Jane", age: 42 },
  ];
</script>

<DataTable {columns} {data} />
```

## Snackbar to Toast Migration

MUI uses `Snackbar` + `Alert` for notifications. bindrunes uses `createToast()` composable.

### Before (MUI)

```tsx
import { Snackbar, Alert, Button } from "@mui/material";

function MyApp() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show</Button>
      <Snackbar open={open} onClose={() => setOpen(false)}>
        <Alert severity="success">Saved!</Alert>
      </Snackbar>
    </>
  );
}
```

### After (bindrunes)

```svelte
<script lang="ts">
  import { createToast } from "bindrunes";
  const toast = createToast();
</script>

<Button onclick={() => toast.success("Saved!")}>Show</Button>
```

Add `ToastProvider` to your root layout:

```svelte
<script lang="ts">
  import { AppProvider, ToastProvider } from "bindrunes";
</script>

<AppProvider>
  <ToastProvider>
    {@render children()}
  </ToastProvider>
</AppProvider>
```

## Common Pitfalls

### 1. React to Svelte

MUI is React-only. This migration requires rewriting components to Svelte syntax (reactivity with `$state`, `bind:value`, `onclick`, `#if`/`#each` blocks).

### 2. sx Prop Doesn't Exist

MUI's `sx` prop is powerful but non-standard. Replace every `sx` with Tailwind utility classes. This is a large but mechanical change.

### 3. No More CSS-in-JS

MUI uses Emotion (CSS-in-JS). bindrunes uses Tailwind. Remove `@emotion/styled`, `@emotion/react`, and all styled-components patterns.

### 4. Grid API Differs

MUI Grid uses `xs`, `md`, `lg` breakpoints with `item` prop. Tailwind uses `col-span-*` with `sm:`, `md:`, `lg:` prefixes. The mapping is not 1:1.

### 5. Typography Replaced by Tokens

MUI's `<Typography variant="h1">` becomes `<h1 class="text-display-1 text-foreground">`. No component needed for typography.

### 6. Icon Package Change

Remove `@mui/icons-material` and install `lucide-svelte`:

```bash
npm uninstall @mui/icons-material
npm install lucide-svelte
```

### 7. Form Library Change

MUI works with react-hook-form, formik, etc. bindrunes uses `createForm()` with Valibot. You'll need to rewrite form logic.

### 8. Remove MUI Dependencies

```bash
npm uninstall @mui/material @mui/icons-material @emotion/styled @emotion/react
```

## Migration Steps

1. **Set up SvelteKit:** If migrating from React, initialize a SvelteKit project
2. **Install bindrunes:** `npm install bindrunes`
3. **Install Valibot:** `npm install valibot` (for form validation)
4. **Install lucide-svelte:** `npm install lucide-svelte` (for icons)
5. **Update `app.css`:** Replace MUI styles with bindrunes imports
6. **Add `AppProvider`:** Wrap your root layout
7. **Replace theme:** Swap MUI's `createTheme` with bindrunes' `defineTheme()` and OKLCH tokens
8. **Rewrite components:** Replace React JSX with Svelte syntax, swap MUI components for bindrunes
9. **Replace sx props:** Convert all `sx` prop objects to Tailwind utility classes
10. **Replace icons:** Swap `@mui/icons-material` for `lucide-svelte`
11. **Replace tables:** Swap MUI Table for `DataTable`
12. **Replace Snackbar:** Swap MUI Snackbar for `createToast()` composable
13. **Remove MUI:** `npm uninstall @mui/material @mui/icons-material @emotion/styled @emotion/react`
14. **Test:** Verify all components render correctly with the new design system
