import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IUseUserStore } from '../types/storeTypes'
import { User } from 'firebase/auth'

export const useUserStore = create(
  persist(
    (set) => ({
      userInfo: {} as User,
      setUserInfo: (userInfo: User) => set({ userInfo }),
      userListId: 0,
      setUserListId: (userListId: number) => set({ userListId }),
      userMessagingToken: '',
      setUserMessagingToken: (userMessagingToken: string) => set({ userMessagingToken })
    }),
    {
      name: 'user-info',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: IUseUserStore) => ({
        userInfo: state.userInfo,
        userListId: state.userListId,
        userMessagingToken: state.userMessagingToken
      })
    }
  )
)
