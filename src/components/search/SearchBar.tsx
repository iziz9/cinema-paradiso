import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../../constants/icon'
import { useNavigate } from 'react-router-dom'
import PATH from '../../routes/routePath'
import DropDownBox from './DropDownBox'
import useDebounce from '../../hooks/useDebounce'
import { checkInputValid } from '../../utils/InputValidation'

const SearchBar = () => {
  const navigate = useNavigate() //검색어 navi props 넘기기
  const [tempQuery, setTempQuery] = useState<string>('')
  const debouncedValue = useDebounce(tempQuery)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState<number>(-1)
  const [recommendList, setRecommendList] = useState<[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  const setSearchValueHandler = (query: string) => setSearchValue(query)

  useEffect(() => {
    if (debouncedValue.length === 0 || debouncedValue.trim() === '') {
      return setRecommendList([])
    }
    const isValid = checkInputValid(debouncedValue)
    isValid && setSearchValueHandler(debouncedValue)
  }, [debouncedValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempQuery(e.target.value)
    setFocusIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!recommendList) return
    // const isLastIndex = focusIndex + 1 === recommendList.length

    switch (e.key) {
      case 'ArrowDown':
        if (focusIndex === recommendList.length - 1) return setFocusIndex(0)
        setFocusIndex((prev: number) => prev + 1)
        break
      case 'ArrowUp':
        if (focusIndex === 0) return false
        setFocusIndex((prev: number) => prev - 1)
        break
      case 'Escape':
        setFocusIndex(-1)
        setSearchValueHandler('')
        break
      case 'Enter':
        if (focusIndex === -1) return false
        setFocusIndex(0)
      // setTempQuery(recommendList[focusIndex])
    }
  }

  return (
    <SearchBarContainer>
      <div className="searchbar">
        <input
          type="text"
          placeholder="어떤 영화를 찾아볼까요?"
          maxLength={20}
          onFocus={() => setIsDropDownOpen(true)}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          role="searchbox"
        />
        <div className="search-icon" onClick={() => navigate(PATH.SEARCH)}>
          <SearchIcon />
        </div>
        {isDropDownOpen && (
          <DropDownBox
            list={['집으로...', '집에 가는 길', '집에 가고 싶다', '집집 집잇업 집집 집잇업 집집 집잇업 집집 집잇업']}
          />
        )}
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
