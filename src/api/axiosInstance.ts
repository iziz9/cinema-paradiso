import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + ACCESS_TOKEN
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    console.info('calling api')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
