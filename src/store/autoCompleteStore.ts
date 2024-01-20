import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { IUseAutoCompleteStore } from '../types/storeTypes'

export const useAutoCompleteStore = create(
  devtools(
    persist(
      (set, get) => ({
        cachedAutoComplete: {},
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
        name: 'auto-complete',
        storage: createJSONStorage(() => localStorage),
        partialize: (state: IUseAutoCompleteStore) => ({ cachedAutoComplete: state.cachedAutoComplete })
      }
    )
  )
)
