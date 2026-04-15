# UI Components — shadcn/ui

## Core Principle

**shadcn/ui is the only component library in this project.** Every UI element — buttons, inputs, dialogs, cards, tables, dropdowns, tooltips, forms, etc. — **must** be a shadcn/ui component. Do not create custom components from scratch. Do not install alternative component libraries (e.g., Radix Themes, Chakra, MUI, Mantine, Headless UI).

## Rules

### 1. Always Use shadcn Components

Before writing any new UI, check whether shadcn/ui already provides the component you need. The full catalogue is at [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components). Common components include:

- **Layout:** `Card`, `Separator`, `Sheet`, `Tabs`, `Accordion`, `Collapsible`
- **Forms:** `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Label`, `Form`
- **Feedback:** `Alert`, `AlertDialog`, `Dialog`, `Toast` / `Sonner`, `Tooltip`, `Popover`
- **Data display:** `Table`, `Badge`, `Avatar`, `Skeleton`
- **Navigation:** `DropdownMenu`, `Command`, `Breadcrumb`, `Pagination`

If the component you need exists in shadcn/ui, **use it**. If you think you need something custom, you almost certainly don't — compose existing shadcn primitives instead.

### 2. Install Missing Components via the CLI

Components are code-generated into `components/ui/`. If one isn't present yet, install it:

```bash
npx shadcn@latest add <component-name>
```

Examples:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add table
npx shadcn@latest add input label form
```

Never copy-paste component code from the shadcn docs manually. Always use the CLI so the component matches the project's `base-nova` style and configuration from `components.json`.

### 3. Never Edit Generated Files

Files inside `components/ui/` are generated output. **Do not modify them.** If you need to extend a component's behaviour:

- Create a **wrapper component** in `components/` (outside `ui/`) that composes the shadcn primitive.
- Pass additional props or children to the wrapper.

```tsx
// components/copy-button.tsx  ✅ correct — wraps the shadcn Button
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  return (
    <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(text)}>
      <Copy />
    </Button>
  );
}
```

```tsx
// components/ui/button.tsx  ❌ wrong — never edit this file
```

### 4. No Custom Primitive Components

Do not create hand-rolled UI primitives. Specifically:

- **No custom buttons** — use `<Button>` with a variant (`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`).
- **No custom inputs/textareas** — use `<Input>` and `<Textarea>`.
- **No custom modals** — use `<Dialog>` or `<AlertDialog>`.
- **No custom dropdowns** — use `<DropdownMenu>`, `<Select>`, or `<Popover>`.
- **No custom cards** — use `<Card>` with `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<CardContent>`, `<CardFooter>`.
- **No custom tables** — use `<Table>`, `<TableHeader>`, `<TableRow>`, `<TableHead>`, `<TableBody>`, `<TableCell>`.

If you find yourself writing a `<div>` with `rounded border shadow` classes, stop — that's a `<Card>`.

## Configuration

| Setting | Value |
|---|---|
| Style | `base-nova` (Base UI primitives) |
| Icons | `lucide-react` |
| Import alias | `@/components/ui/<name>` |
| Utility helper | `cn()` from `@/lib/utils` |
| CSS variables | Enabled — tokens in `app/globals.css` |
| Config file | `components.json` at project root |

The `base-nova` style means shadcn components use `@base-ui/react` under the hood for accessible primitives. **Do not import `@base-ui/react` directly** — always go through the shadcn wrappers in `components/ui/`.

## Usage Guidelines

### Importing

Always import from the `@/components/ui/` alias:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
```

### Merging Class Names

Use `cn()` to conditionally add Tailwind classes. Never overwrite `className` with a plain string:

```tsx
// ✅ correct
<Button className={cn("w-full", isLoading && "opacity-50")}>Submit</Button>

// ❌ wrong — loses the component's base styles
<button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
```

### Using Variants and Sizes

Prefer built-in variant and size props over ad-hoc Tailwind overrides:

```tsx
// ✅ correct — uses the variant system
<Button variant="destructive" size="sm">Delete</Button>

// ❌ wrong — bypasses the design system
<Button className="bg-red-500 text-white text-xs h-6">Delete</Button>
```

Available `Button` variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`.
Available `Button` sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`.

### Layout and Spacing

Apply layout classes (margins, padding, flex, grid) to a **wrapper element**, not directly to the shadcn component:

```tsx
// ✅ correct
<div className="flex gap-2 mt-4">
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</div>

// ❌ avoid — adding mt-4 directly to the component
<Button className="mt-4">Save</Button>
```

### Icons

Use `lucide-react` for all icons. Place icons inside shadcn components as children:

```tsx
import { Plus } from "lucide-react";

<Button size="sm">
  <Plus /> New Link
</Button>
```

### Composition Over Custom Code

Build complex UI by composing multiple shadcn components together rather than creating bespoke markup:

```tsx
// ✅ correct — composed from shadcn primitives
<Card>
  <CardHeader>
    <CardTitle>My Links</CardTitle>
    <CardDescription>Manage your shortened URLs</CardDescription>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>URL</TableHead>
          <TableHead>Clicks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{/* rows */}</TableBody>
    </Table>
  </CardContent>
</Card>

// ❌ wrong — hand-rolled card and table
<div className="rounded-lg border shadow p-4">
  <h2 className="text-lg font-bold">My Links</h2>
  <table className="w-full">...</table>
</div>
```
