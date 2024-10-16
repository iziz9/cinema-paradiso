import { User } from 'firebase/auth'
import { IMovieCredits, IMovieDetail, IMovieInfo } from '../types/types'

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

export interface IAllDetails {
  details?: IMovieDetail
  credits?: IMovieCredits
  similar?: IMovieInfo[]
}

export interface ICachedMovieDetail {
  [key: string]: {
    details?: IMovieDetail
    credits?: IMovieCredits
    similar?: IMovieInfo[]
  }
}

export interface IUseUserStore {
  userInfo: User
  userListId: number
  setUserInfo: (userInfo: User) => void
  setUserListId: (userListId: number) => void
  userMessagingToken: string
  setUserMessagingToken: (messagingToken: string) => void
}
export interface IUseMovieDetailStore {
  cachedMovieDetail: ICachedMovieDetail
  setCachedMovieDetail: (id: string, category: string, details: IAllDetails) => void
}

export interface IUseNotificationStore {
  permissionStatus: string
  setPermissionStatus: (status: string) => void
}
