import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { IMovieInfo } from '../types/types'

export interface ICachedAutoComplete {
  [key: string]: ICachedAutoCompleteData
}
export interface ICachedAutoCompleteData {
  data: IMovieInfo[]
  expire: number
}
interface IUseAutoCompleteStore {
  cachedAutoComplete: ICachedAutoComplete
  setCachedAutoComplete: (searchValue: string, list: ICachedAutoCompleteData) => void
  checkCachedAutoComplete: (searchValue: string) => IMovieInfo[] | boolean
  deleteCachedAutoComplete: (searchValue: string) => void
}

const STORAGE_NAME = 'auto-complete'
const DEFAULT_CACHED_VALUE = localStorage.getItem(STORAGE_NAME)

export const useAutoCompleteStore = create(
  devtools(
    persist(
      (set, get) => ({
        cachedAutoComplete: (DEFAULT_CACHED_VALUE && JSON.parse(DEFAULT_CACHED_VALUE).state) || {},
        setCachedAutoComplete: (searchValue, list) => {
          set({ cachedAutoComplete: { ...get().cachedAutoComplete, [searchValue]: list } })
        },
        checkCachedAutoComplete: (searchValue) => {
          const cachedList = get().cachedAutoComplete
          const currentTime = Date.now()
          if (cachedList[searchValue] && cachedList[searchValue].expire < currentTime) {
            get().deleteCachedAutoComplete(searchValue)
          }
          if (!cachedList[searchValue]) return false

          return true
        },
        deleteCachedAutoComplete: (searchValue) => {
          const cachedList = get().cachedAutoComplete
          delete cachedList[searchValue]
        }
      }),
      {
        name: STORAGE_NAME,
        storage: createJSONStorage(() => localStorage),
        partialize: (state: IUseAutoCompleteStore) => state.cachedAutoComplete
      }
    )
  )
)
