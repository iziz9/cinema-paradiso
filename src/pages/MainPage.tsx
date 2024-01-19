import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../components/search/SearchBar'
import RecommendList from '../components/carousel/RecommendList'
import { getGenresMovieList, getTrendingMovieList, getTopRatedMovieList } from '../api/movieRequest'
import { RECOMMEND_LIST_DEFAULT } from '../utils/defaultValues'
import { useRecommendMovieStore } from '../store/recommendMovieStore'
import { IMovieInfo } from '../types/types'

const SF_GENRE_ID = 878
const recommendListTitle = {
  trending: '지금 가장 인기있는 영화',
  topRated: '관객 평점이 가장 높은 영화',
  sf: 'SF 추천 영화'
}

const MainPage = () => {
  const DropDownRef = useRef<HTMLUListElement>(null)
  const [isDropDownOpen, setisDropDownOpen] = useState<boolean>(false)
  const [trendingMovies, setTrendingMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [topRatedMovies, setTopRatedMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [sfMovies, setSfMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const { cachedRecommendMovie, setCachedRecommendMovie } = useRecommendMovieStore()

  const movieRecommendList = [
    { title: recommendListTitle.trending, movieList: trendingMovies },
    { title: recommendListTitle.topRated, movieList: topRatedMovies },
    { title: recommendListTitle.sf, movieList: sfMovies }
  ]

  useEffect(() => {
    const getCachedList = (title: string) => {
      if (!cachedRecommendMovie[title]) return false
      return cachedRecommendMovie[title]
    }
    const getRecommendLists = async (
      title: string,
      requestGetList: any,
      setRecommendList: React.Dispatch<React.SetStateAction<IMovieInfo[]>>,
      params?: number
    ) => {
      const cachedList = getCachedList(title)
      if (cachedList) {
        setRecommendList(cachedList)
      } else {
        const requestRes = params ? await requestGetList(params) : await requestGetList()
        setRecommendList(requestRes)
        setCachedRecommendMovie(title, requestRes)
      }
    }
    getRecommendLists(recommendListTitle.trending, getTrendingMovieList, setTrendingMovies)
    getRecommendLists(recommendListTitle.topRated, getTopRatedMovieList, setTopRatedMovies)
    getRecommendLists(recommendListTitle.sf, getGenresMovieList, setSfMovies, SF_GENRE_ID)
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
