import React from 'react'
import styled from 'styled-components'
import SearchBar from '../components/search/SearchBar'

const MainPage = () => {
  return (
    <MainContainer>
      <SearchBar />
    </MainContainer>
  )
}

const MainContainer = styled.main`
  height: 900px;
`

export default MainPage
