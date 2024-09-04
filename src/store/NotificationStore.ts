import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IUseNotificationStore } from '../types/storeTypes'

export const useNotificationStore = create(
  persist(
    (set) => ({
      permissionStatus: '',
      setPermissionStatus: (status: string) => {
        set({ permissionStatus: status })
      }
    }),
    {
      name: 'permission-status',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: IUseNotificationStore) => ({ permissionStatus: state.permissionStatus })
    }
  )
)
