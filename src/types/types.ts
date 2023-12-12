import { ReactNode } from 'react'

export interface ChildrenProps {
  children: ReactNode
}

export interface IAutoCompleteLayout extends ChildrenProps {
  isFocused: boolean
}
