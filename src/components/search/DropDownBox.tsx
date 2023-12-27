import React, { Ref, forwardRef } from 'react'
import styled from 'styled-components'
import DropDownItem from './DropDownItem'
import { IDropDownBox } from '../../types/types'

const DropDownBox = ({ list, focusIndex, resetQueryAndIndex }: IDropDownBox, ref: Ref<HTMLUListElement>) => {
  return list.length ? (
    <DropDownContainer role="combobox" ref={ref}>
      {list.map((item, index) => (
        <DropDownItem
          title={item.title || item.name}
          isFocused={focusIndex === index}
          resetQueryAndIndex={resetQueryAndIndex}
          key={item.id}
        />
      ))}
    </DropDownContainer>
  ) : (
    <DropDownContainer>
      <li className="no-result">검색 결과가 없습니다.</li>
    </DropDownContainer>
  )
}

const DropDownContainer = styled.ul`
  position: absolute;
  width: 100%;
  min-height: 100px;
  z-index: 30;
  margin-top: 3px;
  background-color: var(--colors-darkgray);
  color: var(--colors-light);
  border: 1px solid var(--colors-green);
  border-radius: 20px;
  padding: 15px 25px;
  box-sizing: border-box;

  .no-result {
    margin-top: 20px;
    text-align: center;
  }
`

export default forwardRef(DropDownBox)
