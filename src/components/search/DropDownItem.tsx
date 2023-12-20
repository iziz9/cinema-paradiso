import React from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../../constants/icon'
import { IDropDownItem } from '../../types/types'

const DropDownItem = ({ title, isFocused }: IDropDownItem) => {
  return (
    <DropDownItemContainer isfocused={isFocused.toString()}>
      <div className="icon">
        <SearchIcon />
      </div>
      <span>{title}</span>
    </DropDownItemContainer>
  )
}

const DropDownItemContainer = styled.li<{ isfocused: string }>`
  display: flex;
  gap: 12px;
  padding: 5px 0;
  align-items: center;
  color: ${(props) => (props['isfocused'] === 'true' ? 'var(--colors-green)' : 'var(--colors-light)')};
  font-weight: ${(props) => (props['isfocused'] === 'true' ? '700' : '400')};

  .icon {
    width: 16px;
    height: 16px;
    svg {
      width: 16px;
      height: 16px;
    }
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`
export default DropDownItem
