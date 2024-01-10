import React, { useEffect, useState } from 'react'
import Chart from '../components/chart/Chart'
import styled from 'styled-components'
import RecommendList from '../components/carousel/RecommendList'
import { RECOMMEND_LIST_DEFAULT } from '../utils/defaultValues'
import { getTrendingMovieList, getTopRatedMovieList } from '../api/movieRequest'

const MyPage = () => {
  const [trendingMovies, setPopularMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [topRatedMovies, setTopRatedMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const data = ['', '']

  useEffect(() => {
    const getRecommendLists = async () => {
      const trendingRes = await getTrendingMovieList()
      setPopularMovies(trendingRes)
      const topRatedRes = await getTopRatedMovieList()
      setTopRatedMovies(topRatedRes)
    }
    // getRecommendLists()
  }, [])

  const movieRecommendList = [
    //임시, 메인페이지 중복
    { title: '지금 가장 인기있는 영화', movieList: trendingMovies },
    { title: '관객 평점이 가장 높은 영화', movieList: topRatedMovies }
  ]

  if (data.length < 1)
    //api데이터
    return (
      <MyPageContainer>
        <div className="no-result">
          <p>좋아하는 영화, 보고싶은 영화를 관심 등록 해 보세요!</p>
          <p>취향에 맞는 영화를 추천받을 수 있어요.</p>
        </div>
        {movieRecommendList.map((list, index) => (
          <RecommendList title={list.title} movieList={list.movieList} key={index} />
        ))}
      </MyPageContainer>
    )
  return (
    <MyPageContainer>
      <Chart />
      {/* {movieRecommendList.map((list, index) => (
        <RecommendList title={list.title} movieList={list.movieList} key={index} />
      ))} */}
    </MyPageContainer>
  )
}

const MyPageContainer = styled.main`
  position: relative;

  .no-result {
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
  }
`

export default MyPage
