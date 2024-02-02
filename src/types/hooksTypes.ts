import { IMovieInfo, ITotalResults } from './types'

export interface IInfinityScrollProps {
  //eslint-disable-next-line
  request: (page: number) => Promise<any> | IMovieInfo[]
  payload: string
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setMovieList: React.Dispatch<React.SetStateAction<IMovieInfo[]>>
  setTotalResults: React.Dispatch<React.SetStateAction<ITotalResults>>
}
