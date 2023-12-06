import React from 'react'
import styled from 'styled-components'
import Example from './Ch'

const Chart = () => {
  return (
    <ChartContainer>
      <div>나의 영화 취향</div>
      <div>
        <div>차트</div>
        <Example />
      </div>
    </ChartContainer>
  )
}

const ChartContainer = styled.section`
  position: relative;
  height: 400px;
  background-color: royalblue;
`

export default Chart
