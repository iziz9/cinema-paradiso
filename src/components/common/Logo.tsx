import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PATH from '../../routes/routePath'
// import logo from '../../assets/logo.webp'

const Logo = () => {
  const navigate = useNavigate()
  return (
    <LogoContainer onClick={() => navigate(PATH.MAIN)}>
      {/* <img src={logo} alt="logo" /> */}
      <img src={'/logo.webp'} alt="logo" />
    </LogoContainer>
  )
}
const LogoContainer = styled.div`
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
`

export default Logo
