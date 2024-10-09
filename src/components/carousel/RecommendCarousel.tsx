import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { IRecommendCarousel } from '../../types/types'
import { recommendListTitle } from '../../constants/defaultValues'
import CarouselSlider from './CarouselSlider'

const RecommendCarousel = ({ type, relatedText, currentMovieId }: IRecommendCarousel) => {
  return (
    <RecommendSection>
      <h3>
        {relatedText || ''}
        {recommendListTitle[type]}
      </h3>
      <CarouselSlider type={type} currentMovieId={currentMovieId} />
    </RecommendSection>
  )
}

const RecommendSection = styled.section`
  position: relative;
  width: 90%;
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 0;

  h3 {
    font-size: 1.05rem;
  }

  @media (max-width: 833px) {
    h3 {
      font-size: 17px;
    }
  }
`

export default RecommendCarousel
