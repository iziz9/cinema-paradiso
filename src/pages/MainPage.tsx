import React from 'react'
import styled from 'styled-components'
import SearchBar from '../components/search/SearchBar'
import RecommendList from '../components/search/RecommendList'

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
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .favorite {
    width: 90%;
    margin: 25px auto;
    background-color: #96969645;
    display: flex;
    justify-content: center;

    img {
      width: 200px;
      height: auto;
    }
  }
`

export default MainPage
