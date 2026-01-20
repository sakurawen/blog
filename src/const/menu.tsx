import { Folder, LayoutDashboard, PencilLine } from 'lucide-react';

export interface Group {
  label: string
  icon?: React.ReactNode
  children: Array<Menu>
}
export interface Menu {
  label: string
  href: string
  icon?: React.ReactNode
}
export const menus: Array<Group> = [
  {
    label: 'Platform',
    children: [
      {
        label: 'Dashboard',
        icon: <LayoutDashboard />,
        href: '/studio',
      },
    ],
  },
  {
    label: 'Resource',
    children: [
      {
        label: 'Posts',
        icon: <PencilLine />,
        href: '/studio/posts',
      },
      {
        label: 'Projects',
        href: '/studio/projects',
        icon: <Folder />,
      },
    ],
  },
];
