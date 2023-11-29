import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const RecommendList = ({ title }: { title: string }) => {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    // swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
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
          <div className="poster">
            <img src="/poster.jpg" alt="img1" />
          </div>
          <div className="poster">
            <img src="/poster.jpg" alt="img2" />
          </div>
          <div className="poster">
            <img src="/poster.jpg" alt="img3" />
          </div>
          <div className="poster">
            <img src="/poster.jpg" alt="img4" />
          </div>
          <div className="poster">
            <img src="/poster.jpg" alt="img5" />
          </div>
          <div className="poster">
            <img src="/poster.jpg" alt="img6" />
          </div>
          <div className="poster">
            <img src="/poster.jpg" alt="img7" />
          </div>
          <div className="poster">
            <img src="/poster.jpg" alt="img8" />
          </div>
        </Slider>
      </div>
    </RecommendSection>
  )
}

const RecommendSection = styled.section`
  position: relative;
  width: 100%;
  margin-top: 20px;

  .list-slider {
    /* background-color: #ffffff16; */
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 15px 0;
  }

  h3 {
    font-size: 20px;
  }

  .poster {
    position: relative;
    width: 100%;

    img {
      position: relative;
      width: 90%;
      margin: auto;
    }
  }
`

export default RecommendList
