import React from 'react'
import styled from 'styled-components'

const SkeletonPoster = () => {
  return (
    <SkeletonContainer>
      <div className="shimmer"></div>
    </SkeletonContainer>
  )
}

const SkeletonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1.3;
  animation: loading 2.5s infinite;

  .shimmer {
    /* background: center / contain no-repeat url('/skeleton_image.webp'); */
    width: 90%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    transform: skewX(-20deg);
    box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.05);

    @keyframes loading {
      0% {
        transform: translateX(-150%);
      }
      50% {
        transform: translateX(-60%);
      }
      100% {
        transform: translate(150%);
      }
    }
  }
`

export default SkeletonPoster
