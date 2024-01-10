import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PATH from '../../routes/routePath'
import InnerLayout from './InnerLayout'
import { MyPageIcon } from '../../constants/icon'
import { useMediaQuery } from 'react-responsive'
import { useSearchValueStore } from '../../store/searchValueStore'

const Header = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)'
  })
  const { setSearchValue } = useSearchValueStore()

  const goToMain = () => {
    setSearchValue('')
    navigate(PATH.MAIN)
  }

  return (
    <HeaderContainer>
      <InnerLayout>
        <div className="layout">
          <div className="logo">
            <img src="/logo.webp" alt="logo" onClick={goToMain} />
          </div>
          <button className="mypage" aria-label="마이페이지" onClick={() => navigate(PATH.MYPAGE)}>
            {isMobile ? (
              <MyPageIcon width={'2rem'} height={'2rem'} />
            ) : (
              <MyPageIcon width={'2.5rem'} height={'2.5rem'} />
            )}
          </button>
        </div>
      </InnerLayout>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: var(--height-header-pc);

  .layout {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      position: relative;
      text-align: center;
      width: 120px;
      height: 54px;

      img {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }

    button {
      color: var(--colors-green);

      &:hover {
        color: var(--colors-gray);
      }
    }
  }

  @media (max-width: 833px) {
    height: var(--height-header-mobile);

    img {
      width: 90px;
      height: 40.5px;
    }
  }
`
export default Header
