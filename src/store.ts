import { createStore } from "@stencil/store";
import type { AppState } from './common/types';
import { API_CONFIG } from './common/constants';

const { state, set, onChange } = createStore<AppState>({
  loadState: {
    progress: 0,
    pageReady: false,
    states: {}
  },
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
  const updatedProgress = state.loadState.progress + 1;
  set('loadState', {
    ...state.loadState,
    progress: updatedProgress,
    states: {
      ...state.loadState.states,
      [key]: true
    }
  });
}

onChange('loadState', (loadState) => {
  state.loadState.pageReady = API_CONFIG.every((config) => loadState.states[config.endpoint] === true);
});

export {
  state,
  set
};