import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import SearchBar from '../components/search/SearchBar'
import { useLocation, useNavigate } from 'react-router-dom'
import OverlayPoster from '../components/layout/OverlayPoster'
import { getSearchingMovieList } from '../api/request'
import { IMovieInfo } from '../types/types'
import RecommendItem from '../components/recommend/RecommendItem'

interface ITotalResults {
  totalCount: number
  totalPages: number
}

const SearchPage = () => {
  const isMobile = useMediaQuery({
    //모바일 무한스크롤, pc 페이지네이션
    query: '(max-width: 833px)'
  })
  const location = useLocation()
  const navigate = useNavigate()
  const DropDownRef = useRef<HTMLUListElement>(null)
  const [isDropDownOpen, setisDropDownOpen] = useState<boolean>(false)
  const [movieList, setMovieList] = useState<IMovieInfo[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<ITotalResults>({
    totalCount: 0,
    totalPages: 0
  })

  useEffect(() => {
    const getMovieList = async () => {
      const movieRes = await getSearchingMovieList(location.state, page)
      setMovieList(movieRes.results)
      setTotalResults({ totalCount: movieRes.total_results, totalPages: movieRes.total_pages })
    }
    getMovieList()
    //페이지별 캐싱 추가
  }, [location.state, page])

  return (
    <SearchPageContainer>
      <SearchBar isDropDownOpen={isDropDownOpen} setIsDropDownOpen={setisDropDownOpen} dropDownRef={DropDownRef} />
      <ResultsCount>검색결과 {totalResults.totalCount}건</ResultsCount>
      <ListContainer>
        {!movieList.length && <NoResult>일치하는 검색 결과가 없습니다.</NoResult>}
        {movieList?.map((movie) => (
          <ListItem key={movie.id}>
            <RecommendItem movieInfo={movie} onClick={() => navigate(`/detail/${movie.id}`, { state: movie.id })} />
          </ListItem>
        ))}
      </ListContainer>
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
  margin: 16px auto;
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
