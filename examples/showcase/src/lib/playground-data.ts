export interface PlaygroundComponent {
  name: string;
  category: string;
  props: Record<string, {
    type: "select" | "switch" | "text" | "number";
    options?: string[];
    default: unknown;
  }>;
  slot?: string;
}

export const components: PlaygroundComponent[] = [
  // Foundation
  {
    name: "Button",
    category: "Foundation",
    props: {
      variant: { type: "select", options: ["primary", "secondary", "outline", "ghost", "destructive", "link", "soft", "subtle"], default: "primary" },
      size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
      disabled: { type: "switch", default: false },
      loading: { type: "switch", default: false },
      fullWidth: { type: "switch", default: false }
    },
    slot: "Click me"
  },
  {
    name: "Badge",
    category: "Foundation",
    props: {
      variant: { type: "select", options: ["primary", "secondary", "outline", "soft", "destructive"], default: "primary" },
      size: { type: "select", options: ["sm", "md", "lg"], default: "md" }
    },
    slot: "Label"
  },
  {
    name: "Card",
    category: "Foundation",
    props: {
      variant: { type: "select", options: ["surface", "glass", "outlined", "ghost"], default: "surface" },
      padding: { type: "switch", default: true },
      interactive: { type: "switch", default: false }
    },
    slot: "Card content goes here."
  },
  {
    name: "Alert",
    category: "Foundation",
    props: {
      variant: { type: "select", options: ["info", "success", "warning", "destructive"], default: "info" },
      title: { type: "text", default: "Information" }
    },
    slot: "This is an informational message."
  },
  {
    name: "Avatar",
    category: "Foundation",
    props: {
      size: { type: "select", options: ["sm", "md", "lg", "xl"], default: "md" },
      name: { type: "text", default: "John Doe" }
    }
  },
  {
    name: "Separator",
    category: "Foundation",
    props: {
      orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" }
    }
  },
  {
    name: "Skeleton",
    category: "Foundation",
    props: {
      lines: { type: "number", default: 3 },
      width: { type: "text", default: "100%" }
    }
  },
  {
    name: "Progress",
    category: "Foundation",
    props: {
      value: { type: "number", default: 60 },
      max: { type: "number", default: 100 },
      showValue: { type: "switch", default: true }
    }
  },
  // Forms
  {
    name: "Input",
    category: "Forms",
    props: {
      placeholder: { type: "text", default: "Enter text..." },
      disabled: { type: "switch", default: false },
      required: { type: "switch", default: false }
    }
  },
  {
    name: "Checkbox",
    category: "Forms",
    props: {
      disabled: { type: "switch", default: false },
      label: { type: "text", default: "Accept terms" }
    }
  },
  {
    name: "Select",
    category: "Forms",
    props: {
      placeholder: { type: "text", default: "Select an option..." },
      disabled: { type: "switch", default: false }
    }
  },
  {
    name: "Switch",
    category: "Forms",
    props: {
      disabled: { type: "switch", default: false }
    }
  },
  // Data
  {
    name: "DataTable",
    category: "Data",
    props: {
      striped: { type: "switch", default: false },
      hoverable: { type: "switch", default: true }
    }
  },
  // Overlays
  {
    name: "Dialog",
    category: "Overlays",
    props: {
      title: { type: "text", default: "Dialog Title" }
    },
    slot: "Dialog content goes here."
  },
  {
    name: "Tooltip",
    category: "Overlays",
    props: {
      side: { type: "select", options: ["top", "right", "bottom", "left"], default: "top" },
      content: { type: "text", default: "Tooltip content" }
    },
    slot: "Hover me"
  },
  // Navigation
  {
    name: "Tabs",
    category: "Navigation",
    props: {
      defaultValue: { type: "text", default: "tab1" }
    }
  },
  {
    name: "Pagination",
    category: "Navigation",
    props: {
      totalPages: { type: "number", default: 10 },
      currentPage: { type: "number", default: 1 }
    }
  },
  // Feedback
  {
    name: "Spinner",
    category: "Feedback",
    props: {
      size: { type: "select", options: ["sm", "md", "lg"], default: "md" }
    }
  },
  {
    name: "EmptyState",
    category: "Feedback",
    props: {
      title: { type: "text", default: "No items found" },
      description: { type: "text", default: "Create your first item to get started." }
    }
  }
];

export const categories = [...new Set(components.map(c => c.category))];
