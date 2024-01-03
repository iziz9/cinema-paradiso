import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import RecommendItem from './RecommendItem'
import { carouselSettings } from './CarouselSettings'
import { useNavigate } from 'react-router-dom'
import { IMovieInfo, IResultList } from '../../types/types'

interface IRecommendList {
  title: string
  movieList: IMovieInfo[]
}

const RecommendList = ({ title, movieList }: IRecommendList) => {
  const navigate = useNavigate()

  return (
    <RecommendSection>
      <div className="list-slider">
        <h3>{title}</h3>
        <Slider {...carouselSettings}>
          {movieList.map((movie, index) => (
            <RecommendItem
              movieInfo={movie}
              onClick={() => navigate(`/detail/${movie.id}`, { state: movie.id })}
              key={index}
            />
          ))}
        </Slider>
      </div>
    </RecommendSection>
  )
}

const RecommendSection = styled.section`
  position: relative;
  width: 100%;
  margin-top: 20px;

  h3 {
    font-size: 1.1rem;
  }

  .list-slider {
    position: relative;
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 15px 0;

    .slick-list {
      height: auto;
    }

    img {
      transition: transform 0.3s;
      cursor: pointer;
      &:hover {
        z-index: 100;
        transform: scale(1.1);
        -webkit-transform: scale(1.1); /* 크롬, 사파리 */
        -moz-transform: scale(1.1); /* 파이어폭스 */
        -ms-transform: scale(1.1); /* IE */
        -o-transform: scale(1.1); /* 오페라 */
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
