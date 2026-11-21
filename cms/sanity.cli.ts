import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'id2x5id1',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  server: {
    port: 3001,
  },
  studioHost: 'aquaholic-houseboats',
});
