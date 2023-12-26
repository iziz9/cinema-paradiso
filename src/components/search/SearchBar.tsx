import React, { KeyboardEvent, useEffect, useReducer, useRef, useState } from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../../constants/icon'
import { useNavigate } from 'react-router-dom'
import PATH from '../../routes/routePath'
import DropDownBox from './DropDownBox'
import useDebounce from '../../hooks/useDebounce'
import { checkInputValid } from '../../utils/InputValidation'
import { getAutoCompletionList } from '../../api/request'
import { IAutoCompleteList } from '../../types/types'
import { DEFAULT_INDEX, MAX_INDEX, MIN_INDEX, focusIndexReducer } from '../../utils/dropDownFocusing'

type SearchBarType = {
  isDropDownOpen: boolean
  setIsDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>
  dropDownRef: React.RefObject<HTMLUListElement>
}

const SearchBar = ({ isDropDownOpen, setIsDropDownOpen, dropDownRef }: SearchBarType) => {
  const navigate = useNavigate() //검색어 navi props 넘기기
  const [tempQuery, setTempQuery] = useState<string>('')
  const debouncedValue = useDebounce(tempQuery)
  const [autoCompleteList, setAutoCompleteList] = useState<IAutoCompleteList[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [focusIndex, dispatch] = useReducer(focusIndexReducer, DEFAULT_INDEX)
  // const DropDownRef = useRef<HTMLUListElement>(null)

  //마우스로도 포커스 해야됨

  useEffect(() => {
    if (debouncedValue.length === 0 || debouncedValue.trim() === '') {
      return setAutoCompleteList([])
    }
    const isValid = checkInputValid(debouncedValue)
    isValid && setSearchValue(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    const getList = async () => {
      const res = await getAutoCompletionList(searchValue)
      setAutoCompleteList(res.slice(0, MAX_INDEX))
    }
    searchValue && getList()
  }, [searchValue])

  useEffect(() => {
    const ul = dropDownRef.current
    if (ul && focusIndex < DEFAULT_INDEX) {
      dispatch({ type: 'RESET' })
    }
  }, [focusIndex])

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
          break
        case 'Enter':
          if (focusIndex >= MIN_INDEX) changeInputValue()
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
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          value={tempQuery}
          role="searchbox"
        />
        <div className="search-icon" onClick={() => navigate(PATH.SEARCH)}>
          <SearchIcon />
        </div>
        {isDropDownOpen && <DropDownBox list={autoCompleteList} focusIndex={focusIndex} ref={dropDownRef} />}
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
