import { atomWithStorage } from 'jotai/utils';

// 存储每个菜单组的展开状态
export const menuOpenStateAtom = atomWithStorage<Record<string, boolean>>(
  'sidebar-menu-open-state',
  {},
);
