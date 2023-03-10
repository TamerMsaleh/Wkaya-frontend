import { Settings } from "src/app/global-shared/models/settings";

const settings: Settings = {
  apiProtocol: 'https',
	apiHost: 'api.wkaya.co/api/v1'
};
export const environment = {
	production: true,
	settings,
  api_server_url:''
};
