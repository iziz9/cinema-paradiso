import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BookmarkBlankIcon, BookmarkFillIcon } from '../constants/icon'
import RecommendList from '../components/recommend/RecommendList'
import { useLocation } from 'react-router-dom'
import { getMovieCredits, getMovieDetail, getMovieSimilar } from '../api/request'
import { IMovieCredits, IMovieDetail, IResultList } from '../types/types'

const DetailPage = () => {
  const location = useLocation()
  const [movieDetails, setMovieDetails] = useState<IMovieDetail>()
  const [movieCredits, setMovieCredits] = useState<IMovieCredits>()
  const [similarMovies, setSimilarMovies] = useState([])
  const [directorName, setDirectorName] = useState<string>('')
  const POSTER_BASE_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'
  const MAX_CAST_NUMBER = 6

  useEffect(() => {
    const requestGetMovieDetail = async () => {
      const detailsRes = await getMovieDetail(location.state)
      setMovieDetails(detailsRes)
      const creditsRes = await getMovieCredits(location.state)
      setMovieCredits(creditsRes)
      const similarRes = await getMovieSimilar(location.state)
      setSimilarMovies(similarRes)
    }
    requestGetMovieDetail()
  }, [location])

  useEffect(() => {
    movieCredits?.crew.forEach((crew) => {
      if (crew.job === 'Director') setDirectorName(crew.name)
    })
  }, [movieCredits])

  return (
    <Container>
      {movieDetails && movieCredits && (
        <>
          <DetailSection>
            <DetailUpper>
              <div className="poster">
                {movieDetails.poster_path ? (
                  <img src={POSTER_BASE_URL + movieDetails.poster_path} alt={movieDetails.title} />
                ) : (
                  <img src="/no_image.webp" alt="이미지 없음" />
                )}
              </div>
              <div className="desc">
                <div className="row">
                  <h1>{movieDetails.title}</h1>
                </div>
                <div className="row">
                  <h2>개봉</h2>
                  <span>{movieDetails.release_date.slice(0, 4)}</span>
                </div>
                <div className="row">
                  <h2>감독</h2>
                  <div className="director">
                    <span>{directorName}</span>
                  </div>
                </div>
                <div className="row">
                  <h2>장르</h2>
                  <div className="genere">
                    {movieDetails.genres.map((genre) => (
                      <button className="genere" key={genre.id}>
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="row">
                  <h2>출연</h2>
                  <div className="credits">
                    {movieCredits.cast.slice(0, MAX_CAST_NUMBER).map((cast, index) => (
                      <span key={index}>{cast.name}, </span>
                    ))}
                    <span>...</span>
                  </div>
                </div>
                <DetailMiddle>
                  <button>
                    <BookmarkBlankIcon />
                    <span>관심등록</span>
                  </button>
                  {/* <button>
                <BookmarkFillIcon />
                <span>관심삭제</span>
              </button> */}
                </DetailMiddle>
              </div>
            </DetailUpper>
            <DetailLower>{movieDetails.overview}</DetailLower>
          </DetailSection>
          <RelatedSection>
            <RecommendList title={`<${movieDetails.title}> 비슷한 영화`} movieList={similarMovies} />
          </RelatedSection>
        </>
      )}
    </Container>
  )
}

const Container = styled.main`
  position: relative;
`

const DetailSection = styled.section`
  position: relative;
  background-color: #48484830; //url
  text-align: center;
  margin-top: 10px;
  padding: 30px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const DetailUpper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .poster {
    position: relative;
    /* width: 30%; */
    margin: auto;

    img {
      position: relative;
      width: 100%;
      max-width: 250px;
      aspect-ratio: 1/1.3;
      object-fit: contain;
      margin: auto auto;
    }
  }

  .desc {
    width: 65%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    line-height: 1.5rem;
    margin: auto auto;

    .row {
      display: flex;

      h1 {
        font-size: 1.7rem;
        margin: 0 auto 20px;
        font-weight: 900;
      }
      h2 {
        display: block;
        font-weight: 600;
        margin-right: 10px;
        word-break: keep-all;
        color: var(--colors-green);
      }

      .genere,
      .credits,
      .director {
        text-align: left;
        button {
          color: white;
          background-color: #a1ba5049;
          border-radius: 8px;
          padding: 2px 5px;
          margin-right: 5px;
        }
      }
    }
  }

  @media (max-width: 560px) {
    display: flex;
    flex-direction: column;

    .desc {
      width: 100%;
      .row {
        h1 {
          font-size: 1.3rem;
          word-break: break-all;
        }
      }
    }

    .poster {
      width: 60%;
      margin-bottom: 20px;
    }
  }
`

const DetailMiddle = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: end;
  gap: 10px;

  button {
    color: #ffffff55;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 14px;
    }
    &:hover {
      color: var(--colors-green);
    }
  }
`

const DetailLower = styled.div`
  position: relative;
  line-height: 1.5rem;
`

const RelatedSection = styled.section``

export default DetailPage
