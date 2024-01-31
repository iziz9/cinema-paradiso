import { GoogleAuthProvider, UserCredential, getAuth, signInWithPopup } from 'firebase/auth'
import styled from 'styled-components'
import { useUserStore } from '../store/useUserStore'

const LoginPage = () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const { setUserInfo } = useUserStore()

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        setUserInfo(result.user)
      })
      .catch((error) => alert(error))
  }

  return (
    <LoginContainer>
      <Content>
        <Center>
          <LoginButton onClick={handleAuth}>구글로그인</LoginButton>
          <Description>구글 계정으로 로그인 후 관심영화 저장 및 조회가 가능합니다.</Description>
        </Center>
      </Content>
    </LoginContainer>
  )
}

export default LoginPage

const LoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`
const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  margin-bottom: 10vh;
`
const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  font-weight: 700;
  color: var(--colors-light);
  background-color: var(--colors-green);
  margin-bottom: 12px;
  font-size: 18px;
  padding: 16px 5;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--colors-middlegray);
  }
`
const Description = styled.div`
  position: relative;
`
