import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { IUseAutoCompleteStore } from '../types/storeTypes'

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
