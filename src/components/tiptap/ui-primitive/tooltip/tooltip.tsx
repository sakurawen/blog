/* eslint-disable react/no-clone-element */
'use client';

import type { Placement, ReferenceType, UseFloatingReturn } from '@floating-ui/react';
import {
  autoUpdate,
  flip,
  FloatingDelayGroup,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import * as React from 'react';
import '~/components/tiptap/ui-primitive/tooltip/tooltip.scss';

interface TooltipProviderProps {
  children: React.ReactNode
  initialOpen?: boolean
  placement?: Placement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  delay?: number
  closeDelay?: number
  timeout?: number
  useDelayGroup?: boolean
}

interface TooltipTriggerProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'> {
  asChild?: boolean
  children: React.ReactNode
}

interface TooltipContentProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
  children?: React.ReactNode
  portal?: boolean
  portalProps?: Omit<React.ComponentProps<typeof FloatingPortal>, 'children'>
}

interface TooltipContextValue extends UseFloatingReturn<ReferenceType> {
  open: boolean
  setOpen: (open: boolean) => void
  getReferenceProps: (
    userProps?: React.HTMLProps<HTMLElement>
  ) => Record<string, unknown>
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLDivElement>
  ) => Record<string, unknown>
}

function useTooltip({
  initialOpen = false,
  placement = 'top',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  delay = 600,
  closeDelay = 0,
}: Omit<TooltipProviderProps, 'children'> = {}) {
  const [uncontrolledOpen, setUncontrolledOpen]
    = React.useState<boolean>(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        padding: 4,
      }),
      shift({ padding: 4 }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    mouseOnly: true,
    move: false,
    restMs: delay,
    enabled: controlledOpen == null,
    delay: {
      close: closeDelay,
    },
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  );
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = React.use(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <TooltipProvider />');
  }

  return context;
}

export function Tooltip({ children, ...props }: TooltipProviderProps) {
  const tooltip = useTooltip(props);

  if (!props.useDelayGroup) {
    return (
      <TooltipContext value={tooltip}>
        {children}
      </TooltipContext>
    );
  }

  return (
    <FloatingDelayGroup
      delay={{ open: props.delay ?? 0, close: props.closeDelay ?? 0 }}
      timeoutMs={props.timeout}
    >
      <TooltipContext value={tooltip}>
        {children}
      </TooltipContext>
    </FloatingDelayGroup>
  );
}

export function TooltipTrigger({ ref: propRef, children, asChild = false, ...props }: TooltipTriggerProps & { ref?: React.RefObject<HTMLElement | null> }) {
  const context = useTooltipContext();
  const childrenRef = React.isValidElement(children)
    ? Number.parseInt(React.version, 10) >= 19
      ? (children as { props: { ref?: React.Ref<any> } }).props.ref
      : (children as any).ref
    : undefined;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && React.isValidElement(children)) {
    const dataAttributes = {
      'data-tooltip-state': context.open ? 'open' : 'closed',
    };

    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(typeof children.props === 'object' ? children.props : {}),
        ...dataAttributes,
      }),
    );
  }

  return (
    <button
      type='button'
      ref={ref}
      data-tooltip-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
}

const defaultPortalProps = {};
export function TooltipContent({ ref: propRef, style, children, portal = true, portalProps = defaultPortalProps, ...props }: TooltipContentProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open)
    return null;

  const content = (
    <div
      ref={ref}
      style={{
        ...context.floatingStyles,
        ...style,
      }}
      {...context.getFloatingProps(props)}
      className='tiptap-tooltip'
    >
      {children}
    </div>
  );

  if (portal) {
    return <FloatingPortal {...portalProps}>{content}</FloatingPortal>;
  }

  return content;
}

Tooltip.displayName = 'Tooltip';
TooltipTrigger.displayName = 'TooltipTrigger';
TooltipContent.displayName = 'TooltipContent';
