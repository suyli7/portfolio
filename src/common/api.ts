import { set, setLoadState } from '../store';
import { API_CONFIG } from './constants';

export const fetchApiData = async () => {
  API_CONFIG.forEach((config) => {
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
