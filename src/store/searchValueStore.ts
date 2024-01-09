import { create } from 'zustand'

interface IUseSearchValueStore {
  searchValue: string
  setSearchValue: (query: string) => void
}

export const useSearchValueStore = create<IUseSearchValueStore>((set) => ({
  searchValue: '',
  setSearchValue: (query) => set({ searchValue: query })
}))
