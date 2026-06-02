import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import SidebarProvider from '../../src/components/sidebar/SidebarProvider.svelte';
import SidebarLayout from '../../src/components/sidebar/SidebarLayout.svelte';
import SidebarGroup from '../../src/components/sidebar/SidebarGroup.svelte';
import SidebarMenu from '../../src/components/sidebar/SidebarMenu.svelte';
import SidebarMenuItem from '../../src/components/sidebar/SidebarMenuItem.svelte';
import SidebarMenuButton from '../../src/components/sidebar/SidebarMenuButton.svelte';
import SidebarMenuBadge from '../../src/components/sidebar/SidebarMenuBadge.svelte';
import SidebarMenuSkeleton from '../../src/components/sidebar/SidebarMenuSkeleton.svelte';

describe('Sidebar standalone components', () => {
  it('SidebarLayout renders in header position', () => {
    const { container } = render(SidebarLayout, { position: 'header' });
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('SidebarLayout renders in footer position', () => {
    const { container } = render(SidebarLayout, { position: 'footer' });
    expect(container.firstElementChild!.className).toContain('border-t');
  });

  it('SidebarLayout renders in content position', () => {
    const { container } = render(SidebarLayout, { position: 'content' });
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('SidebarGroup renders label', () => {
    render(SidebarGroup, { props: { label: 'Group 1' } });
    expect(document.querySelector('span')?.textContent).toContain('Group 1');
  });

  it('SidebarMenu renders', () => {
    const { container } = render(SidebarMenu);
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('SidebarMenuItem renders', () => {
    const { container } = render(SidebarMenuItem);
    expect(container.firstElementChild!.className).toContain('group/menuitem');
  });

  it('SidebarMenuButton renders', () => {
    const { container } = render(SidebarMenuButton);
    expect(container.firstElementChild!.className).toContain('group/menubutton');
  });

  it('SidebarMenuButton applies active class when isActive', () => {
    const { container } = render(SidebarMenuButton, { props: { isActive: true } });
    expect(container.firstElementChild!.className).toContain('bg-sidebar-accent');
  });

  it('SidebarMenuBadge renders', () => {
    const { container } = render(SidebarMenuBadge);
    expect(container.firstElementChild!.className).toContain('rounded-full');
  });

  it('SidebarMenuSkeleton renders', () => {
    const { container } = render(SidebarMenuSkeleton);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('SidebarLayout renders separator', () => {
    const { container } = render(SidebarLayout, { position: 'separator' });
    expect(container.querySelector('[role="separator"]')).toBeInTheDocument();
  });
});

describe('Sidebar context-dependent components', () => {
  it('SidebarProvider renders without crashing', () => {
    const { container } = render(SidebarProvider);
    expect(container).toBeInTheDocument();
  });
});
