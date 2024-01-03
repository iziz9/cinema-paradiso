import React from 'react'
import styled from 'styled-components'

type posterOverlayType = {
  title: string
  director: string
  genre: string[]
}

const posterOverlay = ({ title, director, genre }: posterOverlayType) => {
  return (
    <OverlayContainer>
      <div className="title">{title}</div>
      <div className="director">{director}</div>
      {genre.map((item) => (
        <div className="genre" key={item}>
          {item}
        </div>
      ))}
    </OverlayContainer>
  )
}
const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  background: linear-gradient(to bottom, var(--colors-transdark), var(--colors-transblack));
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: end;

  .title {
    font-size: 1.3rem;
    font-weight: 700;
  }
  .director {
    margin-top: 3px;
  }
  .genre {
    font-size: 0.8rem;
  }
`

export default posterOverlay
