import { Config } from '@stencil/core';
import * as dotenv from 'dotenv';

dotenv.config();

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  env: {
    PRISMIC_ENTRY_POINT: process.env.PRISMIC_ENTRY_POINT,
    PRISMIC_ACCESS_TOKEN: process.env.PRISMIC_ACCESS_TOKEN,
    MS_CHAR_NAME: process.env.MS_CHAR_NAME,
  },
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
  ]
};
