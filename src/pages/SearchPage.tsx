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
import Loading from '../components/common/Loading'

const SearchPage = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [movieList, setMovieList] = useState<IMovieInfo[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<ITotalResults>({
    totalCount: 0,
    totalPages: 0
  })

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const res = await getSearchingMovieList(params.get('q') as string, page)
        setMovieList(res.results)
        setTotalResults({
          totalCount: res.total_results,
          totalPages: res.total_pages
        })
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [params, page])

  return (
    <SearchPageContainer>
      <ResultCountStyle>
        검색결과 {isLoading ? '?' : totalResults.totalCount}건 ({isLoading ? '?' : totalResults.totalPages}페이지)
      </ResultCountStyle>
      {isLoading ? (
        <Loading />
      ) : (
        <MovieListStyle>
          {!movieList.length && <NoResult>일치하는 검색 결과가 없습니다.</NoResult>}
          {movieList?.map((movie) => (
            <MovieItemStyle key={movie.id}>
              <MovieItem movieInfo={movie} onClick={() => navigate(`/detail/${movie.id}`, { state: movie.id })} />
            </MovieItemStyle>
          ))}
          <Pagination totalPages={totalResults.totalPages} page={page} setPage={setPage} />
        </MovieListStyle>
      )}
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
