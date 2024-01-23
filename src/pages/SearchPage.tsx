import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getSearchingMovieList } from '../api/movieRequest'
import { IMovieInfo } from '../types/types'
import MovieItem from '../components/common/MovieItem'
import MovieListStyle from '../components/style/MovieListStyle'
import MovieItemStyle from '../components/style/MovieItemStyle'
import ResultCountStyle from '../components/style/ResultCountStyle'
import { ITotalResults } from '../types/hooksTypes'
import Pagination from '../components/layout/Pagination'

const VIEW_LIMIT = 5

const SearchPage = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [movieList, setMovieList] = useState<IMovieInfo[]>([])
  const [page, setPage] = useState<number>(1)

  const [totalResults, setTotalResults] = useState<ITotalResults>({
    totalCount: 0,
    totalPages: 0
  })

  useEffect(() => {
    const getData = async () => {
      const res = await getSearchingMovieList(params.get('q') as string, page)
      console.log(res)
      setMovieList(res.results)
      setTotalResults({
        totalCount: res.total_results,
        totalPages: res.total_pages
      })
    }
    getData()
  }, [params, page])

  return (
    <SearchPageContainer>
      <ResultCountStyle>
        검색결과 {totalResults.totalCount}건 ({totalResults.totalPages}페이지)
      </ResultCountStyle>
      <MovieListStyle>
        {!movieList.length && <NoResult>일치하는 검색 결과가 없습니다.</NoResult>}
        {movieList?.map((movie) => (
          <MovieItemStyle key={movie.id}>
            <MovieItem movieInfo={movie} onClick={() => navigate(`/detail/${movie.id}`, { state: movie.id })} />
          </MovieItemStyle>
        ))}
        <Pagination totalPages={totalResults.totalPages} viewLimit={VIEW_LIMIT} page={page} setPage={setPage} />
      </MovieListStyle>
    </SearchPageContainer>
  )
}

const SearchPageContainer = styled.main`
  position: relative;
  margin: auto;
`
const NoResult = styled.div`
  margin-top: 80px;
`

export default SearchPage
