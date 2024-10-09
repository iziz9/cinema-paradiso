import { useEffect, useState } from 'react'
import Chart from '../components/chart/Chart'
import styled from 'styled-components'
import RecommendCarousel from '../components/carousel/RecommendCarousel'
import MyProfile from '../components/mypage/MyProfile'
import { IMovieInfo, ITotalResults } from '../types/types'
import useInfinityScroll from '../hooks/useInfinityScroll'
import Loading from '../components/common/Loading'
import MovieItem from '../components/common/MovieItem'
import { useNavigate } from 'react-router-dom'
import MovieListStyle from '../components/style/MovieListStyle'
import MovieItemStyle from '../components/style/MovieItemStyle'
import ResultCountStyle from '../components/style/ResultCountStyle'
import { getAllPageDatas } from '../utils/getAllPageDatas'
import { getPersonalList } from '../api/watchListRequest'
import { useUserStore } from '../store/userStore'

const MyPage = () => {
  const navigate = useNavigate()
  const [favoriteGenreCode, setFavoriteGenreCode] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<ITotalResults>({
    totalCount: 0,
    totalPages: 0
  })
  const [myWatchList, setMyWatchList] = useState<IMovieInfo[]>([])
  const [allMyWatchList, setAllMyWatchList] = useState<IMovieInfo[]>([])
  const { userListId } = useUserStore()
  const { isLoading, getListData, ref } = useInfinityScroll({
    request: getPersonalList,
    payload: userListId,
    page,
    setPage,
    setMovieList: setMyWatchList,
    setTotalResults
  })

  useEffect(() => {
    if (userListId) getListData(userListId, page)
  }, [page, getListData, userListId])

  useEffect(() => {
    if (!userListId) return
    if (totalResults.totalPages > 1 && page === 1) {
      getAllPageDatas({
        request: getPersonalList,
        totalPages: totalResults.totalPages,
        listId: userListId,
        setAllDataList: setAllMyWatchList
      })
    }
  }, [totalResults, page, userListId])

  useEffect(() => {
    if (page === 1 && myWatchList.length) setAllMyWatchList(myWatchList)
    //확인필요
  }, [favoriteGenreCode, myWatchList, page])

  if (totalResults.totalCount < 1)
    return (
      <MyPageContainer>
        <MyProfile />
        <NoResults>
          <p>좋아하는 영화, 보고싶은 영화를 관심 등록 해 보세요!</p>
          <p>취향에 맞는 영화를 추천받을 수 있어요.</p>
        </NoResults>
      </MyPageContainer>
    )
  else
    return (
      <MyPageContainer>
        <MyProfile />
        <Chart watchList={allMyWatchList} totalResults={totalResults} setFavoriteGenreCode={setFavoriteGenreCode} />
        {myWatchList.length >= 1 && favoriteGenreCode !== 0 && (
          <RecommendCarousel type={'genre'} currentMovieId={favoriteGenreCode + ''} />
        )}

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
