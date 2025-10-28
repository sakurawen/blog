import { cn } from '~/lib/tiptap-utils';

export interface AdminContainerProps extends React.ComponentProps<'div'> {

}
export function AdminContainer(props: AdminContainerProps) {
  const { className, ...restProps } = props;
  return <div className={cn('admin-container', className)} {...restProps} />;
}
