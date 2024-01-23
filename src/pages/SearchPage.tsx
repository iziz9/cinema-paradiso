import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getSearchingMovieList } from '../api/movieRequest'
import { IMovieInfo } from '../types/types'
import MovieItem from '../components/common/MovieItem'
import { useMediaQuery } from 'react-responsive'
import useInfinityScroll from '../hooks/useInfinityScroll'
import Loading from '../components/common/Loading'
import MovieListStyle from '../components/style/MovieListStyle'
import MovieItemStyle from '../components/style/MovieItemStyle'

const SearchPage = () => {
  //페이지네이션으로 변경
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
  }, [params, page])

  return (
    <SearchPageContainer>
      <ResultsCount>검색결과 {totalResults.totalCount}건</ResultsCount>
      <MovieListStyle>
        {!movieList.length && <NoResult>일치하는 검색 결과가 없습니다.</NoResult>}
        {movieList?.map((movie) => (
          <MovieItemStyle key={movie.id}>
            <MovieItem movieInfo={movie} onClick={() => navigate(`/detail/${movie.id}`, { state: movie.id })} />
          </MovieItemStyle>
        ))}
      </MovieListStyle>
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
const NoResult = styled.div`
  margin-top: 80px;
`

export default SearchPage
