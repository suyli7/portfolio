import { createStore } from "@stencil/store";
import type {
  AboutDataModel,
  CaseStudyDataModel,
  LastPlayedGame,
  LastPlayedSong,
  MsData,
  PerosnalDataModel
} from '../common/api-data';

interface AppState {
  about?: AboutDataModel;
  caseStudies?: Array<CaseStudyDataModel>;
  personal?: PerosnalDataModel;
  msData?: MsData;
  lastPlayedGames?: Array<LastPlayedGame>;
  lastPlayedSong?: LastPlayedSong;

}

const { state, onChange } = createStore<AppState>({
  about: null,
  caseStudies: [],
  personal: null,
});

onChange('about', value => {
  state.about = value;
});

onChange('caseStudies', value => {
  state.caseStudies = value;
});

onChange('msData', value => {
  state.msData = value;
});

onChange('lastPlayedGames', value => {
  state.lastPlayedGames = value;
});

onChange('lastPlayedSong', value => {
  state.lastPlayedSong = value;
});

onChange('personal', value => {
  state.personal = value;
});

export default state;