import React, { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import SearchBar from '../components/search/SearchBar'

const SearchPage = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)'
  })
  const DropDownRef = useRef<HTMLUListElement>(null)
  const [isDropDownOpen, setisDropDownOpen] = useState<boolean>(false)
  return (
    <SearchPageContainer>
      <SearchBar isDropDownOpen={isDropDownOpen} setIsDropDownOpen={setisDropDownOpen} dropDownRef={DropDownRef} />
      {isMobile ? (
        <MobileInfinityScroll>
          <div>리스트</div>
        </MobileInfinityScroll>
      ) : (
        <PCPageNation>
          <div>리스트</div>
        </PCPageNation>
      )}
    </SearchPageContainer>
  )
}

const SearchPageContainer = styled.main`
  position: relative;
`
const PCPageNation = styled.div`
  position: relative;
`
const MobileInfinityScroll = styled.div``

export default SearchPage
