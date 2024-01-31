import styled from 'styled-components'
import { ProfileIcon } from '../../constants/icon'
import { useUserStore } from '../../store/useUserStore'

const MyProfile = () => {
  const { userInfo } = useUserStore()
  return (
    <MyProfileContainer>
      <UserImg>
        {userInfo.photoURL && userInfo.displayName ? (
          <img src={userInfo.photoURL} alt={userInfo.displayName} />
        ) : (
          <ProfileIcon />
        )}
      </UserImg>
      <div>{userInfo.displayName} 님</div>
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
const UserImg = styled.div`
  color: var(--colors-green);

  img {
    width: 50px;
    height: 50px;
    border: 1px solid var(--colors-gray);
    border-radius: 100%;
    background-color: var(--colors-gray);
    box-sizing: border-box;
    margin: auto;
  }
`

export default MyProfile
