'use client';

// --- UI Primitives ---
import type { ButtonProps } from '~/components/tiptap-ui-primitive/button';

// --- Tiptap UI ---
import type { UseCodeBlockConfig } from '~/components/tiptap-ui/code-block-button';

import * as React from 'react';

import { Badge } from '~/components/tiptap-ui-primitive/badge';
import { Button } from '~/components/tiptap-ui-primitive/button';

import {
  CODE_BLOCK_SHORTCUT_KEY,
  useCodeBlock,
} from '~/components/tiptap-ui/code-block-button';
// --- Hooks ---
import { useTiptapEditor } from '~/hooks/use-tiptap-editor';
// --- Lib ---
import { parseShortcutKeys } from '~/lib/tiptap-utils';

export interface CodeBlockButtonProps
  extends Omit<ButtonProps, 'type'>,
  UseCodeBlockConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean
}

export function CodeBlockShortcutBadge({
  shortcutKeys = CODE_BLOCK_SHORTCUT_KEY,
}: {
  shortcutKeys?: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for toggling code block in a Tiptap editor.
 *
 * For custom button implementations, use the `useCodeBlock` hook instead.
 */
export function CodeBlockButton({ ref, editor: providedEditor, text, hideWhenUnavailable = false, onToggled, showShortcut = false, onClick, children, ...buttonProps }: CodeBlockButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const { editor } = useTiptapEditor(providedEditor);
  const {
    isVisible,
    canToggle,
    isActive,
    handleToggle,
    label,
    shortcutKeys,
    Icon,
  } = useCodeBlock({
    editor,
    hideWhenUnavailable,
    onToggled,
  });

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented)
        return;
      handleToggle();
    },
    [handleToggle, onClick],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      type='button'
      data-style='ghost'
      data-active-state={isActive ? 'on' : 'off'}
      role='button'
      disabled={!canToggle}
      data-disabled={!canToggle}
      tabIndex={-1}
      aria-label={label}
      aria-pressed={isActive}
      tooltip='Code Block'
      onClick={handleClick}
      {...buttonProps}
      ref={ref}
    >
      {children ?? (
        <>
          <Icon className='tiptap-button-icon' />
          {text && <span className='tiptap-button-text'>{text}</span>}
          {showShortcut && (
            <CodeBlockShortcutBadge shortcutKeys={shortcutKeys} />
          )}
        </>
      )}
    </Button>
  );
}

CodeBlockButton.displayName = 'CodeBlockButton';
