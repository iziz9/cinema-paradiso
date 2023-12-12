import React from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../../constants/icon'

const DropDownItem = ({ title }: { title: string }) => {
  return (
    <DropDownItemContainer>
      <div>
        <SearchIcon />
      </div>
      <span>{title}</span>
    </DropDownItemContainer>
  )
}

const DropDownItemContainer = styled.li`
  display: flex;
  gap: 12px;
  padding: 5px 0;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`
export default DropDownItem
