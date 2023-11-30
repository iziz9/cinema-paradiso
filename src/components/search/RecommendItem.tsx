import React from 'react'
import styled from 'styled-components'

const RecommendItem = ({ number }: { number: number }) => {
  return (
    <ItemContainer>
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

    img {
      position: relative;
      width: 90%;
      margin: auto;
    }
  }
`

export default RecommendItem
