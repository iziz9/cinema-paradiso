import { mockedList } from '../mock/hotMovies'
import { IRecommendTitle } from '../types/types'

export const getMockedList = (type: IRecommendTitle) => {
  return mockedList[type]
}
