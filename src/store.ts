import { createStore } from "@stencil/store";
import type {
  AboutDataModel,
  CaseStudyDataModel,
  BookShelf,
  LastPlayedGame,
  LastPlayedSong,
  Metadata,
  MsData,
  PersonalDataModel,
  AssetImg,
} from '../common/api-data';

export interface AppState {
  about?: AboutDataModel;
  books?: BookShelf;
  caseStudies?: CaseStudyDataModel[];
  personal?: PersonalDataModel;
  metadata: Metadata;
  msData?: MsData;
  lastPlayedGames?: LastPlayedGame[];
  lastPlayedSong?: LastPlayedSong;
  favImgs?: AssetImg[];
  favImgIndex?: number;
}

const { state, set, onChange } = createStore<AppState>({
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

export {
  state,
  set
};