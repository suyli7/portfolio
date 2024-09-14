import { createClient } from '@prismicio/client';
import { Env } from '@stencil/core';

type PrismicFetchCallback = (data: any) => void;

const client = createClient(Env.PRISMIC_ENTRY_POINT, { accessToken: Env.PRISMIC_ACCESS_TOKEN });

export const getAboutData = async (cb: PrismicFetchCallback) => {
    const response = await client.getSingle('about');
    cb(response.data);
} 