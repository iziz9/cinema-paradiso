import MovieListStyle from '../style/MovieListStyle'
import styled from 'styled-components'
import { IMovieInfo } from '../../types/types'
import MovieItemStyle from '../style/MovieItemStyle'
import MovieItem from '../common/MovieItem'
import { useNavigate } from 'react-router-dom'

const SearchResults = ({ movieList }: { movieList: IMovieInfo[] }) => {
  const navigate = useNavigate()
  return (
    <MovieListStyle>
      {!movieList.length && <NoResult>일치하는 검색 결과가 없습니다.</NoResult>}
      {movieList?.map((movie) => (
        <MovieItemStyle key={movie.id}>
          <MovieItem movieInfo={movie} onClick={() => navigate(`/detail/${movie.id}`, { state: movie.id })} />
        </MovieItemStyle>
      ))}
    </MovieListStyle>
  )
}

const NoResult = styled.div`
  margin-top: 80px;
`

export default SearchResults
