export interface Settings {
	apiProtocol?: 'http' | 'https';
	apiHost?: string;
	jsonHost?: string;
	apiPort?: number;
	apiEndPoint?: string;
	language?: string;
	requestTimeout?: number;
	cookieHeader?: boolean;
	allowOffline?: boolean;
}
