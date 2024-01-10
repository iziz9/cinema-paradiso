import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { IMovieInfo } from '../types/types'

interface ICachedAutoComplete {
  [key: string]: ICachedAutoCompleteData
}
interface ICachedAutoCompleteData {
  data: IMovieInfo[]
  expire: number
}
interface IUseAutoCompleteStore {
  cachedAutoComplete: ICachedAutoComplete //배열아니구 객체로 저장해야됨...
  setCachedAutoComplete: (searchValue: string, list: ICachedAutoCompleteData) => void
}

export const useAutoCompleteStore = create(
  devtools(
    persist(
      (set, get) => ({
        cachedAutoComplete: {},
        setCachedAutoComplete: (searchValue: string, list: ICachedAutoCompleteData) => {
          set({ cachedAutoComplete: { ...get().cachedAutoComplete, [searchValue]: list } })
        }
      }),
      {
        name: 'auto-complete',
        storage: createJSONStorage(() => localStorage),
        partialize: (state: IUseAutoCompleteStore) => state.cachedAutoComplete
      }
    )
  )
)

// const storageExample = {
//   key: `auto-complete-${searchValue}`,
//   value: {
//     data: [{}, {}, {}],
//     expire: currentTime + EXPIRE_TIME
//   }
// }

// export const CachingData = ({ searchValue, recommendList }) => {
//   const expireAddedList = {
//     data: recommendList,
//     expire: currentTime + EXPIRE_TIME
//   }
//   const jsonData = JSON.stringify(expireAddedList)
//   localStorage.setItem(searchValue, jsonData)
// }

// const checkIsCacheExpired = (searchValue: string) => {
//   const parsedData = parsingStorageItem(searchValue)

//   if (parsedData.expire <= currentTime) {
//     localStorage.removeItem(searchValue)
//     return true
//   }

//   return false
// }
