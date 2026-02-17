import { set, setLoadState } from '../store';
import { API_CONFIG } from './constants';

let bootstrapPromise: Promise<void> | null = null;

export function fetchApiData() {
    if (!bootstrapPromise) {
        bootstrapPromise = loadData();
    }

    return bootstrapPromise;
}

async function loadData() {
    const requests = API_CONFIG.map(async (config) => {
        try {
            const res = await fetch(`/api/${config.endpoint}`);
            const data = await res.json();

            set(config.state, data);
        } catch (err) {
            console.log('fetchApiData Error: ', err);
        } finally {
            setLoadState(config.endpoint);
        }
    });

    await Promise.all(requests);
}