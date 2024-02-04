import styled from 'styled-components'
import { genresId, genresIdType } from '../../constants/defaultValues'

type overlayPosterType = {
  title: string
  released: string
  genreIds: number[]
  handleMouseLeave: () => void
}

const OverlayPoster = ({ title, released, genreIds, handleMouseLeave }: overlayPosterType) => {
  return (
    <OverlayContainer onMouseLeave={handleMouseLeave}>
      <div className="inner">
        <div className="title">{title}</div>
        <div className="released">{released?.slice(0, 4)}</div>
        <div className="genre">
          {genreIds?.map((id, index) => (
            <span key={id}>{index > 0 ? `·${genresId[id as genresIdType]}` : genresId[id as genresIdType]}</span>
          ))}
        </div>
      </div>
    </OverlayContainer>
  )
}
const OverlayContainer = styled.div`
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100%;
  top: 0;

  .inner {
    position: relative;
    margin: auto;
    width: 90%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    background: linear-gradient(to bottom, var(--colors-transdark), var(--colors-transblack));
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: end;

    .title {
      line-height: 1.1rem;
      font-weight: 700;
      margin-right: 3px;
    }
    .released {
      font-size: 0.7rem;
      margin-top: 3px;
    }
    .genre {
      font-size: 0.7rem;
      display: flex;
      gap: 2px;
      color: var(--colors-green);
      flex-wrap: wrap;
    }
  }
`

export default OverlayPoster
