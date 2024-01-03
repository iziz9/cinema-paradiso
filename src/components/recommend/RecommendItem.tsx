import React from 'react'
import styled from 'styled-components'
import { IMovieInfo } from '../../types/types'

type PropsType = {
  movieInfo: IMovieInfo
  onClick: () => void
}

const RecommendItem = ({ movieInfo, onClick }: PropsType) => {
  const POSTER_BASE_URL = 'https://www.themoviedb.org/t/p/w440_and_h660_face'

  return (
    <ItemContainer onClick={onClick}>
      <div className="poster">
        {movieInfo.poster_path ? (
          <img src={POSTER_BASE_URL + movieInfo.poster_path} alt={movieInfo.title} loading="lazy" />
        ) : (
          <img src="/no_image.webp" alt="이미지 없음" />
        )}
      </div>
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
`

export default RecommendItem
