import React from 'react'
import styled from 'styled-components'
import SearchBar from '../components/search/SearchBar'
import RecommendList from '../components/recommend/RecommendList'

const MainPage = () => {
  return (
    <MainContainer>
      <SearchBar />
      <RecommendList title={'이런 영화는 어떠세요?'} />
      <RecommendList title={'오늘의 SF 추천 영화'} />
      <RecommendList title={'오늘의 로맨스 추천 영화'} />
    </MainContainer>
  )
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export default MainPage
