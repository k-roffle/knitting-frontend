import { atom } from 'recoil';

import { DESIGN_MENU, DESIGN_MENU_TYPE } from './types';

export const selectedTabAtom = atom<DESIGN_MENU_TYPE>({
  key: 'selectedTab',
  default: DESIGN_MENU.CREATED_DESIGN,
});
