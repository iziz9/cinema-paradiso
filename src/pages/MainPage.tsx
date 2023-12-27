import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../components/search/SearchBar'
import RecommendList from '../components/recommend/RecommendList'
import { getPopularMovieList } from '../api/request'

const MainPage = () => {
  const DropDownRef = useRef<HTMLUListElement>(null)
  const [isDropDownOpen, setisDropDownOpen] = useState<boolean>(false)

  useEffect(() => {
    // getPopularMovieList()
  }, [])

  return (
    <MainContainer>
      <SearchBar isDropDownOpen={isDropDownOpen} setIsDropDownOpen={setisDropDownOpen} dropDownRef={DropDownRef} />
      <RecommendList title={'지금 가장 인기있는 영화'} />
      <RecommendList title={'오늘의 SF 추천 영화'} />
      <RecommendList title={'오늘의 로맨스 추천 영화'} />
      <RecommendList title={'관객 평점이 가장 높은 영화'} />
    </MainContainer>
  )
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export default MainPage
