# Comprehensive Overhaul Design

## Overview

This design outlines a comprehensive overhaul of the bindrunes component library to reach its full potential. The overhaul focuses on three interconnected areas:

1. **Component Architecture & API Surface** - Standardize patterns, add missing primitives, improve existing components
2. **Agentic UI Component Kit** - Build pre-composed agent interface components
3. **Playground & DX Improvements** - Expand the playground to support all components with live editing
4. **Boundrune Page Patterns** - Add new page templates for common use cases
5. **Testing & Quality** - Improve test coverage and quality assurance

## Goals

- Make bindrunes the premier Svelte 5 component library for B2B SaaS
- Provide a complete agentic UI toolkit for AI-powered applications
- Offer best-in-class developer experience with interactive playground
- Maintain backward compatibility while improving consistency

## Non-Goals

- Breaking changes to existing component APIs
- Removing existing components or features
- Changing the fundamental architecture (createX() pattern, context isolation)

---

## 1. Component Architecture & API Surface

### Current State

- 245 components with mixed prop conventions
- Inline types for ≤8 props, interface Props for >8 props
- Good foundation but inconsistent patterns

### Proposed Changes

#### 1.1 Standardize Prop Convention

- All new components use `interface Props` for consistency
- Existing components follow convention (don't mass-refactor)
- Add `data-testid` attributes for all interactive components

```svelte
<!-- New component example -->
<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onclick?: () => void;
    children: import('svelte').Snippet;
  }

  let { variant = 'primary', size = 'md', disabled = false, onclick, children }: Props = $props();
</script>
```

#### 1.2 Missing Primitives to Add

| Component | Description | Priority |
|-----------|-------------|----------|
| `CommandPalette` | Search-driven command menu (Cmd+K) | High |
| `DataGrid` | Advanced data table with virtual scrolling | High |
| `TreeView` | Hierarchical data display with expand/collapse | Medium |
| `OTPInput` | One-time password input (rename PinInput) | Medium |
| `ColorPicker` | OKLCH color picker with theme integration | Low |

#### 1.3 Component Improvements

| Component | Improvements |
|-----------|--------------|
| `DataTable` | Virtual scrolling, column resizing, row selection, keyboard navigation |
| `Form` | Better validation feedback, multi-step wizard support, conditional fields |
| `Dialog` | Improved animation, nested dialog support, backdrop click handling |
| `Select` | Better keyboard navigation, grouped options, async loading |

### Data Flow

- Components remain stateless, accepting props and emitting events
- State management stays in composables (`createX()` pattern)
- No internal state mutations in components

### Error Handling

- All components include proper TypeScript types
- Runtime validation via Valibot where applicable
- Graceful fallback for missing/invalid props

---

## 2. Agentic UI Component Kit

### Current State

**Existing Chat Components:**
- ChatBubble, ChatInput, ChatMessage, ChatPage, ChatThread
- ConversationList, TypingIndicator

**Existing Agentic Composables:**
- createConversationBranches, createTokenBudget, createWindowStore
- SimulatorRuntime

### Proposed Agentic UI Components

#### 2.1 ToolCallDisplay

Renders tool call invocations with:

```svelte
<ToolCallDisplay
  name="search_files"
  args={{ query: "*.ts", path: "/src" }}
  result={{ files: ["a.ts", "b.ts"] }}
  status="completed"
  expanded={false}
/>
```

**Props:**
- `name: string` - Tool name
- `args: unknown` - Tool arguments (JSON)
- `result?: unknown` - Tool result
- `status: 'pending' | 'completed' | 'error'`
- `expanded?: boolean` - Initial expansion state
- `onToggle?: () => void` - Expansion toggle callback

**Features:**
- Collapsible argument/result sections
- JSON syntax highlighting
- Error state styling
- Loading state for pending calls

#### 2.2 AgentStatus

Real-time agent status indicator:

```svelte
<AgentStatus
  state="thinking"
  tokenUsage={{ prompt: 1234, completion: 567 }}
  elapsedMs={4500}
  onCancel={() => abortController.abort()}
/>
```

**Props:**
- `state: 'idle' | 'thinking' | 'executing' | 'error'`
- `tokenUsage?: { prompt: number; completion: number }`
- `elapsedMs?: number`
- `onCancel?: () => void`

**Features:**
- Animated state transitions
- Token usage display
- Elapsed time counter
- Cancel/stop button

#### 2.3 ReasoningPanel

Shows agent reasoning/chain-of-thought:

```svelte
<ReasoningPanel
  steps={[
    { text: "Analyzing user request...", confidence: 0.9 },
    { text: "Searching for relevant files...", confidence: 0.85 },
    { text: "Found 3 matching files", confidence: 0.95 }
  ]}
  expanded={false}
/>
```

**Props:**
- `steps: Array<{ text: string; confidence?: number }>`
- `expanded?: boolean`
- `onToggle?: () => void`

**Features:**
- Collapsible reasoning steps
- Step-by-step progression
- Confidence indicators
- Visual distinction for different step types

#### 2.4 MemoryDisplay

Shows agent memory layers:

```svelte
<MemoryDisplay
  working={[{ id: "1", preview: "Current task context", tokens: 150 }]}
  episodic={[{ id: "2", preview: "Previous conversation", tokens: 300 }]}
  semantic={[{ id: "3", preview: "Documentation reference", tokens: 200 }]}
/>
```

**Props:**
- `working: MemoryRef[]`
- `episodic: MemoryRef[]`
- `semantic: MemoryRef[]`
- `onSelect?: (ref: MemoryRef) => void`

**Features:**
- Visual distinction between memory layers
- Token count display
- Pin/unpin functionality
- Click to view details

#### 2.5 AgentChatPage

Pre-composed page combining all agentic components:

```svelte
<AgentChatPage
  messages={messages}
  agentStatus={status}
  toolCalls={toolCalls}
  reasoning={reasoningSteps}
  memory={memoryLayers}
  onSendMessage={handleSend}
  onCancel={handleCancel}
/>
```

**Props:**
- `messages: Message[]`
- `agentStatus: AgentState`
- `toolCalls: ToolCall[]`
- `reasoning: ReasoningStep[]`
- `memory: MemoryLayers`
- `onSendMessage: (msg: string) => void`
- `onCancel?: () => void`

### Architecture

- Components use `createMetaContext`/`useMetaContext` pattern for shared state
- Integrate with existing agentic composables
- Follow createX() pattern for state management

### Error Handling

- Graceful fallback for missing data
- Clear error messages
- Loading states for async operations

---

## 3. Playground & DX Improvements

### Current State

- Basic playground with 4 components (Button, Badge, Card, Input)
- Supports prop editing and code generation
- Located in showcase example

### Proposed Improvements

#### 3.1 Full Component Coverage

- Add all 245 components to playground
- Organize by category:
  - Foundation (Button, Badge, Card, etc.)
  - Forms (Input, Select, Checkbox, etc.)
  - Layout (PageShell, PageSection, etc.)
  - Data (DataTable, DataChart, etc.)
  - Navigation (Breadcrumb, Tabs, etc.)
  - Feedback (Dialog, Toast, etc.)
  - Agentic (ToolCallDisplay, AgentStatus, etc.)
- Add search/filter functionality

#### 3.2 Enhanced Playground Features

- Live code editing with syntax highlighting (CodeMirror)
- Theme/aesthetic/density switcher in playground
- Responsive preview (mobile/tablet/desktop)
- Export playground state as shareable URL
- Copy code button for each component

#### 3.3 Component Explorer

- Interactive API reference
- Props documentation with types and defaults
- Live examples for each variant
- Accessibility information

#### 3.4 Integration with Docs Site

- Playground becomes part of docs site
- Component pages link to playground
- Search across all components

### Architecture

- Uses existing bindrunes components + CodeMirror for code editing
- State managed via URL params for shareability
- Responsive design for different screen sizes

### Error Handling

- Graceful fallback for components that fail to render
- Helpful error messages for invalid props
- Loading states for async operations

---

## 4. Boundrune Page Patterns

### Current State

12 Boundrune categories exist:
- App, Auth, Dashboard, Settings, Landing, Marketing
- Portfolio, Data, E-commerce, Media, Calendar, Chat

### Proposed New Boundrunes

#### 4.1 AdminDashboard

Complete admin panel with:
- User management table
- Role-based access controls
- System settings
- Activity logs

```svelte
<AdminDashboard
  users={usersList}
  roles={roles}
  settings={systemSettings}
  activityLogs={logs}
  onUserAction={handleUserAction}
  onSettingsUpdate={handleSettingsUpdate}
/>
```

#### 4.2 AnalyticsDashboard

Data visualization focused:
- Chart.js integration
- Metric cards with trends
- Date range picker
- Export functionality

```svelte
<AnalyticsDashboard
  metrics={metricsData}
  charts={chartConfigs}
  dateRange={dateRange}
  onExport={handleExport}
/>
```

#### 4.3 AgentInterface

AI-powered app shell:
- Chat interface with tool calls
- Agent status panel
- Memory display
- Settings for model configuration

```svelte
<AgentInterface
  agent={agentConfig}
  messages={conversationHistory}
  onSendMessage={handleSend}
  onConfigure={handleConfigure}
/>
```

#### 4.4 KnowledgeBase

Documentation/help center:
- Searchable article list
- Category navigation
- Article viewer with TOC
- Feedback system

```svelte
<KnowledgeBase
  articles={articlesList}
  categories={categories}
  onSearch={handleSearch}
  onFeedback={handleFeedback}
/>
```

#### 4.5 ProjectManagement

Task/project tracking:
- Kanban board view
- Task list with filters
- Timeline/gantt view
- Team collaboration features

```svelte
<ProjectManagement
  projects={projectsList}
  tasks={tasksList}
  team={teamMembers}
  onTaskUpdate={handleTaskUpdate}
/>
```

### Architecture

- Each Boundrune is a pre-composed page template
- Accepts data props for customization
- Uses existing components + new agentic UI components

### Error Handling

- Loading states for async data
- Empty states for no data
- Error boundaries for component failures

---

## 5. Testing & Quality

### Current State

- Vitest with @testing-library/svelte
- vitest-axe for accessibility
- Coverage targets: 80/70/77 (global), 90/85/88 (agentic)

### Proposed Improvements

#### 5.1 Component Testing

- Visual regression tests for all components
- Accessibility testing coverage improvement
- Interaction tests for complex components
- Performance testing for virtual scrolling components

#### 5.2 Agentic Testing

- Integration tests for agentic UI components
- Mock agent runtime for testing tool calls
- Test error states and recovery
- Test memory layer interactions

#### 5.3 Playground Testing

- Test playground renders all components correctly
- Test prop editing updates preview
- Test code generation produces valid code
- Test responsive preview modes

#### 5.4 Documentation Testing

- Test all code examples in docs compile
- Test playground links work
- Test search functionality

### Architecture

- Tests co-located with components
- Visual regression via Playwright
- Performance benchmarks via Lighthouse

### Error Handling

- Test coverage for error states
- Test coverage for loading states
- Test coverage for empty states

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
- Standardize prop conventions for new components
- Add CommandPalette and DataGrid primitives
- Expand playground to 50 components
- Add ToolCallDisplay and AgentStatus components

### Phase 2: Core (Weeks 3-4)
- Add TreeView and OTPInput primitives
- Add ReasoningPanel and MemoryDisplay components
- Expand playground to 100 components
- Add AdminDashboard Boundrune

### Phase 3: Advanced (Weeks 5-6)
- Add ColorPicker primitive
- Add AgentChatPage component
- Expand playground to all 245 components
- Add AnalyticsDashboard and AgentInterface Boundrunes

### Phase 4: Polish (Weeks 7-8)
- Improve existing components
- Add KnowledgeBase and ProjectManagement Boundrunes
- Complete playground integration with docs site
- Improve test coverage

---

## Success Metrics

- **Component Coverage:** 100% of components in playground
- **Test Coverage:** Maintain 80/70/77 global, improve agentic to 95/90/92
- **Documentation:** All components documented with examples
- **Accessibility:** All components pass WCAG 2.1 AA
- **Performance:** Playground loads in <2 seconds
- **Developer Satisfaction:** Positive feedback on new components and DX

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking changes | High | Follow convention, don't mass-refactor |
| Performance issues | Medium | Virtual scrolling, lazy loading |
| Accessibility regression | High | Automated testing, manual audits |
| Scope creep | Medium | Phased implementation, clear priorities |
| Dependency issues | Low | Lightweight dependencies, tree-shaking |

---

## Appendix

### A. Component Inventory

**Current Components (245):**
- Foundation: Button, Badge, Card, Input, etc.
- Forms: Select, Checkbox, Switch, etc.
- Layout: PageShell, PageSection, MetaLayout, etc.
- Data: DataTable, DataChart, etc.
- Navigation: Breadcrumb, Tabs, etc.
- Feedback: Dialog, Toast, etc.
- Agentic: ChatBubble, ChatInput, etc.

**New Components (10):**
- CommandPalette, DataGrid, TreeView, OTPInput, ColorPicker
- ToolCallDisplay, AgentStatus, ReasoningPanel, MemoryDisplay, AgentChatPage

**New Boundrunes (5):**
- AdminDashboard, AnalyticsDashboard, AgentInterface, KnowledgeBase, ProjectManagement

### B. Documentation Structure

```
docs/
├── components/
│   ├── foundation/
│   ├── forms/
│   ├── layout/
│   ├── data/
│   ├── navigation/
│   ├── feedback/
│   └── agentic/
├── boundrunes/
│   ├── admin-dashboard.md
│   ├── analytics-dashboard.md
│   ├── agent-interface.md
│   ├── knowledge-base.md
│   └── project-management.md
├── playground/
│   └── index.md
└── testing/
    └── guide.md
```

### C. Testing Strategy

- **Unit Tests:** Co-located with components
- **Integration Tests:** For agentic UI components
- **Visual Regression:** Playwright screenshots
- **Accessibility:** Automated axe testing
- **Performance:** Lighthouse benchmarks
