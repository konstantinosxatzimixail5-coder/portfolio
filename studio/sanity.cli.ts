import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'kc-portfolio',
  deployment: {
    autoUpdates: true,
    appId: 'twmmyakgd0evq0l1aic8w0vc',
  },
});
