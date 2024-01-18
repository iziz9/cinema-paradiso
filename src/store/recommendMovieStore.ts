import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IMovieInfo } from '../types/types'

export interface ICachedRecommendMovie {
  [key: string]: IMovieInfo[]
}
interface IUseRecommendMovieStore {
  cachedRecommendMovie: ICachedRecommendMovie
  setCachedRecommendMovie: (title: string, list: IMovieInfo[]) => void
}
const STORAGE_NAME = 'movie-recommend'
const DEFAULT_CACHED_VALUE = localStorage.getItem(STORAGE_NAME)

export const useRecommendMovieStore = create(
  persist(
    (set, get) => ({
      cachedRecommendMovie: (DEFAULT_CACHED_VALUE && JSON.parse(DEFAULT_CACHED_VALUE).state) || {},
      setCachedRecommendMovie: (title, list) => {
        set({ cachedRecommendMovie: { ...get().cachedRecommendMovie, [title]: list } })
      }
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state: IUseRecommendMovieStore) => state.cachedRecommendMovie
    }
  )
)
