import axiosInstance from './axiosInstance'

const defaultOption = { language: 'ko-KR' }

export const getPopularMovieList = async () => {
  return await axiosInstance
    .get(`movie/popular`, {
      params: { ...defaultOption, page: 1, region: 410 }
    })
    .then((res) => {
      console.log(res.data.results)
      return res.data.results
    })
}

export const getTopRatedMovieList = async () => {
  return await axiosInstance
    .get(`movie/top_rated`, {
      params: { ...defaultOption, page: 1, region: 410 }
    })
    .then((res) => {
      console.log(res.data.results)
      return res.data.results
    })
}

export const getSearchingMovieList = async (query: string, page = 1) => {
  return await axiosInstance
    .get(`search/movie`, {
      params: { ...defaultOption, query, includes_adult: false, page }
    })
    .then((res) => {
      console.log(res.data.results)
      return res.data
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
export const getMovieSimilar = async (movieId: number) => {
  return await axiosInstance
    .get(`movie/${movieId}/similar`, {
      params: { ...defaultOption, page: 1 }
    })
    .then((res) => {
      console.log(res.data.results)
      return res.data.results
    })
}
export const getGenresMovieList = async (with_genres: number) => {
  return await axiosInstance
    .get(`discover/movie`, {
      params: { ...defaultOption, page: 1, sort_by: 'popularity.desc', with_genres }
    })
    .then((res) => {
      console.log(res.data.results)
      return res.data.results
    })
}
