import React, { KeyboardEvent, useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../../constants/icon'
import { useNavigate } from 'react-router-dom'
import DropDownBox from './DropDownBox'
import useDebounce from '../../hooks/useDebounce'
import { checkInputValid } from '../../utils/InputValidation'
import { getSearchingMovieList } from '../../api/request'
import { IAutoCompleteList, ISearchBar } from '../../types/types'
import { DEFAULT_INDEX, MAX_INDEX, MIN_INDEX, focusIndexReducer } from '../../utils/dropDownFocusing'

const SearchBar = ({ isDropDownOpen, setIsDropDownOpen, dropDownRef }: ISearchBar) => {
  const navigate = useNavigate()
  const [tempQuery, setTempQuery] = useState<string>('')
  const debouncedValue = useDebounce(tempQuery)
  const [autoCompleteList, setAutoCompleteList] = useState<IAutoCompleteList[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [focusIndex, dispatch] = useReducer(focusIndexReducer, DEFAULT_INDEX)

  const goToSearchPage = () => {
    if (!searchValue) {
      return alert('검색어를 입력해주세요.')
    }
    navigate(`search/${searchValue}`)
  }
  // searchValue 문자열 지운 후 공백문자만 입력하면 공백으로 인식 못하는 오류-수정하기
  useEffect(() => {
    if (debouncedValue.length === 0 || debouncedValue.trim() === '') {
      return setAutoCompleteList([])
    }
    const isValid = checkInputValid(debouncedValue)
    isValid && setSearchValue(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    const getList = async () => {
      const res = await getSearchingMovieList(searchValue)
      setAutoCompleteList(res.slice(0, MAX_INDEX))
    }
    searchValue && getList()
  }, [searchValue])

  useEffect(() => {
    const ul = dropDownRef.current
    if (ul && focusIndex < DEFAULT_INDEX) {
      dispatch({ type: 'RESET' })
    }
  }, [focusIndex, dropDownRef])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempQuery(e.target.value)
    dispatch({ type: 'RESET' })
  }

  const resetQueryAndIndex = (query: string) => {
    setTempQuery(query)
    dispatch({ type: 'RESET' })
  }

  const changeInputValue = () => {
    const focusedList = dropDownRef.current?.children[focusIndex]
    const query = focusedList?.textContent
    if (query && query.length > 0) {
      resetQueryAndIndex(query)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (autoCompleteList.length === 0 && e.key === 'Escape') {
      return setIsDropDownOpen(false)
    }
    if (!e.nativeEvent.isComposing && autoCompleteList.length > 0) {
      const isLastIndex = focusIndex + 1 === autoCompleteList.length
      switch (e.key) {
        case 'ArrowDown':
          if (!isLastIndex) {
            dispatch({ type: 'INCREMENT' })
          }
          break
        case 'ArrowUp':
          dispatch({ type: 'DECREMENT' })
          break
        case 'Escape':
          dispatch({ type: 'RESET' })
          e.currentTarget.blur()
          setIsDropDownOpen(false)
          break
        case 'Enter':
          if (!searchValue.trim().length) goToSearchPage()
          else if (focusIndex >= MIN_INDEX) changeInputValue()
          else if (focusIndex < MIN_INDEX) goToSearchPage()
          break
      }
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
          // onBlur={() => setIsDropDownOpen(false)}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          value={tempQuery}
          role="searchbox"
          required
        />
        <div className="search-icon" onClick={() => goToSearchPage()} data-testid="searchbutton">
          <SearchIcon />
        </div>
        {isDropDownOpen && (
          <DropDownBox
            list={autoCompleteList}
            focusIndex={focusIndex}
            resetQueryAndIndex={resetQueryAndIndex}
            ref={dropDownRef}
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
