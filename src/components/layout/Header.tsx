import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PATH from '../../routes/routePath'
import InnerLayout from './InnerLayout'
import { MyPageIcon } from '../../constants/icon'
import SearchBar from '../search/SearchBar'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const DropDownRef = useRef<HTMLUListElement>(null)
  const [isDropDownOpen, setisDropDownOpen] = useState<boolean>(false)

  const goToMain = () => {
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
            <MyPageIcon width={'2.5rem'} height={'2.5rem'} />
          </button>
        </div>
        {location.pathname === PATH.MAIN || location.pathname === PATH.SEARCH ? (
          <SearchBar isDropDownOpen={isDropDownOpen} setIsDropDownOpen={setisDropDownOpen} dropDownRef={DropDownRef} />
        ) : null}
      </InnerLayout>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;

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
`
export default Header
