import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MovieItem from '../common/MovieItem'
import { carouselSettings } from './CarouselSettings'
import { useNavigate } from 'react-router-dom'
import { IMovieInfo } from '../../types/types'
import SkeletonCarousel from './SkeletonCarousel'
// const MovieItem = React.lazy(() => import('./MovieItem'))

interface IRecommendList {
  title: string
  movieList: IMovieInfo[]
  isLoading: boolean
}

const RecommendList = ({ title, movieList, isLoading }: IRecommendList) => {
  const navigate = useNavigate()

  return (
    <RecommendSection>
      <div className="list-slider">
        <h3>{title}</h3>
        {isLoading ? (
          <SkeletonCarousel />
        ) : (
          <Slider {...carouselSettings}>
            {movieList.map((movie, index) => (
              <MovieItem
                movieInfo={movie}
                onClick={() => navigate(`/detail/${movie.id}`, { state: movie.id })}
                key={movie.id}
              />
            ))}
          </Slider>
        )}
      </div>
    </RecommendSection>
  )
}

const RecommendSection = styled.section`
  position: relative;
  width: 100%;
  margin-top: 20px;

  .list-slider {
    position: relative;
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px 0;

    h3 {
      font-size: 1.05rem;
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
  }

  @media (max-width: 833px) {
    h3 {
      font-size: 17px;
    }
  }
`

export default RecommendList
