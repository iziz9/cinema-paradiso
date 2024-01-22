import axiosInstance from './axiosInstance'

const defaultOption = { language: 'ko-KR' }

export const getTrendingMovieList = async () => {
  return await axiosInstance
    .get(`trending/movie/day`, {
      params: { ...defaultOption, page: 1 }
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
    .catch((err: any) => {
      console.log(err)
      return alert(err)
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
export const getMovieDetail = async (movieId: string) => {
  return await axiosInstance
    .get(`movie/${movieId}`, {
      params: { ...defaultOption }
    })
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((err: any) => {
      console.log(err)
      return alert(err)
    })
}
export const getMovieCredits = async (movieId: string) => {
  return await axiosInstance
    .get(`movie/${movieId}/credits`, {
      params: { ...defaultOption }
    })
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((err: any) => {
      console.log(err)
      return alert(err)
    })
}
export const getMovieSimilar = async (movieId: string) => {
  return await axiosInstance
    .get(`movie/${movieId}/similar`, {
      params: { ...defaultOption, page: 1 }
    })
    .then((res) => {
      console.log(res.data.results)
      return res.data.results
    })
    .catch((err: any) => {
      console.log(err)
      return 'dpfjskTdma'
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
export const getMyWatchList = async (account_id: string, page = 1) => {
  // accountID 스토리지 저장
  return await axiosInstance
    .get(`account/${account_id}/watchlist/movies`, {
      params: { ...defaultOption, page }
    })
    .then((res) => {
      console.log(res.data)
      return res.data
    })
}
