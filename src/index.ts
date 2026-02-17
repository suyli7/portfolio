import { createRouter } from 'stencil-router-v2';
import { fetchApiData } from './common/api';

fetchApiData();

export { Components, JSX } from './components';

export const Router = createRouter();