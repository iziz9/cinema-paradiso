import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PATH from '../../routes/routePath'
import InnerLayout from '../style/InnerLayout'
import { MyPageIcon } from '../../constants/icon'
import SearchBar from '../search/SearchBar'
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Logo from '../common/Logo'
import { useUserStore } from '../../store/useUserStore'
import { notify } from './Toast'
import { INewWatchListResult } from '../../types/types'
import { getAllUsersLists, postNewUsersList } from '../../api/watchListRequest'
import { getAllPageDatas } from '../../utils/getAllPageDatas'

const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const DropDownRef = useRef<HTMLUListElement>(null)
  const [isDropDownOpen, setisDropDownOpen] = useState<boolean>(false)
  const [allUsersLists, setAllUsersLists] = useState<INewWatchListResult[]>([])
  const auth = getAuth()
  const { userInfo, setUserInfo, userListId, setUserListId } = useUserStore()

  useEffect(() => {
    const getAllListData = async () => {
      const usersListRes = await getAllUsersLists(1)
      setAllUsersLists(usersListRes.results)

      if (usersListRes.total_pages > 1) {
        getAllPageDatas({
          request: getAllUsersLists,
          totalPages: usersListRes.total_pages,
          listId: userListId,
          setAllDataList: setAllUsersLists
        })
      }
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('상태변경')
        getAllListData()
      } else {
        pathname === PATH.MYPAGE && navigate(PATH.LOGIN)
      }
    })
  }, [auth])

  useEffect(() => {
    if (!allUsersLists.length) return

    let tempUsersListId = 0
    allUsersLists.forEach((usersList) => {
      if (usersList.name === userInfo.uid) {
        tempUsersListId = usersList.id
        setUserListId(usersList.id)
      }
    })
    if (!tempUsersListId) {
      postNewUsersList(userInfo.uid)
    }
  }, [allUsersLists])

  const goToLoginPage = () => {
    navigate(PATH.LOGIN)
  }
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserInfo({} as User)
        setUserListId(0)
        navigate(PATH.MAIN)
        notify({ type: 'success', text: '로그아웃 되었습니다.' })
      })
      .catch((error) => notify({ type: 'error', text: '정상적으로 로그아웃 되지 않았습니다. 다시 시도해주세요.' }))
  }

  return (
    <HeaderContainer>
      <InnerLayout>
        <div className="layout">
          <Logo />
          {userInfo.uid ? (
            <Users>
              <LoginStateButton onClick={handleLogOut}>LOGOUT</LoginStateButton>
              <MyPageButton aria-label="마이페이지" onClick={() => navigate(PATH.MYPAGE)}>
                {userInfo.photoURL ? (
                  <img src={userInfo.photoURL} alt={userInfo.displayName || '프로필이미지'} />
                ) : (
                  <MyPageIcon width={'2.5rem'} height={'2.5rem'} />
                )}
              </MyPageButton>
            </Users>
          ) : (
            <Users>
              <LoginStateButton onClick={goToLoginPage}>LOGIN</LoginStateButton>
            </Users>
          )}
        </div>
        {pathname === PATH.MAIN || pathname === PATH.SEARCH ? (
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
    height: var(--height-header-layout);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const Users = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
const LoginStateButton = styled.button`
  width: 80px;
  height: 30px;
  border: 1px solid var(--colors-green);
  border-radius: 4px;
  color: var(--colors-green);
  font-size: 14px;
  font-weight: 700;

  &:hover {
    background-color: var(--colors-gray);
    color: var(--colors-dark);
    border: 1px solid var(--colors-dark);
  }
`
const MyPageButton = styled.button`
  color: var(--colors-green);
  width: 2.5rem;
  height: 2.5rem;

  &:hover {
    color: var(--colors-gray);
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid var(--colors-gray);
    border-radius: 100%;
    background-color: var(--colors-gray);
    box-sizing: border-box;
    margin: auto;

    &:hover {
      scale: 1.1;
    }
  }
`
export default Header
