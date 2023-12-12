import React from 'react'
import styled from 'styled-components'
import DropDownItem from './DropDownItem'

const DropDownBox = ({ list }: { list: string[] }) => {
  return list.length ? (
    <DropDownContainer>
      {list.map((item) => (
        <DropDownItem title={item} key={item} />
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
  background-color: #242424;
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

export default DropDownBox
