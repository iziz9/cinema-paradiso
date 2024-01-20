import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IUseRecommendMovieStore } from '../types/storeTypes'

export const useRecommendMovieStore = create(
  persist(
    (set, get) => ({
      cachedRecommendMovie: {},
      setCachedRecommendMovie: (title, list) => {
        set({ cachedRecommendMovie: { ...get().cachedRecommendMovie, [title]: list } })
      }
    }),
    {
      name: 'movie-recommend',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state: IUseRecommendMovieStore) => ({ cachedRecommendMovie: state.cachedRecommendMovie })
    }
  )
)
