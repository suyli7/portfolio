export const state = () => ({
  caseStudies: [],
  intro: {},
  about: {},
  games: {},
  isDoneFetching: false
})

export const mutations = {
  SET_CASE_STUDIES(state, data) {
    state.caseStudies = data;
  },
  SET_INTRO_CONTENT(state, data){
    state.intro = data
  },
  SET_ABOUT_CONTENT(state, data){
    state.about = data
  },
  SET_GAMES_CONTENT(state, data){
    state.games = data
  },
  SET_IS_DONE_FETCHING(state, data){
    state.isDoneFetching = data
  }
}
export const actions = {
  async nuxtClientInit({
    commit
  }, app) {
    const csDoc = await app.$prismic.api.query(
      app.$prismic.predicates.at('document.type', 'case_study'), {
        orderings: '[my.case_study.order]'
      }
    );
    const introDoc = await app.$prismic.api.getSingle('intro');
    const aboutDoc = await app.$prismic.api.getSingle('about');
    const gamesDoc = await app.$prismic.api.getSingle('games');

    commit('SET_CASE_STUDIES', csDoc.results.map(item => ({
      ...item.data,
      ref: item.uid
    })));
    commit('SET_INTRO_CONTENT', introDoc.data);
    commit('SET_ABOUT_CONTENT', aboutDoc.data);
    commit('SET_GAMES_CONTENT', gamesDoc.data);
    commit('SET_IS_DONE_FETCHING', true);
  }
}