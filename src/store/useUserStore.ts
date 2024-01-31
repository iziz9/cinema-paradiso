import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IUseUserStore } from '../types/storeTypes'
import { User } from 'firebase/auth'

export const useUserStore = create(
  persist(
    (set) => ({
      userInfo: {} as User,
      setUserInfo: (userInfo: User) => set({ userInfo })
    }),
    {
      name: 'user-info',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: IUseUserStore) => ({ userInfo: state.userInfo })
    }
  )
)

export const clearUserStore = () => {
  useUserStore.persist.clearStorage()
}
