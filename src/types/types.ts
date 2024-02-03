import { ReactNode, Ref } from 'react'

export interface ChildrenProps {
  children: ReactNode
}
export interface IAutoCompleteLayout extends ChildrenProps {
  isFocused: boolean
}
export interface IDropDownItem {
  title: string
  isFocused: boolean
  searchAutoCompleteValue: (query: string) => void
}
export interface IMovieInfo {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}
export interface IMovieItemProps {
  movieInfo: IMovieInfo
  onClick: () => void
}
export interface IRecommendCarousel {
  title: string
  movieList: IMovieInfo[]
  isLoading: boolean
}
export interface IDropDownBox {
  list: IMovieInfo[]
  focusIndex: number
  searchAutoCompleteValue: (query: string) => void
  ref: Ref<HTMLUListElement>
}
export interface ISearchBar {
  isDropDownOpen: boolean
  setIsDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>
  dropDownRef: React.RefObject<HTMLUListElement>
}
export interface IResultList {
  resultList: IMovieInfo[]
}
export interface IMovieDetail {
  adult: boolean
  backdrop_path: string
  genres: { id: number; name: string }[]
  id: number
  imdb_id: string
  originam_title: string
  overview: string
  popularity: number
  poster_path: string
  production_countries: { iso_3166_1: string; name: string }[]
  release_date: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  vote_average: number
  vote_count: number
}
export interface IMovieCredits {
  id: number
  cast: IMovieCreditsCast[]
  crew: ImovieCreditsCrew[]
}
export interface IMovieCreditsCast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
  job: string
}
export interface ImovieCreditsCrew {
  adult: boolean
  credit_id: string
  department: string
  gender: number
  id: number
  job: string
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
}
export interface IGetRecommendLists {
  title: string
  //eslint-disable-next-line
  requestGetList: any
  setRecommendList: React.Dispatch<React.SetStateAction<IMovieInfo[]>>
  params?: string
}
export interface IPagination {
  totalPages: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}
export interface ITotalResults {
  totalCount: number
  totalPages: number
}
export interface IChartData {
  [key: number]: number
}
export interface IChartDataArr {
  name: string
  value: number
}
export interface IRenderCustomizedLabel {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}
export interface IHasPageResponse {
  page: number
  results: IMovieInfo[]
  total_pages: number
  total_results: number
}
//lists api
export interface INewWatchListResponse {
  page: number
  results: INewWatchListResult[]
  total_pages: number
  total_results: number
}
export interface INewWatchListResult {
  description: string
  favorite_count: number
  id: number
  item_count: number
  iso_639_1: string
  list_type: string
  name: string
  poster_path: string | null
}
export interface ICreateWatchListResponse {
  success: boolean
  status_code: number
  status_message: string // "Success."
  list_id: number
}
