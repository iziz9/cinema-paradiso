import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const RecommendList = ({ title }: { title: string }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <RecommendSection>
      <div className="list-slider">
        <h3>{title}</h3>
        <Slider {...settings}>
          <div className="poster">
            <img src="/logo.webp" alt="img1" />
          </div>
          <div className="poster">
            <img src="/logo.webp" alt="img2" />
          </div>
          <div className="poster">
            <img src="/logo.webp" alt="img3" />
          </div>
          <div className="poster">
            <img src="/logo.webp" alt="img4" />
          </div>
          <div className="poster">
            <img src="/logo.webp" alt="img5" />
          </div>
        </Slider>
      </div>
    </RecommendSection>
  )
}

const RecommendSection = styled.section`
  position: relative;
  margin-top: 20px;

  .list-slider {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  h3 {
    font-size: 1.2rem;
  }

  .poster {
    position: relative;
    width: 100%;
    img {
      position: relative;
      width: 40%;
    }
  }
`

export default RecommendList
