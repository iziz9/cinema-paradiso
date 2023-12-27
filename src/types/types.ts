import { ReactNode, Ref } from 'react'

export interface ChildrenProps {
  children: ReactNode
}
export interface IAutoCompleteLayout extends ChildrenProps {
  isFocused: boolean
}
export interface IDropDownItem {
  title: string
  isFocused: boolean
  resetQueryAndIndex: (query: string) => void
}
export interface IAutoCompleteList {
  adult: boolean
  backdrop_path: string
  first_air_date: string
  genre_ids: number[]
  id: number
  media_type: string
  name: string
  title: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}
export interface IDropDownBox {
  list: IAutoCompleteList[]
  focusIndex: number
  resetQueryAndIndex: (query: string) => void
  ref: Ref<HTMLUListElement>
}
export interface ISearchBar {
  isDropDownOpen: boolean
  setIsDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>
  dropDownRef: React.RefObject<HTMLUListElement>
}
