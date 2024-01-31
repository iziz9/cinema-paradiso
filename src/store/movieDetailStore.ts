import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IAllDetails, ICachedMovieDetail } from '../types/storeTypes'

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
