import {createClient} from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'pumgsg9s',
  dataset: 'production',
  apiVersion: '2024-12-23',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source); 