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
