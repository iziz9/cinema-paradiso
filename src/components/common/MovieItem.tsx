import { useCallback, useState } from 'react'
import styled from 'styled-components'
import OverlayPoster from './OverlayPoster'
import { POSTER_BASE_URL } from '../../constants/defaultValues'
import { IMovieItemProps } from '../../types/types'
// import noImage from '../../assets/no_image.webp'

const MovieItem = ({ movieInfo, onClick }: IMovieItemProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const handleMouseOver = useCallback(() => {
    setIsHovering(true)
  }, [])
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  return (
    <ItemContainer onClick={onClick} onMouseOver={handleMouseOver}>
      {movieInfo.poster_path ? (
        <>
          <img src={POSTER_BASE_URL + movieInfo.poster_path} alt={movieInfo.title} />
          {isHovering && (
            <OverlayPoster
              title={movieInfo.title}
              released={movieInfo.release_date}
              genreIds={movieInfo.genre_ids}
              handleMouseLeave={handleMouseLeave}
            />
          )}
        </>
      ) : (
        <>
          {/* <img src={noImage} alt="이미지 없음" /> */}
          <img src={'/no_image.webp'} alt="이미지 없음" />
          <OverlayPoster
            title={movieInfo.title}
            released={movieInfo.release_date}
            genreIds={movieInfo.genre_ids}
            handleMouseLeave={handleMouseLeave}
          />
        </>
      )}
    </ItemContainer>
  )
}

const ItemContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1.3;
  display: flex;
  justify-content: center;
  cursor: pointer;
  img {
    position: relative;
    width: 90%;
    height: 100%;
    object-fit: cover;
    margin: auto;
  }

  &:hover {
    z-index: 100;
    transform: scale(1.1);
    -webkit-transform: scale(1.1); /* 크롬, 사파리 */
    -moz-transform: scale(1.1); /* 파이어폭스 */
    -ms-transform: scale(1.1); /* IE */
    -o-transform: scale(1.1); /* 오페라 */
  }
`

export default MovieItem
