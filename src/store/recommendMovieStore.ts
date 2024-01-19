import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IUseRecommendMovieStore } from '../types/storeTypes'

const STORAGE_NAME = 'movie-recommend'
const DEFAULT_CACHED_VALUE = sessionStorage.getItem(STORAGE_NAME) //session

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
