import { useEffect, useState } from 'react'
import { useRecommendMovieStore } from '../../store/recommendMovieStore'
import { RECOMMEND_LIST_DEFAULT, recommendListTitle } from '../../constants/defaultValues'
import { IMovieInfo } from '../../types/types'
import { getTopRatedMovieList, getTrendingMovieList } from '../../api/movieRequest'
import styled from 'styled-components'
import RecommendCarousel from '../carousel/RecommendCarousel'
import { mockedTopRatedList, mockedTrendingList } from '../../mock/hotMovies'

const HotMoviesList = () => {
  const [trendingMovies, setTrendingMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [topRatedMovies, setTopRatedMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const { cachedRecommendMovie, setCachedRecommendMovie } = useRecommendMovieStore()
  const [isLoading, setIsLoading] = useState(true)

  const movieRecommendList = [
    { title: recommendListTitle.trending, movieList: trendingMovies },
    { title: recommendListTitle.topRated, movieList: topRatedMovies }
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
      if (cachedList) return setRecommendList(cachedList)
      else {
        try {
          const requestRes = params ? await requestGetList(params) : await requestGetList()
          setRecommendList(requestRes)
          setCachedRecommendMovie(title, requestRes)
        } catch (err) {
          setTrendingMovies(mockedTrendingList)
          setTopRatedMovies(mockedTopRatedList)
        }
      }
    }

    const getLists = () => {
      setIsLoading(true)
      getRecommendLists(recommendListTitle.trending, getTrendingMovieList, setTrendingMovies)
      getRecommendLists(recommendListTitle.topRated, getTopRatedMovieList, setTopRatedMovies)
      setIsLoading(false)
    }
    getLists()
    //eslint-disable-next-line
  }, [])

  return (
    <Container>
      {movieRecommendList.map((list, index) => (
        <RecommendCarousel title={list.title} movieList={list.movieList} isLoading={isLoading} key={index} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

export default HotMoviesList
