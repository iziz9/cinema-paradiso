import React from 'react'
import styled from 'styled-components'

const SkeletonPoster = () => {
  return <SkeletonContainer></SkeletonContainer>
}

const SkeletonContainer = styled.div`
  /* position: relative; */
  width: 100px;
  height: 100px;
  background: center / contain no-repeat url('/skeleton_image.webp');
`

export default SkeletonPoster
