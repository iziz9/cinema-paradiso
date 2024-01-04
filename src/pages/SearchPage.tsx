import React, { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import SearchBar from '../components/search/SearchBar'
import { useNavigate } from 'react-router-dom'

const SearchPage = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 833px)'
  })
  const navigate = useNavigate()
  const DropDownRef = useRef<HTMLUListElement>(null)
  const [isDropDownOpen, setisDropDownOpen] = useState<boolean>(false)
  const [focusedMovieId, setFocusedMovieId] = useState<number>(-1) // 영화 아이디, 타이틀과 같을 경우 overlay 표시
  const movieId = 1903

  return (
    <SearchPageContainer>
      <SearchBar isDropDownOpen={isDropDownOpen} setIsDropDownOpen={setisDropDownOpen} dropDownRef={DropDownRef} />
      <ListContainer>
        <ListItem onClick={() => navigate(`/detail/${movieId}`, { state: { movieId } })}>
          <div className="poster">
            <img src="/poster1.jpeg" alt="poster" loading="lazy" />
          </div>
          <div className="overlay">
            <p className="title">트루먼 쇼</p>
            <p className="director">감독</p>
            <p className="genre">코미디 · 가족</p>
          </div>
        </ListItem>
        <ListItem>
          <div className="poster">
            <img src="/poster1.jpeg" alt="poster" />
          </div>
          <div className="overlay">
            <p className="title">트루먼 쇼</p>
            <p className="director">감독</p>
            <p className="genre">코미디 · 가족</p>
          </div>
        </ListItem>
        <ListItem>
          <div className="poster">
            <img src="/poster1.jpeg" alt="poster" />
          </div>
          <div className="overlay">
            <p className="title">트루먼 쇼</p>
            <p className="director">감독</p>
            <p className="genre">코미디 · 가족</p>
          </div>
        </ListItem>
        <ListItem>
          <div className="poster">
            <img src="/poster1.jpeg" alt="poster" />
          </div>
          <div className="overlay">
            <p className="title">트루먼 쇼</p>
            <p className="director">감독</p>
            <p className="genre">코미디 · 가족</p>
          </div>
        </ListItem>
        <ListItem>
          <div className="poster">
            <img src="/poster1.jpeg" alt="poster" />
          </div>
          <div className="overlay">
            <p className="title">트루먼 쇼</p>
            <p className="director">감독</p>
            <p className="genre">코미디 · 가족</p>
          </div>
        </ListItem>
        <ListItem>
          <div className="poster">
            <img src="/poster1.jpeg" alt="poster" />
          </div>
          <div className="overlay">
            <p className="title">트루먼 쇼</p>
            <p className="director">감독</p>
            <p className="genre">코미디 · 가족</p>
          </div>
        </ListItem>
        <ListItem>
          <div className="poster">
            <img src="/poster1.jpeg" alt="poster" />
          </div>
          <div className="overlay">
            <p className="title">트루먼 쇼</p>
            <p className="director">감독</p>
            <p className="genre">코미디 · 가족</p>
          </div>
        </ListItem>
        <ListItem>
          <div className="poster">
            <img src="/poster1.jpeg" alt="poster" />
          </div>
          <div className="overlay">
            <p className="title">트루먼 쇼</p>
            <p className="director">감독</p>
            <p className="genre">코미디 · 가족</p>
          </div>
        </ListItem>
        <ListItem>
          <div className="poster">
            <img src="/poster1.jpeg" alt="poster" />
          </div>
          <div className="overlay">
            <p className="title">트루먼 쇼</p>
            <p className="director">감독</p>
            <p className="genre">코미디 · 가족</p>
          </div>
        </ListItem>
      </ListContainer>
    </SearchPageContainer>
  )
}

const SearchPageContainer = styled.main`
  position: relative;
`
const ListContainer = styled.ul`
  position: relative;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: auto;
`
const ListItem = styled.li`
  position: relative;
  width: calc(100% / 5 - 16px);
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    -webkit-transform: scale(1.1); /* 크롬, 사파리 */
    -moz-transform: scale(1.1); /* 파이어폭스 */
    -ms-transform: scale(1.1); /* IE */
    -o-transform: scale(1.1); /* 오페라 */
    transition: transform 0.3s;
  }

  @media (max-width: 1024px) {
    width: calc(100% / 5 - 16px);
  }
  @media (max-width: 833px) {
    width: calc(100% / 4 - 16px);
  }
  @media (max-width: 600px) {
    width: calc(100% / 3 - 16px);
  }
  @media (max-width: 450px) {
    width: calc(100% / 2 - 16px);
  }

  .poster {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1.4; //1.3?

    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: auto;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    background: linear-gradient(to bottom, var(--colors-transdark), var(--colors-transblack));
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: end;

    .title {
      font-size: 1.3rem;
      font-weight: 700;
    }
    .director {
      margin-top: 3px;
    }
    .genre {
      font-size: 0.8rem;
    }
  }
`

export default SearchPage
