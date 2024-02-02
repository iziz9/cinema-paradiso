import { ADMIN_ID } from '../constants/defaultValues'
import axiosInstance from './axiosInstance'

const defaultOption = { language: 'ko-KR' }

export const getTrendingMovieList = async () => {
  return await axiosInstance
    .get(`trending/movie/day`, {
      params: { ...defaultOption, page: 1 }
    })
    .then((res) => {
      return res.data.results
    })
    .catch((err: object) => {
      return alert(err)
    })
}

export const getTopRatedMovieList = async () => {
  return await axiosInstance
    .get(`movie/top_rated`, {
      params: { ...defaultOption, page: 1, region: 410 }
    })
    .then((res) => {
      return res.data.results
    })
    .catch((err: object) => {
      return alert(err)
    })
}

export const getSearchingMovieList = async (query: string, page = 1) => {
  return await axiosInstance
    .get(`search/movie`, {
      params: { ...defaultOption, query, includes_adult: false, page }
    })
    .then((res) => {
      return res.data
    })
    .catch((err: object) => {
      return alert(err)
    })
}
export const getMovieDetail = async (movieId: string) => {
  return await axiosInstance
    .get(`movie/${movieId}`, {
      params: { ...defaultOption }
    })
    .then((res) => {
      return res.data
    })
    .catch((err: object) => {
      return alert(err)
    })
}
export const getMovieCredits = async (movieId: string) => {
  return await axiosInstance
    .get(`movie/${movieId}/credits`, {
      params: { ...defaultOption }
    })
    .then((res) => {
      return res.data
    })
    .catch((err: object) => {
      return alert(err)
    })
}
export const getMovieSimilar = async (movieId: string) => {
  return await axiosInstance
    .get(`movie/${movieId}/similar`, {
      params: { ...defaultOption, page: 1 }
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
      params: { ...defaultOption, page: 1, sort_by: 'popularity.desc', with_genres }
    })
    .then((res) => {
      return res.data.results
    })
    .catch((err: object) => {
      return alert(err)
    })
}

export const getMyWatchList = async (page = 1) => {
  return await axiosInstance
    .get(`account/${ADMIN_ID}/watchlist/movies`, {
      params: { ...defaultOption, page }
    })
    .then((res) => {
      return res.data
    })
    .catch((err: object) => {
      return alert(err)
    })
}
export const postToMyWatchList = async (media_id: string, watchlist: boolean) => {
  return await axiosInstance
    .post(`account/${ADMIN_ID}/watchlis`, {
      media_type: 'movie',
      media_id,
      watchlist
    })
    .then((res) => {
      return res.data
    })
    .catch((err: object) => {
      return alert(err)
    })
}
export const getAccountStates = async (movie_id: string) => {
  return await axiosInstance
    .get(`movie/${movie_id}/account_states`, {
      params: { ...defaultOption }
    })
    .then((res) => {
      return res.data
    })
    .catch((err: object) => {
      return alert(err)
    })
}
