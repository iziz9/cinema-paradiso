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

interface Action {
  type: 'INDEX_INCREMENT' | 'INDEX_DECREMENT' | 'INDEX_RESET'
}
export const focusIndexReducer = (focusIndex: number, action: Action) => {
  switch (action.type) {
    case 'INDEX_INCREMENT':
      return focusIndex + 1
    case 'INDEX_DECREMENT':
      return focusIndex - 1
    case 'INDEX_RESET':
      return (focusIndex = -1)
    default:
      return focusIndex
  }
}
const MIN_INDEX = 0
const MAX_INDEX = 10
export const DEFAULT_INDEX = -1

const SearchBar = () => {
  const navigate = useNavigate() //검색어 navi props 넘기기
  const [tempQuery, setTempQuery] = useState<string>('')
  const debouncedValue = useDebounce(tempQuery)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [autoCompleteList, setAutoCompleteList] = useState<IAutoCompleteList[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [focusIndex, dispatch] = useReducer(focusIndexReducer, -1)
  const setSearchValueHandler = (query: string) => setSearchValue(query)
  const DropDownRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (debouncedValue.length === 0 || debouncedValue.trim() === '') {
      return setAutoCompleteList([])
    }
    const isValid = checkInputValid(debouncedValue)
    isValid && setSearchValueHandler(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    const getList = async () => {
      const res = await getAutoCompletionList(searchValue)
      setAutoCompleteList(res)
    }
    searchValue && getList()
  }, [searchValue])

  useEffect(() => {
    const ul = DropDownRef.current
    if (ul) {
      if (focusIndex < -1) {
        // 리스트의 포커스를 벗어났을 때 다시 포커스 할 수 있도록 인덱스 리셋
        dispatch({ type: 'INDEX_RESET' })
      } else if (focusIndex >= MAX_INDEX) {
        const hasScrollbar = ul.scrollHeight > ul.clientHeight
        if (hasScrollbar) {
          const focusedItem = ul.children[focusIndex]
          focusedItem.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
  }, [focusIndex])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempQuery(e.target.value)
    dispatch({ type: 'INDEX_RESET' })
  }

  const setValAndResetIdx = (value: string) => {
    setSearchValue(value)
    dispatch({ type: 'INDEX_RESET' })
  }

  const changeInputValue = () => {
    const focusedList = DropDownRef.current?.children[focusIndex + 1]
    const textValue = focusedList?.textContent
    if (textValue && textValue.length > 0) {
      setValAndResetIdx(textValue)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing && autoCompleteList.length > 0) {
      const isLastIndex = focusIndex + 1 === autoCompleteList.length

      switch (e.key) {
        case 'ArrowDown':
          if (!isLastIndex) {
            dispatch({ type: 'INDEX_INCREMENT' })
          }
          break
        case 'ArrowUp':
          dispatch({ type: 'INDEX_DECREMENT' })
          break
        case 'Escape':
          dispatch({ type: 'INDEX_RESET' })
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
          role="searchbox"
        />
        <div className="search-icon" onClick={() => navigate(PATH.SEARCH)}>
          <SearchIcon />
        </div>
        {isDropDownOpen && <DropDownBox list={autoCompleteList} focusIndex={focusIndex} ref={DropDownRef} />}
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
