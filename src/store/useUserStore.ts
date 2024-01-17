import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: {}
  // fetch: async (token:string) => {
  //   const path = `https:abcd/users/${token}`
  //   const response = await fetch(path)
  //   set({ user: await response.json() })
  // }
}))

// export const clearUserStore = () => {
//   useUserStore.persist.clearStorage()
// }
