let origin = window.location.origin.toLowerCase();
let getApiBaseUrl = "";
if(origin.includes("localhost")){
  getApiBaseUrl = "https://purattu-api.onrender.com";
}else{
  getApiBaseUrl = "https://purattu-api.onrender.com";
}
export const environment = {
  ApiBaseUrl : getApiBaseUrl,
  Environment: 'Development',
  production: false
};
