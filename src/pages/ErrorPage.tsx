import styled from 'styled-components'
import InnerLayout from '../components/style/InnerLayout'
import { useNavigate } from 'react-router-dom'
import PATH from '../routes/routePath'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <ErrorContainer>
      <InnerLayout>
        <div className="logo" onClick={() => navigate(PATH.MAIN)}>
          <img src="/logo.webp" alt="logo" />
        </div>
        <h1>404</h1>
        <h2>Page not found</h2>
        <div className="desc">존재하지 않는 페이지입니다. 경로를 확인해주세요.</div>
      </InnerLayout>
    </ErrorContainer>
  )
}

const ErrorContainer = styled.main`
  text-align: center;
  .logo {
    position: relative;
    text-align: center;
    width: 120px;
    height: 60px;
    display: flex;
    align-items: center;
    img {
      position: relative;
      width: 120px;
      height: 54px;
      cursor: pointer;
    }
  }
  h1 {
    margin: 50px auto;
    display: block;
    font-size: 50px;
    color: var(--colors-light);
  }
  h2 {
    display: block;
    font-size: 25px;
    color: var(--colors-gray);
    margin-top: 40px;
  }

  .desc {
    margin-top: 16px;
    color: var(--colors-gray);
  }
`

export default ErrorPage
