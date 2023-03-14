import { Settings } from "src/app/global-shared/models/settings";


const settings: Settings = {
  apiProtocol: 'https',
	apiHost: 'api.wkaya.co/api/v1'
};
export const environment = {
	production: false,
	settings,
	api_server_url: '',
  firebaseConfig : {
    apiKey: "AIzaSyDm0ojC8JX9OCTVW0HIMu36s2zxfeI6BmQ",
    authDomain: "wkaya-dev.firebaseapp.com",
    projectId: "wkaya-dev",
    storageBucket: "wkaya-dev.appspot.com",
    messagingSenderId: "292651052814",
    appId: "1:292651052814:web:6e0423526beaaa00a3f15f",
    measurementId: "G-FH6QPH8X0J"
  }
};
