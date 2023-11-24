import React from 'react'
import styled from 'styled-components'
import SearchBar from '../components/search/SearchBar'

const MainPage = () => {
  return (
    <MainContainer>
      <SearchBar />
      <div className="favorite">
        <img src="/logo.webp" alt="img" /> <img src="/logo.webp" alt="img" /> <img src="/logo.webp" alt="img" />
      </div>
      <div className="favorite">
        <img src="/logo.webp" alt="img" /> <img src="/logo.webp" alt="img" /> <img src="/logo.webp" alt="img" />
      </div>
      <div className="favorite">
        <img src="/logo.webp" alt="img" /> <img src="/logo.webp" alt="img" /> <img src="/logo.webp" alt="img" />
      </div>
    </MainContainer>
  )
}

const MainContainer = styled.main`
  height: 900px;

  .favorite {
    width: 90%;
    margin: 25px auto;
    background-color: #96969645;
    display: flex;
    justify-content: center;

    img {
      width: 200px;
      height: auto;
    }
  }
`

export default MainPage
