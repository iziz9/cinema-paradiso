import React from 'react'
import Chart from '../components/chart/Chart'
import styled from 'styled-components'
import RecommendList from '../components/recommend/RecommendList'

const MyPage = () => {
  return (
    <MyPageContainer>
      <Chart />
      <RecommendList title={'관심 등록한 영화'} />
    </MyPageContainer>
  )
}

const MyPageContainer = styled.main`
  position: relative;
`

export default MyPage
