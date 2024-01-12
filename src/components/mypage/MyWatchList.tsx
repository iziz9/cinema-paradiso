import React from 'react'
import styled from 'styled-components'

const MyWatchList = () => {
  return (
    <WatchListContainer>
      <div>관심영화 목록</div>
      <div>목록보여주기</div>
      <div>페이지네이션/무한스크롤</div>
    </WatchListContainer>
  )
}

const WatchListContainer = styled.section`
  position: relative;
`

export default MyWatchList
