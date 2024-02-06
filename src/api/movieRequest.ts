import { notify } from '../components/layout/Toast'
import axiosInstance from './axiosInstance'

const DEFAULT_OPTION = { language: 'ko-KR' }

export const getTrendingMovieList = async () => {
  return await axiosInstance
    .get(`trending/movie/day`, {
      params: { ...DEFAULT_OPTION, page: 1 }
    })
    .then((res) => {
      return res.data.results
    })
}

export const getTopRatedMovieList = async () => {
  return await axiosInstance
    .get(`movie/top_rated`, {
      params: { ...DEFAULT_OPTION, page: 1, region: 410 }
    })
    .then((res) => {
      return res.data.results
    })
}

export const getSearchingMovieList = async (query: string, page = 1) => {
  return await axiosInstance
    .get(`search/movie`, {
      params: { ...DEFAULT_OPTION, query, includes_adult: false, page }
    })
    .then((res) => {
      return res.data
    })
}
export const getMovieDetail = async (movieId: string) => {
  return await axiosInstance
    .get(`movie/${movieId}`, {
      params: { ...DEFAULT_OPTION }
    })
    .then((res) => {
      return res.data
    })
    .catch((err: object) => {
      return notify({ type: 'error', text: '영화 정보를 불러올 수 없습니다.' })
    })
}
export const getMovieCredits = async (movieId: string) => {
  return await axiosInstance
    .get(`movie/${movieId}/credits`, {
      params: { ...DEFAULT_OPTION }
    })
    .then((res) => {
      return res.data
    })
    .catch((err: object) => {
      return notify({ type: 'error', text: '영화 정보를 가져올 수 없습니다.' })
    })
}
export const getMovieSimilar = async (movieId: string) => {
  return await axiosInstance
    .get(`movie/${movieId}/similar`, {
      params: { ...DEFAULT_OPTION, page: 1 }
    })
    .then((res) => {
      return res.data.results
    })
    .catch((err: object) => {
      return alert(err)
    })
}
export const getGenresMovieList = async (with_genres: number) => {
  return await axiosInstance
    .get(`discover/movie`, {
      params: { ...DEFAULT_OPTION, page: 1, sort_by: 'popularity.desc', with_genres }
    })
    .then((res) => {
      return res.data.results
    })
    .catch((err: object) => {
      return alert(err)
    })
}
