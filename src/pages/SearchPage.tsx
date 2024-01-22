import React, { useEffect, useState } from 'react'
// import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { useNavigate, useSearchParams } from 'react-router-dom'
// import OverlayPoster from '../components/layout/OverlayPoster'
import { getSearchingMovieList } from '../api/movieRequest'
import { IMovieInfo } from '../types/types'
import RecommendItem from '../components/carousel/RecommendItem'
import { useMediaQuery } from 'react-responsive'
import useInfinityScroll from '../hooks/useInfinityScroll'
import Loading from '../components/common/Loading'

const SearchPage = () => {
  const isMobile = useMediaQuery({
    //모바일 무한스크롤, pc 페이지네이션
    query: '(max-width: 833px)'
  })
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [movieList, setMovieList] = useState<IMovieInfo[]>([])
  const [page, setPage] = useState<number>(1)

  const { isLoading, totalResults, getListData, ref } = useInfinityScroll({
    request: getSearchingMovieList,
    payload: params.get('q') as string,
    page,
    setPage,
    setMovieList
  })

  useEffect(() => {
    const searchParam = params.get('q')
    if (!isLoading) getListData(searchParam as string, page)
    // const getMovieList = async () => {
    //   if (searchParam) {
    //     const movieRes = await getSearchingMovieList(searchParam, page)
    //     console.log(movieRes)
    //     setMovieList(movieRes.results)
    //   }
    // }
    // getMovieList()
  }, [params, page])

  return (
    <SearchPageContainer>
      <ResultsCount>검색결과 {totalResults.totalCount}건</ResultsCount>
      <ListContainer>
        {!movieList.length && <NoResult>일치하는 검색 결과가 없습니다.</NoResult>}
        {movieList?.map((movie) => (
          <ListItem key={movie.id}>
            <RecommendItem movieInfo={movie} onClick={() => navigate(`/detail/${movie.id}`, { state: movie.id })} />
          </ListItem>
        ))}
      </ListContainer>
      {!isLoading && <div ref={ref}></div>}
      {isLoading && <Loading />}
    </SearchPageContainer>
  )
}

const SearchPageContainer = styled.main`
  position: relative;
  margin: auto;
`
const ResultsCount = styled.div`
  padding: 30px 32px 16px;
  display: flex;
  justify-content: end;
`
const ListContainer = styled.ul`
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  padding: 0 16px;
`
const ListItem = styled.li`
  position: relative;
  width: calc(100% / 5 - 4px);
  margin: 16px 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    -webkit-transform: scale(1.1); /* 크롬, 사파리 */
    -moz-transform: scale(1.1); /* 파이어폭스 */
    -ms-transform: scale(1.1); /* IE */
    -o-transform: scale(1.1); /* 오페라 */
    transition: transform 0.3s;
  }

  @media (max-width: 1024px) {
    width: calc(100% / 5 - 4px);
  }
  @media (max-width: 833px) {
    width: calc(100% / 4 - 4px);
  }
  @media (max-width: 600px) {
    width: calc(100% / 3 - 4px);
  }
  @media (max-width: 450px) {
    width: calc(100% / 2 - 4px);
  }
`
const NoResult = styled.div`
  margin-top: 80px;
`

export default SearchPage
