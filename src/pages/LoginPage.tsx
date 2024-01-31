import { GoogleAuthProvider, UserCredential, getAuth, signInWithPopup } from 'firebase/auth'
import styled from 'styled-components'
import { useUserStore } from '../store/useUserStore'
import { notify } from '../components/layout/Toast'
import { GoogleIcon } from '../constants/icon'

const LoginPage = () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const { setUserInfo } = useUserStore()

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        setUserInfo(result.user)
        notify({ type: 'success', text: '로그인 되었습니다.' })
      })
      .catch((error) => notify({ type: 'error', text: '정상적으로 로그인 되지 않았습니다. 다시 시도해주세요.' }))
  }

  return (
    <LoginContainer>
      <Content>
        <LoginImg src="/login_img.webp" alt="로그인 이미지" />
        <Center>
          <LoginButton onClick={handleAuth}>
            <GoogleIcon />
            <span>구글 로그인</span>
          </LoginButton>
          <Description>로그인 후 관심영화 등록 서비스를 이용하실 수 있습니다.</Description>
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
  height: 80vh;
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
  padding: 60px 40px;
`
const LoginImg = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 12px;
`
const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  color: var(--colors-light);
  border: 1px solid var(--colors-green);
  margin-bottom: 12px;
  font-size: 1.1rem;
  padding: 16px 5;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover {
    border: 1px solid var(--colors-middlegray);
    background-color: var(--colors-middlegray);
  }
`
const Description = styled.div`
  position: relative;
  line-height: 1.2;
  color: var(--colors-gray);
`
