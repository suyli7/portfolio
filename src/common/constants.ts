import type { AppState } from './types';

export const API_CONFIG: Array<{ endpoint: string; state: keyof AppState }> = [
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
    {
        endpoint: 'nasa',
        state: 'apod'
    },
    {
        endpoint: 'music',
        state: 'lastPlayedSong'
    },
    {
        endpoint: 'hobbies/books',
        state: 'books'
    },
    {
        endpoint: 'hobbies/lastPlayedGames',
        state: 'lastPlayedGames'
    },
];

export const TOTAL_TASKS_COUNT = API_CONFIG.length;