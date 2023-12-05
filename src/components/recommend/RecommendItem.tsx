import React from 'react'
import styled from 'styled-components'

type PropsType = {
  number: number
  onClick: () => void
}

const RecommendItem = ({ number, onClick }: PropsType) => {
  return (
    <ItemContainer onClick={onClick}>
      <div className="poster">
        <img src={`/poster${number}.jpeg`} alt="img" />
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
