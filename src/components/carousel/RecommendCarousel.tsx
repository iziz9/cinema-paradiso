import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MovieItem from '../common/MovieItem'
import { carouselSettings } from './CarouselSettings'
import { useNavigate } from 'react-router-dom'
import SkeletonCarousel from './SkeletonCarousel'
import { IRecommendCarousel } from '../../types/types'

const RecommendCarousel = ({ title, movieList, isLoading }: IRecommendCarousel) => {
  const navigate = useNavigate()
  const [isCarouselHidden, setIsCarouselHidden] = useState<boolean>(true)

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setIsCarouselHidden(false), 1000)
    }
  }, [isLoading])

  const addAnimation = () => {
    if (!isLoading && isCarouselHidden) return 'fadeout'
    else if (!isLoading && !isCarouselHidden) return 'fadein'
  }
  const goToDetailPage = (movieId: number) => {
    navigate(`/detail/${movieId}`, { state: movieId })
  }

  return (
    <RecommendSection>
      <div className="list-slider">
        <h3>{title}</h3>
        <div className={addAnimation()}>
          {isCarouselHidden ? (
            <SkeletonCarousel />
          ) : (
            <Slider {...carouselSettings}>
              {movieList.map((movie) => (
                <MovieItem movieInfo={movie} onClick={() => goToDetailPage(movie.id)} key={movie.id} />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </RecommendSection>
  )
}

const RecommendSection = styled.section`
  position: relative;
  width: 100%;
  margin-top: 20px;

  .fadein {
    animation: fadeinloading 3s;
    animation-fill-mode: forwards;
  }

  .fadeout {
    animation: fadeoutloading 1s;
    animation-fill-mode: forwards;
  }

  @keyframes fadeinloading {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeoutloading {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

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

export default RecommendCarousel
