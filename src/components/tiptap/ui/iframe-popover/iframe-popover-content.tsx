'use client';

import type { Editor } from '@tiptap/react';
import { CornerDownLeftIcon } from 'lucide-react';
import * as React from 'react';
import { Button, ButtonGroup } from '~/components/tiptap/ui-primitive/button';
import { Card, CardBody, CardItemGroup } from '~/components/tiptap/ui-primitive/card';
import { useIsMobile } from '~/hooks/use-mobile';
import { Input, InputGroup } from '../../ui-primitive/input';

interface IFramePopoverContentProps {
  editor: Editor
  onClose?: () => void
}

export function IFramePopoverContent({ editor, onClose }: IFramePopoverContentProps) {
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');
  const isMobile = useIsMobile();

  const handleInsert = () => {
    if (!code.trim()) {
      setError('Please enter iframe code');
      return;
    }

    setError('');

    editor
      .chain()
      .focus()
      .setIFrame({ code: code.trim() })
      .run();

    setCode('');
    onClose?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleInsert();
    }
    else if (e.key === 'Escape') {
      onClose?.();
    }
  };

  return (
    <Card
      className='border-none shadow-none!'

    >
      <CardBody className='w-full'>
        <CardItemGroup orientation='horizontal' className='flex'>
          <InputGroup className='flex-1'>
            <Input
              type='url'
              placeholder='Paste a iframe link...'
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
            />
          </InputGroup>

          <ButtonGroup orientation='horizontal'>
            <Button
              type='button'
              onClick={handleInsert}
              title='Insert iframe'
              disabled={!code.trim()}
              data-style='ghost'
            >
              <CornerDownLeftIcon className='tiptap-button-icon' />
            </Button>
          </ButtonGroup>
        </CardItemGroup>

        {error && (
          <CardItemGroup orientation='horizontal'>
            <p className='text-xs text-red-500 px-2'>{error}</p>
          </CardItemGroup>
        )}
      </CardBody>
    </Card>
  );
}
