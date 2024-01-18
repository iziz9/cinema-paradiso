import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../components/search/SearchBar'
import RecommendList from '../components/carousel/RecommendList'
import { getGenresMovieList, getTrendingMovieList, getTopRatedMovieList } from '../api/movieRequest'
import { RECOMMEND_LIST_DEFAULT } from '../utils/defaultValues'
import { useRecommendMovieStore } from '../store/recommendMovieStore'

const sfGenreId = 878

const MainPage = () => {
  const DropDownRef = useRef<HTMLUListElement>(null)
  const [isDropDownOpen, setisDropDownOpen] = useState<boolean>(false)
  const [trendingMovies, setTrendingMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [topRatedMovies, setTopRatedMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [sfMovies, setSfMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const { cachedRecommendMovie, setCachedRecommendMovie } = useRecommendMovieStore()

  const movieRecommendList = [
    { title: '지금 가장 인기있는 영화', movieList: trendingMovies },
    { title: '관객 평점이 가장 높은 영화', movieList: topRatedMovies },
    { title: 'SF 추천 영화', movieList: sfMovies }
  ]

  useEffect(() => {
    const getRecommendLists = async () => {
      const trendingRes = await getTrendingMovieList()
      setTrendingMovies(trendingRes)
      const topRatedRes = await getTopRatedMovieList()
      setTopRatedMovies(topRatedRes)
      const sfRes = await getGenresMovieList(sfGenreId)
      setSfMovies(sfRes)
    }
    getRecommendLists()
  }, [])

  return (
    <MainContainer>
      <SearchBar isDropDownOpen={isDropDownOpen} setIsDropDownOpen={setisDropDownOpen} dropDownRef={DropDownRef} />
      {movieRecommendList.map((list, index) => (
        <RecommendList title={list.title} movieList={list.movieList} key={index} />
      ))}
    </MainContainer>
  )
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export default MainPage
