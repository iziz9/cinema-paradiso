import styled from 'styled-components'

const SkeletonPoster = () => {
  return (
    <SkeletonContainer>
      <img src={'/skeleton_image.webp'} alt="로딩중" />
    </SkeletonContainer>
  )
}

const SkeletonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1.3;

  /* animation: fadeoutloading 1.5s;
  animation-fill-mode: forwards;

  @keyframes fadeoutloading {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  } */

  animation: fadeinloading 1.5s;
  animation-fill-mode: forwards;

  @keyframes fadeinloading {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  img {
    position: relative;
    width: 90%;
    height: 100%;
    object-fit: cover;
    margin: auto;
  }
`
export default SkeletonPoster
