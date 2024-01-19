import { IMovieInfo } from '../types/types'

export interface ICachedRecommendMovie {
  [key: string]: IMovieInfo[]
}
export interface IUseRecommendMovieStore {
  cachedRecommendMovie: ICachedRecommendMovie
  setCachedRecommendMovie: (title: string, list: IMovieInfo[]) => void
}

export interface ICachedAutoComplete {
  [key: string]: ICachedAutoCompleteData
}
export interface ICachedAutoCompleteData {
  data: IMovieInfo[]
  expire: number
}
export interface IUseAutoCompleteStore {
  cachedAutoComplete: ICachedAutoComplete
  setCachedAutoComplete: (searchValue: string, list: ICachedAutoCompleteData) => void
  checkCachedAutoComplete: (searchValue: string) => IMovieInfo[] | boolean
  deleteCachedAutoComplete: (searchValue: string) => void
}
