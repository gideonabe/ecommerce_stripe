import { defineConfig } from 'sanity';
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schema } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'ecommerce',

  projectId: 'pumgsg9s', 
  dataset: 'production', 

  apiVersion: '2024-12-23',
  // basePath: "/studio", // Optional: Customize the studio path
  plugins: [structureTool(), visionTool()], // Add any Sanity plugins here
  schema: schema
});
