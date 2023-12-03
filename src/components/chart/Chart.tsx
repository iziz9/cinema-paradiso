import React from 'react'
import styled from 'styled-components'

const Chart = () => {
  return (
    <ChartContainer>
      <div>나의 영화 취향</div>
      <div>차트</div>
    </ChartContainer>
  )
}

const ChartContainer = styled.section`
  position: relative;
  height: 400px;
  background-color: royalblue;
`

export default Chart
