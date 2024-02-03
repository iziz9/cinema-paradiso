import { IMovieInfo, ITotalResults } from './types'

export interface IInfinityScrollProps {
  //eslint-disable-next-line
  request: (payload: number, page: number) => Promise<any> | IMovieInfo[]
  payload: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setMovieList: React.Dispatch<React.SetStateAction<IMovieInfo[]>>
  setTotalResults: React.Dispatch<React.SetStateAction<ITotalResults>>
}
