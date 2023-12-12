import React, { useState } from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../../constants/icon'
import { useNavigate } from 'react-router-dom'
import PATH from '../../routes/routePath'
import DropDownBox from './DropDownBox'

const SearchBar = () => {
  const navigate = useNavigate() //검색어 navi props 넘기기

  return (
    <SearchBarContainer>
      <div className="searchbar">
        <input type="text" placeholder="어떤 영화를 찾아볼까요?" maxLength={20} />
        <div className="search-icon" onClick={() => navigate(PATH.SEARCH)}>
          <SearchIcon />
        </div>
        <DropDownBox
          list={['집으로...', '집에 가는 길', '집에 가고 싶다', '집집 집잇업 집집 집잇업 집집 집잇업 집집 집잇업']}
        />
      </div>
    </SearchBarContainer>
  )
}

const SearchBarContainer = styled.div`
  position: relative;
  height: 70px;
  padding: 15px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  .searchbar {
    position: relative;
    min-width: 200px;
    width: 60%;

    input {
      width: 100%;
      height: 50px;
      border: 1px solid var(--colors-green);
      border-radius: 50px;
      padding: 0 25px;
      box-sizing: border-box;
      font-size: 1rem;
      background-color: var(--colors-darkgray);
      color: var(--colors-light);

      &::placeholder {
        font-size: 0.85rem;
        color: var(--colors-green);
      }
    }

    .search-icon {
      position: absolute;
      top: 15px;
      right: 20px;
      cursor: pointer;
    }
  }
`
export default SearchBar
