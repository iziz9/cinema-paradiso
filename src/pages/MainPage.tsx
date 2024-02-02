import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import RecommendList from '../components/carousel/RecommendList'
import { getGenresMovieList, getTrendingMovieList, getTopRatedMovieList } from '../api/movieRequest'
import { RECOMMEND_LIST_DEFAULT, recommendListTitle } from '../constants/defaultValues'
import { useRecommendMovieStore } from '../store/recommendMovieStore'
import { IMovieInfo } from '../types/types'

const SF_GENRE_ID = 878

const MainPage = () => {
  const [trendingMovies, setTrendingMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [topRatedMovies, setTopRatedMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [sfMovies, setSfMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const { cachedRecommendMovie, setCachedRecommendMovie } = useRecommendMovieStore()
  const [isLoading, setIsLoading] = useState(true)

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
    const getLists = async () => {
      setIsLoading(true)
      getRecommendLists(recommendListTitle.trending, getTrendingMovieList, setTrendingMovies)
      getRecommendLists(recommendListTitle.topRated, getTopRatedMovieList, setTopRatedMovies)
      getRecommendLists(recommendListTitle.sf, getGenresMovieList, setSfMovies, SF_GENRE_ID)
      setIsLoading(false)
    }
    getLists()
    //eslint-disable-next-line
  }, [])

  return (
    <MainContainer>
      <div className="banner">
        <img src="/banner.webp" alt="banner" />
      </div>
      {movieRecommendList.map((list, index) => (
        <RecommendList title={list.title} movieList={list.movieList} isLoading={isLoading} key={index} />
      ))}
    </MainContainer>
  )
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  .banner {
    width: 100%;
    img {
      width: 100%;
      aspect-ratio: 1/0.352;
      object-fit: cover;
    }
  }
`

export default MainPage
