import { createClient } from '@prismicio/client';
import { Env } from '@stencil/core';

type PrismicFetchCallback = (data: any) => void;

const client = createClient(Env.PRISMIC_ENTRY_POINT, { accessToken: Env.PRISMIC_ACCESS_TOKEN });

export const getAboutData = async (cb: PrismicFetchCallback) => {
    const response = await client.getSingle('about');
    cb(response.data);
}

export const getWorkData = async (cb?: PrismicFetchCallback) => {
    const response = await client.getAllByType('case_study', {
        orderings: {
          field: 'my.case_study.order'
        },
    });
    cb(response.map((v) => v.data));
}