import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IMovieCredits, IMovieDetail, IMovieInfo } from '../types/types'

export interface IAllDetails {
  details: IMovieDetail
  credits: IMovieCredits
  similar: IMovieInfo[]
}
export interface ICachedMovieDetail {
  [key: string]: IAllDetails
}
export interface IUseMovieDetailStore {
  cachedMovieDetail: ICachedMovieDetail
  setCachedMovieDetail: (id: string, allDetails: IAllDetails) => void
}

export const useMovieDetailStore = create(
  persist(
    (set, get) => ({
      cachedMovieDetail: {},
      setCachedMovieDetail: (id, allDetails) => {
        set({ cachedMovieDetail: { ...get().cachedMovieDetail, [id]: allDetails } })
      }
    }),
    {
      name: 'movie-detail',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: IUseMovieDetailStore) => ({ cachedMovieDetail: state.cachedMovieDetail })
    }
  )
)
