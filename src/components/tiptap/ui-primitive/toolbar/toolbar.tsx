'use client';

import * as React from 'react';
import { Separator } from '~/components/tiptap/ui-primitive/separator';
import { useComposedRef } from '~/hooks/use-composed-ref';
import { useMenuNavigation } from '~/hooks/use-menu-navigation';
import { cn } from '~/lib/tiptap-utils';
import '~/components/tiptap/ui-primitive/toolbar/toolbar.scss';

type BaseProps = React.HTMLAttributes<HTMLDivElement>;

interface ToolbarProps extends BaseProps {
  variant?: 'floating' | 'fixed'
}

function useToolbarNavigation(toolbarRef: React.RefObject<HTMLDivElement | null>) {
  const [items, setItems] = React.useState<HTMLElement[]>([]);

  const collectItems = React.useCallback(() => {
    if (!toolbarRef.current)
      return [];
    return Array.from(
      toolbarRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [role="button"]:not([disabled]), [tabindex="0"]:not([disabled])',
      ),
    );
  }, [toolbarRef]);

  React.useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar)
      return;

    const updateItems = () => setItems(collectItems());

    updateItems();
    const observer = new MutationObserver(updateItems);
    observer.observe(toolbar, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [collectItems, toolbarRef]);

  const { selectedIndex } = useMenuNavigation<HTMLElement>({
    containerRef: toolbarRef,
    items,
    orientation: 'horizontal',
    onSelect: el => el.click(),
    autoSelectFirstItem: false,
  });

  React.useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar)
      return;

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (toolbar.contains(target))
        target.setAttribute('data-focus-visible', 'true');
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (toolbar.contains(target))
        target.removeAttribute('data-focus-visible');
    };

    toolbar.addEventListener('focus', handleFocus, true);
    toolbar.addEventListener('blur', handleBlur, true);

    return () => {
      toolbar.removeEventListener('focus', handleFocus, true);
      toolbar.removeEventListener('blur', handleBlur, true);
    };
  }, [toolbarRef]);

  React.useEffect(() => {
    if (selectedIndex !== undefined && items[selectedIndex]) {
      items[selectedIndex].focus();
    }
  }, [selectedIndex, items]);
}

export function Toolbar({ ref, children, className, variant = 'fixed', ...props }: ToolbarProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const composedRef = useComposedRef(toolbarRef, ref);
  useToolbarNavigation(toolbarRef);

  return (
    <div
      ref={composedRef}
      role='toolbar'
      aria-label='toolbar'
      data-variant={variant}
      className={cn('tiptap-toolbar', className)}
      {...props}
    >
      {children}
    </div>
  );
}
Toolbar.displayName = 'Toolbar';

export function ToolbarGroup({ ref, children, className, ...props }: BaseProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={ref}
      role='group'
      className={cn('tiptap-toolbar-group', className)}
      {...props}
    >
      {children}
    </div>
  );
}
ToolbarGroup.displayName = 'ToolbarGroup';

export function ToolbarSeparator({ ref, ...props }: BaseProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <Separator ref={ref} orientation='vertical' decorative {...props} />;
}
ToolbarSeparator.displayName = 'ToolbarSeparator';
