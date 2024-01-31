import styled from 'styled-components'
import InnerLayout from '../components/style/InnerLayout'
import Logo from '../components/common/Logo'

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <InnerLayout>
        <Logo />
        <h1>404</h1>
        <h2>Page not found</h2>
        <div className="desc">존재하지 않는 페이지입니다. 경로를 확인해주세요.</div>
      </InnerLayout>
    </ErrorContainer>
  )
}

const ErrorContainer = styled.main`
  text-align: center;

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
