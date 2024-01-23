import React, { useEffect, useState } from 'react'
import Chart from '../components/chart/Chart'
import styled from 'styled-components'
import RecommendList from '../components/carousel/RecommendList'
import { RECOMMEND_LIST_DEFAULT } from '../utils/defaultValues'
import { getTrendingMovieList, getTopRatedMovieList, getMyWatchList } from '../api/movieRequest'
import MyProfile from '../components/mypage/MyProfile'
import { IMovieInfo } from '../types/types'
import useInfinityScroll from '../hooks/useInfinityScroll'
import Loading from '../components/common/Loading'
import MovieItem from '../components/common/MovieItem'
import { useNavigate } from 'react-router-dom'
import MovieListStyle from '../components/style/MovieListStyle'
import MovieItemStyle from '../components/style/MovieItemStyle'

const MY_ACCOUNT = Number(process.env.REACT_APP_MY_ACCOUNT) //임시

const MyPage = () => {
  const navigate = useNavigate()
  const [trendingMovies, setPopularMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [topRatedMovies, setTopRatedMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [page, setPage] = useState<number>(1)
  const [myWatchList, setMyWatchList] = useState<IMovieInfo[]>([])
  const { isLoading, totalResults, getListData, ref } = useInfinityScroll({
    request: getMyWatchList,
    payload: MY_ACCOUNT + '',
    page,
    setPage,
    setMovieList: setMyWatchList
  })

  useEffect(() => {
    if (!isLoading) getListData(MY_ACCOUNT + '', page)
  }, [page])

  // useEffect(() => {
  //   const getRecommendList = async () => {
  //     const trendingRes = await getTrendingMovieList()
  //     setPopularMovies(trendingRes)
  //     const topRatedRes = await getTopRatedMovieList()
  //     setTopRatedMovies(topRatedRes)
  //   }
  //   if (page !== 0 && myWatchList.length < 1) {
  //     getRecommendList()
  //   }
  // }, [myWatchList])

  const movieRecommendList = [
    //임시, 메인페이지 중복, 캐싱해서 가져오기
    { title: '지금 가장 인기있는 영화', movieList: trendingMovies },
    { title: '관객 평점이 가장 높은 영화', movieList: topRatedMovies }
  ]

  if (totalResults.totalCount < 1)
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
  else
    return (
      <MyPageContainer>
        <MyProfile />
        <Chart myWatchList={myWatchList} totalResults={totalResults} />
        <MovieListStyle>
          {myWatchList?.map((movie) => (
            <MovieItemStyle key={movie.id}>
              <MovieItem movieInfo={movie} onClick={() => navigate(`/detail/${movie.id}`, { state: movie.id })} />
            </MovieItemStyle>
          ))}
        </MovieListStyle>
        {!isLoading && <div ref={ref}></div>}
        {isLoading && <Loading />}
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
