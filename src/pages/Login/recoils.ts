import { atom } from 'recoil';

export const errorSnackbarMessageAtom = atom<string | undefined>({
  key: 'errorSnackbarMessage',
  default: undefined,
});
