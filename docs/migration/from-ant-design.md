# Migration Guide: Ant Design to urupe-ui

This guide covers migrating a React project from Ant Design to urupe-ui (Svelte 5). Ant Design is a mature React component library with a comprehensive design system; urupe-ui is a Svelte 5 component library with a 3-axis design system. The migration involves rewriting React components to Svelte, replacing Ant Design's ConfigProvider with urupe-ui theming, and swapping form validation to Valibot.

## Component Mapping

| Ant Design | urupe-ui | Notes |
|---|---|---|
| `Button` | `Button` | Similar API; variant prop instead of type/ghost |
| `Card` | `Card` | Similar API; uses slots instead of children |
| `Form`, `Form.Item` | `useForm()` composable + `Form`, `FormField` | Validation via Valibot |
| `Input` | `Input` | Same API surface |
| `Input.TextArea` | `Input` with `textarea` prop | Single component |
| `InputNumber` | `Input` with `type="number"` | Or use `Slider` for numeric ranges |
| `Select` | `Select` | Similar API |
| `Checkbox` | `Checkbox` | Similar API |
| `Checkbox.Group` | `CheckboxGroup` | Different name |
| `Switch` | `Switch` | Same API |
| `Radio`, `Radio.Group` | `RadioGroup` | Simplified |
| `DatePicker` | `DatePicker` | Direct mapping |
| `TimePicker` | `TimeField` | Different name |
| `RangePicker` | `DatePicker` with range mode | See docs |
| `Modal` | `Dialog` | Different name |
| `Drawer` | `Sheet` or `Drawer` | Sheet for side panels, Drawer for bottom sheets |
| `Tabs`, `Tabs.TabPane` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Decomposed API |
| `Table` | `DataTable` | Higher-level component with column config |
| `Tag` | `Badge` | Different name and semantics |
| `Alert` | `Alert` | Similar API |
| `message` (API) | `useToast()` composable | Composable-based |
| `notification` (API) | `useToast()` composable | Composable-based |
| `Popconfirm` | `AlertDialog` or `Popover` | Use AlertDialog for confirmations |
| `Dropdown` | `DropdownMenu` | Component-based |
| `Breadcrumb` | `Breadcrumb` | Single component |
| `Steps` | `Stepper` | Different name |
| `Progress` | `Progress` | Same API |
| `Spin` | `Spinner` | Different name |
| `Layout`, `Layout.Sider`, `Layout.Header` | `MetaLayout`, `DashboardShell` | Component-based layouts |
| `ConfigProvider` | `ThemeProvider` | Theme configuration |
| `Typography`, `Typography.Title` | `text-display-*`, `text-body-*` tokens | Token-based typography |
| `Space` | Tailwind flex with `gap` | Utility-first |
| `Divider` | `Separator` | Different name |
| `Avatar` | `Avatar` | Similar API |
| `Tooltip` | `Tooltip` | Similar API |
| `Popover` | `Popover` | Similar API |
| `Collapse` | `Accordion` | Different name |
| `List` | `Card` + flex layout | Use Card with flex children |
| `Descriptions` | `Card` + grid layout | Use Card with grid children |
| `Result` | `Card` with icon + text | Custom layout |
| `Empty` | Custom component | No direct equivalent |
| `Skeleton` | `Skeleton` | Same API |
| `Rate` | `RatingGroup` | Different name |
| `Upload` | `FileUpload` | Different name |

## Design Token Migration

Ant Design uses a token-based design system with component-level customization. urupe-ui uses CSS custom properties with OKLCH color space.

### Before (Ant Design)

```tsx
// theme.ts
import { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    colorPrimary: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1677ff",
    colorBgBase: "#ffffff",
    colorTextBase: "#000000",
    borderRadius: 6,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
  },
  components: {
    Button: {
      colorPrimary: "#1677ff",
      algorithm: true,
    },
    Input: {
      colorBorder: "#d9d9d9",
      activeBorderColor: "#1677ff",
    },
  },
};
```

### After (urupe-ui)

```ts
import { defineTheme } from "urupe-ui";

const myBrand = defineTheme("my-brand", {
  "--primary": "oklch(0.55 0.22 260)",         // Ant's colorPrimary #1677ff
  "--primary-foreground": "oklch(0.99 0 0)",
  "--success": "oklch(0.68 0.19 140)",          // Ant's colorSuccess #52c41a
  "--warning": "oklch(0.82 0.18 85)",           // Ant's colorWarning #faad14
  "--destructive": "oklch(0.6 0.22 25)",        // Ant's colorError #ff4d4f
  "--info": "oklch(0.55 0.22 260)",             // Ant's colorInfo
  "--background": "oklch(1 0 0)",               // Ant's colorBgBase
  "--foreground": "oklch(0.15 0.01 260)",       // Ant's colorTextBase
  "--border": "oklch(0.85 0.01 260)",           // Ant's colorBorder
  "--card-solid": "oklch(0.98 0.005 260)",
  "--ring": "oklch(0.55 0.22 260)",
});

myBrand.apply();
```

### Ant Design Token to urupe-ui

| Ant Design Token | urupe-ui Token | Notes |
|---|---|---|
| `colorPrimary` | `--primary` | Main brand color |
| `colorSuccess` | `--success` | Positive state |
| `colorWarning` | `--warning` | Caution state |
| `colorError` | `--destructive` | Error/negative state |
| `colorInfo` | `--info` | Informational state |
| `colorBgBase` | `--background` | Page background |
| `colorTextBase` | `--foreground` | Default text color |
| `colorBgContainer` | `--card-solid` | Card/container background |
| `colorBorder` | `--border` | Border color |
| `colorBorderSecondary` | `--border` with opacity | Secondary border |
| `colorTextSecondary` | `--muted-foreground` | Muted text |
| `colorTextTertiary` | `--muted-foreground` with opacity | Even more muted |
| `borderRadius` | `--radius` | Border radius |
| `fontSize` | Use Tailwind `text-sm` | Font size via utilities |
| `fontFamily` | Use Tailwind `font-sans` | Font family via utilities |

## Theme Customization Migration

Ant Design uses `ConfigProvider` to set theme context. urupe-ui uses CSS custom properties and composables.

### Before (Ant Design)

```tsx
// App.tsx
import { ConfigProvider } from "antd";
import { theme } from "./theme";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <MyApp />
    </ConfigProvider>
  );
}
```

### After (urupe-ui)

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import { AppProvider } from "urupe-ui";
  import "./theme.css"; // your custom theme
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

```css
/* theme.css */
@import "tailwindcss";
@plugin "urupe-ui/tailwind";
@import "urupe-ui/styles/global.css";
```

Or use `createTheme` for runtime switching:

```svelte
<script lang="ts">
  import { createTheme } from "urupe-ui";
  const theme = createTheme({ default: "editorial" });
</script>
```

## Form Validation Migration

Ant Design Form uses `rules` prop for validation. urupe-ui uses Valibot schemas with `createForm()`.

### Before (Ant Design)

```tsx
import { Form, Input, Button, message } from "antd";

const App = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    message.success("Submitted!");
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true },
          { min: 8, message: "Min 8 characters" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};
```

### After (urupe-ui)

```svelte
<script lang="ts">
  import * as v from "valibot";
  import { createForm, Form, FormField, Input, Button, Label } from "urupe-ui";

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

### Ant Design Validation Rules to Valibot

| Ant Design Rule | Valibot |
|---|---|
| `{ required: true }` | `v.pipe(v.string(), v.required())` |
| `{ type: "email" }` | `v.pipe(v.string(), v.email())` |
| `{ min: 8 }` | `v.pipe(v.number(), v.minValue(8))` |
| `{ max: 100 }` | `v.pipe(v.number(), v.maxValue(100))` |
| `{ len: 5 }` | `v.pipe(v.string(), v.length(5))` |
| `{ pattern: /^[A-Z]+$/ }` | `v.pipe(v.string(), v.regex(/^[A-Z]+$/))` |
| Custom validator | `v.pipe(v.string(), v.check((v) => ...))` |

## Layout Migration

Ant Design uses `Layout`, `Layout.Sider`, `Layout.Header`, `Layout.Content`. urupe-ui uses `MetaLayout` and `DashboardShell`.

### Before (Ant Design)

```tsx
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

function AppLayout() {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sidebar</Sider>
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
}
```

### After (urupe-ui)

```svelte
<script lang="ts">
  import { MetaLayout } from "urupe-ui";
</script>

<MetaLayout>
  <div slot="header">Header</div>
  <div slot="sidebar">Sidebar</div>
  <div slot="content">Content</div>
</MetaLayout>
```

Or use `DashboardShell` for admin-style layouts:

```svelte
<script lang="ts">
  import { DashboardShell } from "urupe-ui";
</script>

<DashboardShell>
  {@render children()}
</DashboardShell>
```

## Icon Migration

Ant Design has its own icon library (`@ant-design/icons-svg`). urupe-ui uses `lucide-svelte`.

### Before (Ant Design)

```tsx
import { SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

<Button icon={<SearchOutlined />}>Search</Button>
<Input prefix={<UserOutlined />} />
```

### After (urupe-ui)

```svelte
<script lang="ts">
  import { Button } from "urupe-ui";
  import { Search, Settings, User } from "lucide-svelte";
</script>

<Button><Search class="w-4 h-4" /> Search</Button>
<Input><User class="w-4 h-4" slot="prefix" /></Input>
```

### Common Icon Mappings

| Ant Design Icon | lucide-svelte |
|---|---|
| `SearchOutlined` | `Search` |
| `SettingOutlined` | `Settings` |
| `UserOutlined` | `User` |
| `DeleteOutlined` | `Trash2` |
| `EditOutlined` | `Pencil` |
| `PlusOutlined` | `Plus` |
| `CloseOutlined` | `X` |
| `CheckOutlined` | `Check` |
| `ArrowLeftOutlined` | `ArrowLeft` |
| `ArrowRightOutlined` | `ArrowRight` |
| `LoadingOutlined` | `Loader2` |
| `BellOutlined` | `Bell` |
| `HeartOutlined` | `Heart` |
| `StarOutlined` | `Star` |
| `EyeOutlined` | `Eye` |
| `EyeInvisibleOutlined` | `EyeOff` |
| `LockOutlined` | `Lock` |
| `UnlockOutlined` | `LockOpen` |
| `UploadOutlined` | `Upload` |
| `DownloadOutlined` | `Download` |

## Table Migration

Ant Design's `Table` is feature-rich with sorting, filtering, pagination, and row selection. urupe-ui provides `DataTable` with column configuration.

### Before (Ant Design)

```tsx
import { Table } from "antd";

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age", sorter: (a, b) => a.age - b.age },
  { title: "Address", dataIndex: "address", key: "address" },
];

const data = [
  { key: "1", name: "John", age: 32, address: "10 Downing St" },
  { key: "2", name: "Jane", age: 42, address: "10 Downing St" },
];

<Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
```

### After (urupe-ui)

```svelte
<script lang="ts">
  import { DataTable } from "urupe-ui";

  const columns = [
    { accessor: "name", header: "Name" },
    { accessor: "age", header: "Age", sortable: true },
    { accessor: "address", header: "Address" },
  ];

  const data = [
    { name: "John", age: 32, address: "10 Downing St" },
    { name: "Jane", age: 42, address: "10 Downing St" },
  ];
</script>

<DataTable {columns} {data} pagination={{ pageSize: 10 }} />
```

## Common Pitfalls

### 1. React to Svelte

Ant Design is React-only. This migration requires rewriting components to Svelte syntax (reactivity with `$state`, `bind:value`, `onclick`, `#if`/`#each` blocks).

### 2. CSS-in-JS to Tailwind

Ant Design uses CSS-in-JS (cssinjs/antd-style). urupe-ui uses Tailwind CSS. Replace styled-components patterns with utility classes.

### 3. ConfigProvider Is Gone

You no longer need a central provider for theme. Theme is set via CSS custom properties and `AppProvider`.

### 4. No More Icon Package

Remove `@ant-design/icons-svg` and install `lucide-svelte`:

```bash
npm uninstall @ant-design/icons-svg
npm install lucide-svelte
```

### 5. Form Validation Changes

Ant Design form rules are declaratory. Valibot schemas are programmatic using `v.pipe()`. The learning curve is minimal but the syntax differs.

### 6. Table Is Higher-Level

`DataTable` provides more out of the box (sorting, pagination, selection) but has a different configuration model. Review the `DataTable` docs for column config options.

### 7. Spacing and Layout

Ant Design's `Space` component maps to Tailwind flex with `gap`. Replace `<Space direction="vertical">` with `<div class="flex flex-col gap-4">`.

## Migration Steps

1. **Set up SvelteKit:** If migrating from React, initialize a SvelteKit project
2. **Install urupe-ui:** `npm install urupe-ui`
3. **Install Valibot:** `npm install valibot` (for form validation)
4. **Install lucide-svelte:** `npm install lucide-svelte` (for icons)
5. **Update `app.css`:** Replace Ant Design styles with urupe-ui imports
6. **Add `AppProvider`:** Wrap your root layout
7. **Replace ConfigProvider:** Swap Ant Design's `ConfigProvider` with `AppProvider` and CSS custom properties
8. **Rewrite components:** Replace React JSX with Svelte syntax, swap Ant Design components for urupe-ui
9. **Migrate forms:** Replace Ant Design Form rules with Valibot schemas
10. **Replace icons:** Swap `@ant-design/icons` for `lucide-svelte`
11. **Replace tables:** Swap Ant Design Table for `DataTable`
12. **Remove Ant Design:** `npm uninstall antd @ant-design/icons-svg` and clean up
13. **Test:** Verify all components render correctly with the new design system
