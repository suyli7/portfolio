import { createStore } from "@stencil/store";
import type { AboutDataModel, CaseStudyDataModel } from '../common/api-data';

interface AppState {
  about?: AboutDataModel;
  caseStudies?: Array<CaseStudyDataModel>;
}

const { state, onChange } = createStore<AppState>({
  about: null,
  caseStudies: []
});

onChange('about', value => {
  state.about = value;
});

onChange('caseStudies', value => {
  state.caseStudies = value;
});

export default state;