'use client';

import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import * as React from 'react';
import '~/components/tiptap/ui-primitive/dropdown-menu/dropdown-menu.scss';

function DropdownMenu({
  modal = false,
  ...props
}: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root modal={modal} {...props} />;
}

function DropdownMenuPortal({
  ...props
}: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal {...props} />;
}

function DropdownMenuTrigger({
  ...props
}: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger {...props} />;
}

function DropdownMenuGroup({
  ...props
}: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group {...props} />;
}

function DropdownMenuSub({
  ...props
}: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot {...props} />;
}

function DropdownMenuRadioGroup({
  ...props
}: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup {...props} />;
}

function DropdownMenuItem({
  ...props
}: MenuPrimitive.Item.Props) {
  return <MenuPrimitive.Item {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger
      className={(state) => {
        const baseClass = 'tiptap-dropdown-menu-item';
        if (typeof className === 'function') {
          const customClass = className(state);
          return customClass ? `${baseClass} ${customClass}` : baseClass;
        }
        return className ? `${baseClass} ${className}` : baseClass;
      }}
      {...props}
    >
      {children}
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  ref,
  className,
  align = 'start',
  alignOffset = -3,
  side = 'right',
  sideOffset = 0,
  portal = true,
  ...props
}: MenuPrimitive.Popup.Props
  & Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>
  & {
    ref?: React.RefObject<HTMLDivElement | null>
    portal?: boolean
  }) {
  const content = (
    <MenuPrimitive.Positioner
      className='isolate z-50 outline-none'
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
    >
      <MenuPrimitive.Popup
        ref={ref}
        className={(state) => {
          const baseClass = 'tiptap-dropdown-menu';
          if (typeof className === 'function') {
            const customClass = className(state);
            return customClass ? `${baseClass} ${customClass}` : baseClass;
          }
          return className ? `${baseClass} ${className}` : baseClass;
        }}
        {...props}
      />
    </MenuPrimitive.Positioner>
  );

  return portal ? <MenuPrimitive.Portal>{content}</MenuPrimitive.Portal> : content;
}

function DropdownMenuContent({
  ref,
  className,
  align = 'start',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  portal = false,
  ...props
}: MenuPrimitive.Popup.Props
  & Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>
  & {
    ref?: React.RefObject<HTMLDivElement | null>
    portal?: boolean
  }) {
  const content = (
    <MenuPrimitive.Positioner
      className='isolate z-50 outline-none'
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
    >
      <MenuPrimitive.Popup
        ref={ref}
        className={(state) => {
          const baseClass = 'tiptap-dropdown-menu';
          if (typeof className === 'function') {
            const customClass = className(state);
            return customClass ? `${baseClass} ${customClass}` : baseClass;
          }
          return className ? `${baseClass} ${className}` : baseClass;
        }}
        {...props}
      />
    </MenuPrimitive.Positioner>
  );

  return portal ? <MenuPrimitive.Portal>{content}</MenuPrimitive.Portal> : content;
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
