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

export const useRecommendMovieStore = create(
  persist(
    (set, get) => ({
      cachedMovieDetail: {},
      setCachedMovieDetail: (title, detail) => {
        set({ cachedMovieDetail: { ...get().cachedMovieDetail, [title]: detail } })
      }
    }),
    {
      name: 'movie-detail',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: IUseMovieDetailStore) => ({ cachedMovieDatail: state.cachedMovieDetail })
    }
  )
)
