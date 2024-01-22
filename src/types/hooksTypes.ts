import { IMovieInfo } from './types'

export interface IInfinityScrollProps {
  //eslint-disable-next-line
  request: (payload: string, page: number) => Promise<any>
  payload: string
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setMovieList: React.Dispatch<React.SetStateAction<IMovieInfo[]>>
}
export interface ITotalResults {
  totalCount: number
  totalPages: number
}
