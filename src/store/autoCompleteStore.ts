import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { IMovieInfo } from '../types/types'

interface IUseAutoCompleteItem {
  searchValue: string
  data: IMovieInfo[]
  expire: number
}

interface IUseAutoCompleteStore {
  cachedAutoComplete: IUseAutoCompleteItem[] //배열아니구 객체로 저장해야됨...
  setCachedAutoComplete: (list: IUseAutoCompleteItem[]) => void
}

export const useAutoCompleteStore = create(
  devtools(
    persist(
      (set, get) => ({
        cachedAutoComplete: [],
        setCachedAutoComplete: (list: IUseAutoCompleteItem[]) => {
          // if (get().cachedAutoComplete)
          //   return null //get으로 먼저 불러와서 저장된 값 있고 expire 안 지났다면 업데이트 안함, api요청할때 사용
          set({ cachedAutoComplete: [...get().cachedAutoComplete].concat(list) })
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
