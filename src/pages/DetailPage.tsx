import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BookmarkBlankIcon } from '../constants/icon'
import RecommendList from '../components/carousel/RecommendList'
import { useParams } from 'react-router-dom'
import { getMovieCredits, getMovieDetail, getMovieSimilar } from '../api/movieRequest'
import { IMovieCredits, IMovieDetail, IMovieInfo } from '../types/types'
import { useMovieDetailStore } from '../store/movieDetailStore'
import { useRecommendMovieStore } from '../store/recommendMovieStore'
import { recommendListTitle } from '../constants/defaultValues'

const POSTER_BASE_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'
const BACKGROUND_URL = 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces'
const MAX_CAST_NUMBER = 6

const DetailPage = () => {
  const params = useParams()
  const [movieDetails, setMovieDetails] = useState<IMovieDetail>()
  const [movieCredits, setMovieCredits] = useState<IMovieCredits>()
  const [similarMovies, setSimilarMovies] = useState<IMovieInfo[]>([])
  const [directorName, setDirectorName] = useState<string>('')
  const { cachedMovieDetail, setCachedMovieDetail } = useMovieDetailStore()
  const { cachedRecommendMovie } = useRecommendMovieStore()

  useEffect(() => {
    const getCachedData = (id: string) => {
      if (!cachedMovieDetail[id]) return false
      return cachedMovieDetail[id]
    }
    const requestGetMovieDetail = async (id: string) => {
      const cachedData = getCachedData(id)
      if (cachedData) {
        setMovieDetails(cachedData.details)
        setMovieCredits(cachedData.credits)
        setSimilarMovies(cachedData.similar)
      } else {
        const detailsRes = await getMovieDetail(params.id || '')
        setMovieDetails(detailsRes)
        const creditsRes = await getMovieCredits(params.id || '')
        setMovieCredits(creditsRes)
        const similarRes = await getMovieSimilar(params.id || '')
        setSimilarMovies(similarRes)

        const allDetails = { details: detailsRes, credits: creditsRes, similar: similarRes }
        setCachedMovieDetail(id, allDetails)
      }
    }
    params.id && requestGetMovieDetail(params.id)
    //eslint-disable-next-line
  }, [params])

  useEffect(() => {
    movieCredits?.crew.forEach((crew) => {
      if (crew.job === 'Director') setDirectorName(crew.name)
    })
  }, [movieCredits])

  return (
    <Container>
      {movieDetails && movieCredits && (
        <>
          <DetailSection $backdrop={movieDetails.backdrop_path}>
            <DetailBookmark>
              <button>
                <BookmarkBlankIcon />
                <span>관심등록</span>
              </button>
              {/* <button>
                <BookmarkFillIcon />
                <span>관심삭제</span>
              </button> */}
            </DetailBookmark>
            <DetailInfo>
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
                  <span>{movieDetails.release_date.replaceAll('-', '.')}</span>
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
              </div>
            </DetailInfo>
            <DetailOverview>
              <h2>줄거리</h2>
              {movieDetails.overview || '줄거리 미제공'}
            </DetailOverview>
          </DetailSection>
          {similarMovies.length ? (
            <RelatedSection>
              {/* <RecommendList title={`<${movieDetails.title}> 비슷한 영화`} movieList={similarMovies} /> */}
            </RelatedSection>
          ) : (
            <RelatedSection>
              {/* <RecommendList
                title={recommendListTitle.trending}
                movieList={cachedRecommendMovie[recommendListTitle.trending]}
              /> */}
            </RelatedSection>
          )}
        </>
      )}
    </Container>
  )
}

const Container = styled.main`
  position: relative;
`

const DetailSection = styled.section<{ $backdrop?: string }>`
  position: relative;
  text-align: center;
  margin-top: 10px;
  padding: 30px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::before {
    content: '';
    background: ${(props) => (props.$backdrop ? `url(${BACKGROUND_URL + props.$backdrop}) ` : '#48484830')};
    opacity: 0.2;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
`

const DetailInfo = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .poster {
    position: relative;
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

const DetailBookmark = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: end;

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

const DetailOverview = styled.div`
  position: relative;
  line-height: 1.5rem;
  padding: 0 32px;
  text-align: left;

  h2 {
    display: block;
    font-weight: 600;
    margin-right: 10px;
    word-break: keep-all;
    color: var(--colors-green);
  }

  @media (max-width: 560px) {
    padding: 0;
  }
`

const RelatedSection = styled.section``

export default DetailPage
