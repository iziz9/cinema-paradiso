import styled from 'styled-components'
import RecommendCarousel from '../components/carousel/RecommendCarousel'

const MainPage = () => {
  return (
    <MainContainer>
      <div className="banner">
        <img src={'/banner.webp'} alt="banner" />
      </div>
      <RecommendCarousel type="trending" />
      <RecommendCarousel type="topRated" />
    </MainContainer>
  )
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  .banner {
    width: 100%;
    img {
      width: 100%;
      aspect-ratio: 1/0.352;
      object-fit: cover;
    }
  }
`

export default MainPage
