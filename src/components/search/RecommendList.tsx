import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const RecommendList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <RecommendSection>
      <div>이런 영화는 어떠세요?</div>
    </RecommendSection>
  )
}

const RecommendSection = styled.section``

export default RecommendList
