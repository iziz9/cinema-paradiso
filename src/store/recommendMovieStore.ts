import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IMovieInfo } from '../types/types'

export const useRecommendMovieStore = create(
  persist(
    (set, get) => ({
      recommendMovie: [],
      setRecommendList: (list: IMovieInfo[]) => set({ recommendMovie: list }),
      getRecommendList: (list: IMovieInfo[]) => set({ recommendMovie: list })
    }),
    {
      name: 'movie-recommend',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

interface ICachedRecommendItem {
  title: string
  movies: IMovieInfo[]
}
// {title : '', movies: []}

// 세션스토리지, expire필요없음
