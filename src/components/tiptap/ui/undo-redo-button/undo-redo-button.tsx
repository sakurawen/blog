'use client';

// --- UI Primitives ---
import type { ButtonProps } from '~/components/tiptap/ui-primitive/button';

// --- Tiptap UI ---
import type {
  UndoRedoAction,
  UseUndoRedoConfig,
} from '~/components/tiptap/ui/undo-redo-button';

import * as React from 'react';

import { Badge } from '~/components/tiptap/ui-primitive/badge';
import { Button } from '~/components/tiptap/ui-primitive/button';

import {
  UNDO_REDO_SHORTCUT_KEYS,
  useUndoRedo,
} from '~/components/tiptap/ui/undo-redo-button';
// --- Hooks ---
import { useTiptapEditor } from '~/hooks/use-tiptap-editor';
// --- Lib ---
import { parseShortcutKeys } from '~/lib/tiptap-utils';

export interface UndoRedoButtonProps
  extends Omit<ButtonProps, 'type'>,
  UseUndoRedoConfig {
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

export function HistoryShortcutBadge({
  action,
  shortcutKeys = UNDO_REDO_SHORTCUT_KEYS[action],
}: {
  action: UndoRedoAction
  shortcutKeys?: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for triggering undo/redo actions in a Tiptap editor.
 *
 * For custom button implementations, use the `useHistory` hook instead.
 */
export function UndoRedoButton({ ref, editor: providedEditor, action, text, hideWhenUnavailable = false, onExecuted, showShortcut = false, onClick, children, ...buttonProps }: UndoRedoButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const { editor } = useTiptapEditor(providedEditor);
  const { isVisible, handleAction, label, canExecute, Icon, shortcutKeys }
    = useUndoRedo({
      editor,
      action,
      hideWhenUnavailable,
      onExecuted,
    });

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented)
        return;
      handleAction();
    },
    [handleAction, onClick],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      type='button'
      disabled={!canExecute}
      data-style='ghost'
      data-disabled={!canExecute}
      role='button'
      tabIndex={-1}
      aria-label={label}
      tooltip={label}
      onClick={handleClick}
      {...buttonProps}
      ref={ref}
    >
      {children ?? (
        <>
          <Icon className='tiptap-button-icon' />
          {text && <span className='tiptap-button-text'>{text}</span>}
          {showShortcut && (
            <HistoryShortcutBadge
              action={action}
              shortcutKeys={shortcutKeys}
            />
          )}
        </>
      )}
    </Button>
  );
}

UndoRedoButton.displayName = 'UndoRedoButton';
