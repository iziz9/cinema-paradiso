import React from 'react'
import styled from 'styled-components'

const MyProfile = () => {
  return (
    <MyProfileContainer>
      <div>프로필사진</div>
      <div>이름</div>
    </MyProfileContainer>
  )
}

const MyProfileContainer = styled.section`
  position: relative;
`

export default MyProfile
