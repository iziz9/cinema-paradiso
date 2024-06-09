import { create } from 'zustand'
import { IUseNotificationStore } from '../types/storeTypes'

export const useNotificationStore = create<IUseNotificationStore>((set) => ({
  permissionStatus: '',
  setPermissionStatus: (status: string) => {
    set({ permissionStatus: status })
  }
}))
