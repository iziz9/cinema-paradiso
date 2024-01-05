import React, { useState } from 'react'
import styled from 'styled-components'
import { IMovieInfo } from '../../types/types'
import OverlayPoster from '../layout/OverlayPoster'
import SkeletonPoster from '../layout/SkeletonPoster'

type PropsType = {
  movieInfo: IMovieInfo
  onClick: () => void
}

const RecommendItem = ({ movieInfo, onClick }: PropsType) => {
  const POSTER_BASE_URL = 'https://www.themoviedb.org/t/p/w440_and_h660_face'
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const handleMouseOver = () => {
    setIsHovering(true)
  }
  const handleMouseOut = () => {
    setIsHovering(false)
  }

  return (
    <ItemContainer onClick={onClick}>
      {movieInfo.poster_path ? (
        <>
          <div className="poster" onMouseOverCapture={handleMouseOver} onMouseOutCapture={handleMouseOut}>
            <img src={POSTER_BASE_URL + movieInfo.poster_path} alt={movieInfo.title} />
            {/* <SkeletonPoster /> */}
          </div>
          {isHovering && (
            <OverlayPoster title={movieInfo.title} released={movieInfo.release_date} genre={['액션', '코미디']} />
          )}
        </>
      ) : (
        <div className="poster">
          <img src="/no_image.webp" alt="이미지 없음" />
        </div>
      )}
    </ItemContainer>
  )
}

const ItemContainer = styled.div`
  .poster {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1.3;

    img {
      position: relative;
      width: 90%;
      height: 100%;
      object-fit: cover;
      margin: auto;
    }
  }

  transition: transform 0.3s;
  cursor: pointer;
  &:hover {
    z-index: 100;
    transform: scale(1.1);
    -webkit-transform: scale(1.1); /* 크롬, 사파리 */
    -moz-transform: scale(1.1); /* 파이어폭스 */
    -ms-transform: scale(1.1); /* IE */
    -o-transform: scale(1.1); /* 오페라 */
  }
`

export default RecommendItem
