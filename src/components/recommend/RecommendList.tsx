import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import RecommendItem from './RecommendItem'
import { carouselSettings } from './CarouselSettings'
import { useNavigate } from 'react-router-dom'

const RecommendList = ({ title }: { title: string }) => {
  const navigate = useNavigate()
  return (
    <RecommendSection>
      <div className="list-slider">
        <h3>{title}</h3>
        <Slider {...carouselSettings}>
          <RecommendItem number={0} onClick={() => navigate('detail/579974')} />
          <RecommendItem number={1} onClick={() => navigate('detail/579974')} />
          <RecommendItem number={2} onClick={() => navigate('detail/579974')} />
          <RecommendItem number={3} onClick={() => navigate('detail/579974')} />
          <RecommendItem number={4} onClick={() => navigate('detail/579974')} />
          <RecommendItem number={5} onClick={() => navigate('detail/579974')} />
          <RecommendItem number={6} onClick={() => navigate('detail/579974')} />
          <RecommendItem number={7} onClick={() => navigate('detail/579974')} />
          <RecommendItem number={8} onClick={() => navigate('detail/579974')} />
          <RecommendItem number={9} onClick={() => navigate('detail/579974')} />
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
    font-size: 20px;
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
      /* background-color: aliceblue; */

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
