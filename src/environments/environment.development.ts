let origin = window.location.origin.toLowerCase();
let getApiBaseUrl = "";
if(origin.includes("localhost")){
  getApiBaseUrl = "http://localhost:3000";
  // getApiBaseUrl = "https://purattu-api.onrender.com";
}else{
  getApiBaseUrl = "https://purattu-api.onrender.com";
}
export const environment = {
  ApiBaseUrl : getApiBaseUrl,
  Environment: 'Development',
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyBwIaYb3qJSH0oHMRnjadTTmj3VeQtqeBc",
    authDomain: "purattu.firebaseapp.com",
    projectId: "purattu",
    storageBucket: "purattu.appspot.com",
    messagingSenderId: "105120315533",
    appId: "1:105120315533:web:a36a67b110462f1dfecac4",
    measurementId: "G-R4DKK93TZC"
  }
};
