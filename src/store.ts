import { createStore } from "@stencil/store";
import type { AppState } from './common/types';
import { API_CONFIG } from './common/constants';

const { state, set, onChange } = createStore<AppState>({
  loadState: {},
  pageReady: false,
  about: null,
  books: null,
  caseStudies: [],
  personal: null,
  metadata: null,
  msData: null,
  lastPlayedGames: [],
  lastPlayedSong: null,
  favImgs: [],
  favImgIndex: 0
});

onChange('favImgs', (data) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  state.favImgIndex = randomIndex;
});

export const setLoadState = (key: string) => {
  set('loadState', {
    ...state.loadState,
    [key]: true
  });
}

onChange('loadState', (loadState) => {
  state.pageReady = API_CONFIG.every((config) => loadState[config.endpoint] === true);
});

export {
  state,
  set
};