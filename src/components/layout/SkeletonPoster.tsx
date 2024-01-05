import React from 'react'
import styled from 'styled-components'

const SkeletonPoster = () => {
  return <SkeletonContainer></SkeletonContainer>
}

const SkeletonContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1.3;
  background: center / contain no-repeat url('/skeleton_image.webp');
`

export default SkeletonPoster
