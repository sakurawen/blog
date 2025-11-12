import { LayoutDashboard, PencilLine } from 'lucide-react';

export interface Group {
  label: string
  icon?: React.ReactNode
  children: Array<Menu>
}
export interface Menu {
  label: string
  href: string
}
export const menus: Array<Group> = [
  {
    label: 'Platform',
    icon: <LayoutDashboard />,
    children: [
      {
        label: 'Dashboard',
        href: '/studio',
      },
    ],
  },
  {
    label: 'Resource',
    icon: <PencilLine />,
    children: [
      {
        label: 'Posts',
        href: '/studio/posts',
      },
      {
        label: 'Projects',
        href: '/studio/projects',
      },
    ],
  },
];
