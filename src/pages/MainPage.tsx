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

  // useEffect(() => {
  //   const handleDropDownClose = (e: { target: any }) => {
  //     // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
  //     if (DropDownRef.current && isDropDownOpen && !DropDownRef.current.contains(e.target)) {
  //       setisDropDownOpen(false)
  //     }
  //   }
  //   document.addEventListener('click', handleDropDownClose)

  //   return () => document.removeEventListener('click', handleDropDownClose)
  // }, [isDropDownOpen])

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
