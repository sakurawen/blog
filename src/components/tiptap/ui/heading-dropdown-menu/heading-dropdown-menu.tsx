'use client';

// --- UI Primitives ---
import type { ButtonProps } from '~/components/tiptap/ui-primitive/button';

// --- Tiptap UI ---
import type { Level } from '~/components/tiptap/ui/heading-button';

import type { UseHeadingDropdownMenuConfig } from '~/components/tiptap/ui/heading-dropdown-menu';

import * as React from 'react';
// --- Icons ---
import { ChevronDownIcon } from '~/components/tiptap/icons/chevron-down-icon';
import { Button, ButtonGroup } from '~/components/tiptap/ui-primitive/button';

import { Card, CardBody } from '~/components/tiptap/ui-primitive/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '~/components/tiptap/ui-primitive/dropdown-menu';
import { HeadingButton } from '~/components/tiptap/ui/heading-button';
import { useHeadingDropdownMenu } from '~/components/tiptap/ui/heading-dropdown-menu';
// --- Hooks ---
import { useTiptapEditor } from '~/hooks/use-tiptap-editor';

export interface HeadingDropdownMenuProps
  extends Omit<ButtonProps, 'type'>,
  UseHeadingDropdownMenuConfig {
  /**
   * Whether to render the dropdown menu in a portal
   * @default false
   */
  portal?: boolean
  /**
   * Callback for when the dropdown opens or closes
   */
  onOpenChange?: (isOpen: boolean) => void
}

const defaultLevels = [1, 2, 3, 4, 5, 6] as Level[];
/**
 * Dropdown menu component for selecting heading levels in a Tiptap editor.
 *
 * For custom dropdown implementations, use the `useHeadingDropdownMenu` hook instead.
 */
export function HeadingDropdownMenu({ ref, editor: providedEditor, levels = defaultLevels, hideWhenUnavailable = false, portal = false, onOpenChange, ...buttonProps }: HeadingDropdownMenuProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = React.useState(false);
  const { isVisible, isActive, canToggle, Icon } = useHeadingDropdownMenu({
    editor,
    levels,
    hideWhenUnavailable,
  });

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (!editor || !canToggle)
        return;
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [canToggle, editor, onOpenChange],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <DropdownMenu modal open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger
        nativeButton
        render={(
          <Button
            className='tiptap-button'
            type='button'
            data-style='ghost'
            data-active-state={isActive ? 'on' : 'off'}
            role='button'
            tabIndex={-1}
            disabled={!canToggle}
            data-disabled={!canToggle}
            aria-label='Format text as heading'
            aria-pressed={isActive}
            tooltip='Heading'
            {...buttonProps}

          >
            <Icon className='tiptap-button-icon' />
            <ChevronDownIcon className='tiptap-button-dropdown-small' />
          </Button>
        )}
      >
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align='start' portal={portal}>
          <Card>
            <CardBody>
              <ButtonGroup>
                {levels.map(level => (
                  <DropdownMenuItem
                    nativeButton
                    key={`heading-${level}`}
                    render={(
                      <HeadingButton
                        editor={editor}
                        level={level}
                        text={`Heading ${level}`}
                        showTooltip={false}
                      />
                    )}
                  >
                  </DropdownMenuItem>
                ))}
              </ButtonGroup>
            </CardBody>
          </Card>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}

HeadingDropdownMenu.displayName = 'HeadingDropdownMenu';

export default HeadingDropdownMenu;
