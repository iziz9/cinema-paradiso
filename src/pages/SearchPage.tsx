import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import { getSearchingMovieList } from '../api/movieRequest'
import { IMovieInfo } from '../types/types'
import ResultCountStyle from '../components/style/ResultCountStyle'
import { ITotalResults } from '../types/hooksTypes'
import Pagination from '../components/layout/Pagination'
import Loading from '../components/common/Loading'
import SearchResults from '../components/search/SearchResults'

const SearchPage = () => {
  const [params] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [movieList, setMovieList] = useState<IMovieInfo[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<ITotalResults>({
    totalCount: 0,
    totalPages: 0
  })

  useEffect(() => {
    setPage(1)
  }, [params])

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
      {isLoading ? <Loading /> : <SearchResults movieList={movieList} />}
      <Pagination totalPages={totalResults.totalPages} page={page} setPage={setPage} />
    </SearchPageContainer>
  )
}

const SearchPageContainer = styled.main`
  position: relative;
  margin: auto;
`

export default SearchPage
