import { atom } from 'recoil';

import { isClientSide } from '@/utils';

const REGISTER_TOKEN_KEY = 'registerToken';

export const registerTokenAtom = atom<string | null>({
  key: 'registerTokenAtom',
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      if (isClientSide()) {
        const token = sessionStorage.getItem(REGISTER_TOKEN_KEY);
        if (token !== null) {
          setSelf(token);
        }
      }

      onSet((token, _, isReset) => {
        if (isReset || token === null) {
          sessionStorage.removeItem(REGISTER_TOKEN_KEY);
          return;
        }
        sessionStorage.setItem(REGISTER_TOKEN_KEY, token);
      });
    },
  ],
});
