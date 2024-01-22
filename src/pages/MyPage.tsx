import React, { useEffect, useState } from 'react'
import Chart from '../components/chart/Chart'
import styled from 'styled-components'
import RecommendList from '../components/carousel/RecommendList'
import { RECOMMEND_LIST_DEFAULT } from '../utils/defaultValues'
import { getTrendingMovieList, getTopRatedMovieList, getMyWatchList } from '../api/movieRequest'
import MyWatchList from '../components/mypage/MyWatchList'
import MyProfile from '../components/mypage/MyProfile'
import { IWatchListResponse } from '../types/types'

const MY_ACCOUNT = Number(process.env.REACT_APP_MY_ACCOUNT) //임시

const MyPage = () => {
  const [trendingMovies, setPopularMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [topRatedMovies, setTopRatedMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [myWatchList, setMyWatchList] = useState<IWatchListResponse>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  })

  useEffect(() => {
    const getWatchList = async () => {
      const watchListRes = await getMyWatchList(MY_ACCOUNT)
      setMyWatchList(watchListRes)
    }
    getWatchList()
  }, [])

  useEffect(() => {
    const getRecommendList = async () => {
      const trendingRes = await getTrendingMovieList()
      setPopularMovies(trendingRes)
      const topRatedRes = await getTopRatedMovieList()
      setTopRatedMovies(topRatedRes)
    }
    if (myWatchList.page !== 0 && myWatchList.results.length < 1) {
      getRecommendList()
    }
  }, [myWatchList])

  const movieRecommendList = [
    //임시, 메인페이지 중복, 캐싱해서 가져오기
    { title: '지금 가장 인기있는 영화', movieList: trendingMovies },
    { title: '관객 평점이 가장 높은 영화', movieList: topRatedMovies }
  ]

  if (myWatchList.total_results < 1)
    return (
      <MyPageContainer>
        <MyProfile />
        <NoResults>
          <p>좋아하는 영화, 보고싶은 영화를 관심 등록 해 보세요!</p>
          <p>취향에 맞는 영화를 추천받을 수 있어요.</p>
        </NoResults>
        {movieRecommendList.map((list, index) => (
          <RecommendList title={list.title} movieList={list.movieList} key={index} />
        ))}
      </MyPageContainer>
    )
  return (
    <MyPageContainer>
      <MyProfile />
      <Chart myWatchList={myWatchList} />
      <MyWatchList />
    </MyPageContainer>
  )
}

const MyPageContainer = styled.main`
  position: relative;
`
const NoResults = styled.div`
  background-color: var(--colors-darkgray);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 100px 0;
  margin: auto;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.3rem;

  @media (max-width: 833px) {
    font-size: 1rem;
  }
`

export default MyPage
