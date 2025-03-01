import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const $host = axios.create({
  baseURL: apiBaseUrl
})

const $authHost = axios.create({
  baseURL: apiBaseUrl
})

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
  return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost
}
