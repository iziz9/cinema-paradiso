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

  img {
    position: relative;
    width: 90%;
    height: 100%;
    object-fit: cover;
    margin: auto;
  }
`
export default SkeletonPoster
