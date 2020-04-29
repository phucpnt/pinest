import { WEBUI_BASE_URL, WEBUI_URL_SUFFIX } from './files';

// export const NEWTAB_URL = `${WEBUI_BASE_URL}_invest${WEBUI_URL_SUFFIX}`;
export const NEWTAB_URL = `http://localhost:10786/_invest.html`;

export const defaultTabOptions: chrome.tabs.CreateProperties = {
  url: NEWTAB_URL,
  active: true,
};
