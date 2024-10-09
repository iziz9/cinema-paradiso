import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import { carouselSettings } from './CarouselSettings'
import { useRecommendMovieStore } from '../../store/recommendMovieStore'
import { useMovieDetailStore } from '../../store/movieDetailStore'
import { IMovieInfo } from '../../types/types'
import { RECOMMEND_LIST_DEFAULT } from '../../constants/defaultValues'
import { getMockedList } from '../../utils/getMockedList'
import { getGenresMovieList, getMovieSimilar, getTopRatedMovieList, getTrendingMovieList } from '../../api/movieRequest'
import MovieItem from '../common/MovieItem'
import styled from 'styled-components'

const requestList = {
  trending: getTrendingMovieList,
  topRated: getTopRatedMovieList,
  similar: getMovieSimilar,
  genre: getGenresMovieList
}

interface ICarouselSliderProps {
  type: 'topRated' | 'trending' | 'similar' | 'genre'
  currentMovieId?: string
}

const CarouselSlider = ({ type, currentMovieId }: ICarouselSliderProps) => {
  const { cachedRecommendMovie, setCachedRecommendMovie } = useRecommendMovieStore()
  const { cachedMovieDetail, setCachedMovieDetail } = useMovieDetailStore()
  const [movieList, setMovieList] = useState<IMovieInfo[]>(RECOMMEND_LIST_DEFAULT)
  const navigate = useNavigate()

  useEffect(() => {
    if (!type) return

    const getCachedList = () => {
      return cachedRecommendMovie[type] || false
    }

    const getRecommendLists = async (getMovieList: any, params?: string) => {
      const cachedList = getCachedList()
      if (cachedList) return setMovieList(cachedList)

      try {
        const requestRes = await getMovieList(params || null)
        setMovieList(requestRes)

        if (!params) return
        if (type === 'genre') setCachedRecommendMovie(type, requestRes)
        else setCachedMovieDetail(params, type, requestRes)
      } catch (err) {
        if (type === 'similar' && params) {
          const similarData = getCachedSimilarData(params)
          similarData && similarData.length && setMovieList(similarData)
        } else if (type === 'topRated' || type === 'trending') {
          const mockedList = getMockedList(type)
          setMovieList(mockedList)
        }
      }
    }
    requestList && getRecommendLists(requestList[type], currentMovieId)

    // eslint-disable-next-line
  }, [type, currentMovieId])

  const getCachedSimilarData = (id: string) => {
    if (!cachedMovieDetail[id]) return false
    return cachedMovieDetail[id].similar
  }

  const goToDetailPage = (movieId: number) => {
    navigate(`/detail/${movieId}`, { state: movieId })
  }

  if (!movieList.length) {
    return (
      <SliderContainer>
        <div className="blank">비슷한 영화 리스트가 제공되지 않는 영화입니다.</div>
      </SliderContainer>
    )
  }

  return (
    <SliderContainer>
      <Slider {...carouselSettings}>
        {movieList?.map((movie: any) => (
          <MovieItem movieInfo={movie} onClick={() => goToDetailPage(movie.id)} key={movie.id} />
        ))}
      </Slider>
    </SliderContainer>
  )
}

const SliderContainer = styled.div`
  .blank {
    padding: 50px;
    text-align: center;
    background-color: var(--colors-transblack);
    color: var(--colors-gray);
  }
  .no-result {
    background-color: red;
  }
  .slick-list {
    height: auto;

    .slick-slide {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }

  button {
    position: absolute;
    z-index: 10;
    height: 100%;
    top: 0;

    &.prev {
      left: -30px;
    }
    &.next {
      right: -30px;
    }
  }

  animation: fadeinloading 1.5s;
  animation-fill-mode: forwards;

  @keyframes fadeinloading {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export default CarouselSlider
