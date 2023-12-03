import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import RecommendItem from './RecommendItem'

const RecommendList = ({ title }: { title: string }) => {
  const settings = {
    infinite: true,
    dots: false,
    // arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    swipeToSlide: true, //모바일 테스트
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 834,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }
  return (
    <RecommendSection>
      <div className="list-slider">
        <h3>{title}</h3>
        <Slider {...settings}>
          <RecommendItem number={0} />
          <RecommendItem number={1} />
          <RecommendItem number={2} />
          <RecommendItem number={3} />
          <RecommendItem number={4} />
          <RecommendItem number={5} />
          <RecommendItem number={6} />
          <RecommendItem number={7} />
          <RecommendItem number={8} />
          <RecommendItem number={9} />
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
      &:hover {
        z-index: 100;
        transform: scale(1.1);
        -webkit-transform: scale(1.1); /* 크롬, 사파리 */
        -moz-transform: scale(1.1); /* 파이어폭스 */
        -ms-transform: scale(1.1); /* IE */
        -o-transform: scale(1.1); /* 오페라 */
      }
    }

    button::before {
      color: var(--colors-green);
      width: 1.5rem;
      height: 1.5rem;
      font-size: 30px;
      position: absolute;
      left: -4px;
    }
  }

  @media (max-width: 833px) {
    h3 {
      font-size: 17px;
    }
  }
`

export default RecommendList
