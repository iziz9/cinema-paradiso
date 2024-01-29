import { useEffect, useState } from 'react'
import Chart from '../components/chart/Chart'
import styled from 'styled-components'
import RecommendList from '../components/carousel/RecommendList'
import { RECOMMEND_LIST_DEFAULT, recommendListTitle } from '../constants/defaultValues'
import { getTrendingMovieList, getTopRatedMovieList, getMyWatchList } from '../api/movieRequest'
import MyProfile from '../components/mypage/MyProfile'
import { IMovieInfo, ITotalResults } from '../types/types'
import useInfinityScroll from '../hooks/useInfinityScroll'
import Loading from '../components/common/Loading'
import MovieItem from '../components/common/MovieItem'
import { useNavigate } from 'react-router-dom'
import MovieListStyle from '../components/style/MovieListStyle'
import MovieItemStyle from '../components/style/MovieItemStyle'
import ResultCountStyle from '../components/style/ResultCountStyle'
import { useRecommendMovieStore } from '../store/recommendMovieStore'

const MY_ACCOUNT = String(process.env.REACT_APP_MY_ACCOUNT) //임시

const MyPage = () => {
  const navigate = useNavigate()
  const [trendingMovies, setTrendingMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [topRatedMovies, setTopRatedMovies] = useState(RECOMMEND_LIST_DEFAULT)
  const [page, setPage] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<ITotalResults>({
    totalCount: 0,
    totalPages: 0
  })
  const [myWatchList, setMyWatchList] = useState<IMovieInfo[]>([])
  const [allMyWatchList, setAllMyWatchList] = useState<IMovieInfo[]>([])
  const { cachedRecommendMovie, setCachedRecommendMovie } = useRecommendMovieStore()
  const { isLoading, getListData, ref } = useInfinityScroll({
    request: getSavedWatchList,
    payload: MY_ACCOUNT,
    page,
    setPage,
    setMovieList: setMyWatchList,
    setTotalResults
  })
  const movieRecommendList = [
    { title: recommendListTitle.trending, movieList: trendingMovies },
    { title: recommendListTitle.topRated, movieList: topRatedMovies }
  ]

  function getSavedWatchList(payload: string, page: number) {
    if (page === 1) {
      return getMyWatchList(payload, page)
    } else {
      return getMyWatchList(payload, page)
      // return watchListForChart.slice(page * 10 + 1, page * 20 + 1) // 안됨
    }
  }

  useEffect(() => {
    getListData(MY_ACCOUNT, page)
  }, [page, getListData])

  useEffect(() => {
    const getAllPagesForChart = async () => {
      for (let i = 2; i <= totalResults.totalPages; i += 1) {
        const res = await getMyWatchList(MY_ACCOUNT, i)
        setAllMyWatchList((prev) => [...prev, ...res.results])
      }
    }
    if (totalResults.totalPages > 1 && page === 1) {
      getAllPagesForChart()
    }
  }, [totalResults, page])

  useEffect(() => {
    if (page === 1 && myWatchList.length) setAllMyWatchList(myWatchList)

    const getCachedList = (title: string) => {
      if (!cachedRecommendMovie[title]) return false
      return cachedRecommendMovie[title]
    }
    const getRecommendLists = async (
      title: string,
      //eslint-disable-next-line
      requestGetList: any,
      setRecommendList: React.Dispatch<React.SetStateAction<IMovieInfo[]>>
    ) => {
      const cachedList = getCachedList(title)
      if (cachedList) {
        setRecommendList(cachedList)
      } else {
        const requestRes = await requestGetList()
        setRecommendList(requestRes)
        setCachedRecommendMovie(title, requestRes)
      }
    }

    if (myWatchList.length < 1) {
      getRecommendLists(recommendListTitle.trending, getTrendingMovieList, setTrendingMovies)
      getRecommendLists(recommendListTitle.topRated, getTopRatedMovieList, setTopRatedMovies)
    }
    //eslint-disable-next-line
  }, [myWatchList])

  if (totalResults.totalCount < 1)
    return (
      <MyPageContainer>
        <MyProfile />
        <NoResults>
          <p>좋아하는 영화, 보고싶은 영화를 관심 등록 해 보세요!</p>
          <p>취향에 맞는 영화를 추천받을 수 있어요.</p>
        </NoResults>
        {movieRecommendList.map((list) => (
          <RecommendList title={list.title} movieList={list.movieList} isLoading={isLoading} key={list.title} />
        ))}
      </MyPageContainer>
    )
  else
    return (
      <MyPageContainer>
        <MyProfile />
        <Chart watchList={allMyWatchList} totalResults={totalResults} />
        <ResultCountStyle>나의 관심 목록 ({totalResults.totalCount})</ResultCountStyle>
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
