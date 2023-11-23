import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PATH from '../../routes/routePath'
import InnerLayout from './InnerLayout'
import { MyPageIcon } from '../../constants/icon'
import { useMediaQuery } from 'react-responsive'

const Header = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)'
  })
  return (
    <HeaderContainer>
      <InnerLayout>
        <div className="logo">
          <img src="/logo.webp" alt="logo" onClick={() => navigate(PATH.MAIN)} />
        </div>
        <button className="mypage" onClick={() => navigate(PATH.MYPAGE)}>
          {isMobile ? <MyPageIcon width={'2rem'} height={'2rem'} /> : <MyPageIcon width={'2.5rem'} height={'2.5rem'} />}
        </button>
      </InnerLayout>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;

  .logo {
    height: 100%;
    display: flex;
    img {
      display: block;
      width: 120px;
      height: 54px;
      margin: auto auto;
      cursor: pointer;
    }
  }

  button {
    position: absolute;
    top: 0;
    right: 15px;
    height: 100%;
    color: var(--colors-green);

    &:hover {
      color: var(--colors-gray);
    }
  }

  @media (max-width: 833px) {
    height: 60px;
    .logo {
      img {
        width: 90px;
        height: 40.5px;
      }
    }
  }
`
export default Header
