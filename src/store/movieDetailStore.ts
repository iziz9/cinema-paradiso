import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IUseMovieDetailStore } from '../types/storeTypes'
export const useMovieDetailStore = create(
  persist(
    (set, get) => ({
      cachedMovieDetail: {},
      setCachedMovieDetail: (id, category, details) => {
        set((state) => ({
          cachedMovieDetail: {
            ...get().cachedMovieDetail,
            [id]: {
              ...state.cachedMovieDetail[id],
              [category]: details
            }
          }
        }))
      }
    }),
    {
      name: 'movie-detail',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: IUseMovieDetailStore) => ({ cachedMovieDetail: state.cachedMovieDetail })
    }
  )
)
