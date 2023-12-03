import React from 'react'
import styled from 'styled-components'

const DetailPage = () => {
  return (
    <DetailContainer>
      <UpperSection>
        <div>포스터</div>
        <div>상세</div>
      </UpperSection>
      <HeartSection>하트</HeartSection>
      <LowerSection>줄거리</LowerSection>
    </DetailContainer>
  )
}

const DetailContainer = styled.main`
  position: relative;
  height: 500px;
  background-color: #ffffff1b;
  border-radius: 10px;
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const UpperSection = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const HeartSection = styled.section`
  position: relative;
`

const LowerSection = styled.section`
  position: relative;
`

export default DetailPage
