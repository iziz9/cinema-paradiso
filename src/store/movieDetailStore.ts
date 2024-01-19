import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IMovieCredits, IMovieDetail } from '../types/types'

export interface ICachedMovieDetail {
  [key: string]: IMovieDetail
}
export interface IUseMovieDetailStore {
  cachedMovieDetail: ICachedMovieDetail
  setCachedMovieDetail: (title: string, detail: IMovieDetail) => void
  //, credit: IMovieCredits, similar: IMovieDetail => detail안에 넣기
}

const STORAGE_NAME = 'movie-detail'
const DEFAULT_CACHED_VALUE = localStorage.getItem(STORAGE_NAME)

export const useRecommendMovieStore = create(
  persist(
    (set, get) => ({
      cachedMovieDetail: (DEFAULT_CACHED_VALUE && JSON.parse(DEFAULT_CACHED_VALUE).state) || {},
      setCachedMovieDetail: (title, detail) => {
        set({ cachedMovieDetail: { ...get().cachedMovieDetail, [title]: detail } })
      }
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => localStorage),
      partialize: (state: IUseMovieDetailStore) => state.cachedMovieDetail
    }
  )
)
