import React, { KeyboardEvent, useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../../constants/icon'
import { useNavigate } from 'react-router-dom'
import DropDownBox from './DropDownBox'
import useDebounce from '../../hooks/useDebounce'
import { getSearchingMovieList } from '../../api/movieRequest'
import { IMovieInfo, ISearchBar } from '../../types/types'
import { DEFAULT_INDEX, MAX_INDEX, MIN_INDEX, focusIndexReducer } from '../../utils/dropDownFocusing'
import { useSearchValueStore } from '../../store/searchValueStore'
import { useAutoCompleteStore } from '../../store/autoCompleteStore'

const SearchBar = ({ isDropDownOpen, setIsDropDownOpen, dropDownRef }: ISearchBar) => {
  const navigate = useNavigate()
  const { searchValue, setSearchValue } = useSearchValueStore()
  const debouncedSearchValue = useDebounce(searchValue)
  const [autoCompleteList, setAutoCompleteList] = useState<IMovieInfo[]>([])
  const [focusIndex, dispatch] = useReducer(focusIndexReducer, DEFAULT_INDEX)
  const { cachedAutoComplete, setCachedAutoComplete, checkCachedAutoComplete } = useAutoCompleteStore()

  const currentTime = Date.now()
  const EXPIRE_TIME = 7 * 60 * 1000

  const checkInputValid = (query: string) => {
    if (query.trim().length === 0) return false
    return true
  }

  useEffect(() => {
    if (debouncedSearchValue.length === 0 || debouncedSearchValue.trim() === '') {
      return setAutoCompleteList([])
    }

    const getAutoCompleteList = async () => {
      const cachedData = checkCachedAutoComplete(debouncedSearchValue)
      if (cachedData) return setAutoCompleteList(cachedAutoComplete[debouncedSearchValue].data)

      const res = await getSearchingMovieList(debouncedSearchValue)
      setCachedAutoComplete(debouncedSearchValue, {
        data: res.results.slice(0, MAX_INDEX),
        expire: currentTime + EXPIRE_TIME
      })
      setAutoCompleteList(res.results.slice(0, MAX_INDEX))
    }

    const isValid = checkInputValid(debouncedSearchValue)
    isValid && getAutoCompleteList()
    //eslint-disable-next-line
  }, [debouncedSearchValue, setCachedAutoComplete])

  useEffect(() => {
    const ul = dropDownRef.current
    if (ul && focusIndex < DEFAULT_INDEX) {
      dispatch({ type: 'RESET' })
    }
  }, [focusIndex, dropDownRef])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !isDropDownOpen && setIsDropDownOpen(true)
    setSearchValue(e.target.value)
    dispatch({ type: 'RESET' })
  }

  const resetInputValueAndIndex = (query: string) => {
    setSearchValue(query)
    dispatch({ type: 'RESET' })
    return true
  }

  const searchAutoCompleteValue = (query: string) => {
    const isResetCompleted = resetInputValueAndIndex(query)
    isResetCompleted && goToSearchPage(query)
  }

  const changeInputValueToRecommend = () => {
    const focusedListItem = dropDownRef.current?.children[focusIndex]
    const query = focusedListItem?.textContent
    if (query && query.length > 0) {
      searchAutoCompleteValue(query)
    }
  }

  const goToSearchPage = (query: string) => {
    const isValid = checkInputValid(query)
    if (!isValid) return alert('검색어를 입력해주세요.')
    setIsDropDownOpen(false)
    navigate(`/search/${query}`, { state: query })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (autoCompleteList.length === 0) {
      switch (e.key) {
        case 'Enter':
          goToSearchPage(searchValue)
          break
        case 'Escape':
          dispatch({ type: 'RESET' })
          e.currentTarget.blur()
          setIsDropDownOpen(false)
          break
      }
    }

    if (!e.nativeEvent.isComposing && autoCompleteList.length > 0) {
      const isLastIndex = focusIndex + 1 === autoCompleteList.length
      switch (e.key) {
        case 'Enter':
          if (focusIndex > MIN_INDEX) {
            changeInputValueToRecommend()
          } else if (focusIndex <= MIN_INDEX) goToSearchPage(searchValue)
          break
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
      }
    }
  }

  const handleBlurDropDown = () => {
    setTimeout(() => {
      setIsDropDownOpen(false)
    }, 200)
  }

  return (
    <SearchBarContainer onBlur={() => handleBlurDropDown()}>
      <div className="searchbar">
        <input
          type="text"
          placeholder="어떤 영화를 찾아볼까요?"
          maxLength={20}
          onFocus={() => setIsDropDownOpen(true)}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          value={searchValue}
          role="searchbox"
          required
        />
        <div className="search-icon" onClick={() => goToSearchPage(searchValue)} data-testid="searchbutton">
          <SearchIcon />
        </div>
        {isDropDownOpen && (
          <DropDownBox
            list={autoCompleteList}
            focusIndex={focusIndex}
            searchAutoCompleteValue={searchAutoCompleteValue}
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
