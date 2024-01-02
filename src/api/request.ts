import axiosInstance from './axiosInstance'

const defaultOption = { language: 'ko-KR' }

export const getPopularMovieList = async () => {
  return await axiosInstance
    .get(`movie/popular`, {
      params: { ...defaultOption, page: 1 }
    })
    .then((res) => {
      console.log(res.data.results)
      return res.data.results
    })
}

export const getTopRatedMovieList = async () => {
  return await axiosInstance
    .get(`discover/movie`, {
      params: { ...defaultOption, page: 1 }
    })
    .then((res) => {
      console.log(res.data.results)
      return res.data.results
    })
}

export const getSearchingMovieList = async (query: string, page = 1) => {
  return await axiosInstance
    .get(`search/multi?query=${query}&include_adult=true`, {
      params: { ...defaultOption, page }
    })
    .then((res) => {
      console.log(res.data.results)
      return res.data.results
    })
}
export const getMovieDetail = async (movieId: number) => {
  return await axiosInstance
    .get(`movie/${movieId}`, {
      params: { ...defaultOption }
    })
    .then((res) => {
      console.log(res.data)
      return res.data
    })
}
export const getMovieCredits = async (movieId: number) => {
  return await axiosInstance
    .get(`movie/${movieId}/credits`, {
      params: { ...defaultOption }
    })
    .then((res) => {
      console.log(res.data)
      return res.data
    })
}
