import siteImage from './siteImage.js';
import richText from './richText.js';
import embeddedVideo from './embeddedVideo.js';

import siteSettings from './siteSettings.js';
import homePage from './homePage.js';
import reelPage from './reelPage.js';
import specPage from './specPage.js';

import work from './work.js';
import pipeline from './pipeline.js';
import specBrand from './specBrand.js';
import shelfCard from './shelfCard.js';

export const schemaTypes = [
  // shared building blocks
  siteImage,
  richText,
  embeddedVideo,
  // one of each
  siteSettings,
  homePage,
  reelPage,
  specPage,
  // many of each
  work,
  pipeline,
  specBrand,
  shelfCard,
];

// The four documents there is only ever one of. Listed here so the desk can
// open them directly and so nobody is offered a "create another" button that
// would produce a second home page the site would silently ignore.
export const singletons = ['siteSettings', 'homePage', 'reelPage', 'specPage'];
