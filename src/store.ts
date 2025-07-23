import { createStore } from "@stencil/store";
import type {
  AboutDataModel,
  CaseStudyDataModel,
  BookShelf,
  LastPlayedGame,
  LastPlayedSong,
  MsData,
  PersonalDataModel,
  AssetImg,
} from '../common/api-data';

interface AppState {
  about?: AboutDataModel;
  books?: BookShelf;
  caseStudies?: Array<CaseStudyDataModel>;
  personal?: PersonalDataModel;
  msData?: MsData;
  lastPlayedGames?: Array<LastPlayedGame>;
  lastPlayedSong?: LastPlayedSong;
  favImgs?: Array<AssetImg>;
  favImgIndex?: number;
}

const { state, set, onChange } = createStore<AppState>({
  about: null,
  books: null,
  caseStudies: [],
  personal: null,
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