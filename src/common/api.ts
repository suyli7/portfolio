import { set, setLoadState, type AppState } from '../store';

const API_CONFIG: Array<{ endpoint: string; state: keyof AppState }> = [
  {
    endpoint: 'prismic/about',
    state: 'about'
  },
  {
    endpoint: 'prismic/personal',
    state: 'personal'
  },
  {
    endpoint: 'prismic/favimgs',
    state: 'favImgs'
  },
  {
    endpoint: 'metadata',
    state: 'metadata'
  },
  // {
  //   endpoint: 'maplestory',
  //   state: 'msData'
  // },
  {
    endpoint: 'books',
    state: 'books'
  },
  {
    endpoint: 'music',
    state: 'lastPlayedSong'
  },
  {
    endpoint: 'games',
    state: 'lastPlayedGames'
  },
];

export const fetchApiData = async (endpoints?: string[]) => {
  (endpoints || API_CONFIG).forEach((config) => {
    fetch(`/api/${config.endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        set(config.state, data);
        setLoadState(config.endpoint);
      })
      .catch((err) => {
        console.log('fetchApiData Error: ', err);
        setLoadState(config.endpoint);
      })
  });
}
