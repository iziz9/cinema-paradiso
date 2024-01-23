import styled from 'styled-components'
import { ProfileIcon } from '../../constants/icon'

const MyProfile = () => {
  return (
    <MyProfileContainer>
      <div>
        <ProfileIcon />
      </div>
      <div>GUEST 님</div>
    </MyProfileContainer>
  )
}

const MyProfileContainer = styled.section`
  position: relative;
  width: 100%;
  height: 80px;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 1.1rem;
  background-color: var(--colors-darkgray);
  color: var(--colors-gray);
`

export default MyProfile
