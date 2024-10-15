import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BookmarkBlankIcon, BookmarkFillIcon } from '../constants/icon'
import RecommendCarousel from '../components/carousel/RecommendCarousel'
import { useParams } from 'react-router-dom'
import { getMovieCredits, getMovieDetail } from '../api/movieRequest'
import { IMovieCredits, IMovieDetail } from '../types/types'
import { useMovieDetailStore } from '../store/movieDetailStore'
import { BACKGROUND_URL, DETAIL_POSTER_BASE_URL, MAX_CAST_NUMBER } from '../constants/defaultValues'
import { notify } from '../components/layout/Toast'
import { useUserStore } from '../store/userStore'
import { getMovieIncludingStatus, postAddMovie, postRemoveMovie } from '../api/watchListRequest'
import Loading from '../components/common/Loading'

const DetailPage = () => {
  const params = useParams()
  const movieId = params.id
  const [inMyWatchList, setInMyWatchList] = useState<boolean>(false)
  const [movieDetails, setMovieDetails] = useState<IMovieDetail>()
  const [movieCredits, setMovieCredits] = useState<IMovieCredits>()
  const [directorName, setDirectorName] = useState<string>('')
  const { cachedMovieDetail, setCachedMovieDetail } = useMovieDetailStore()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { userInfo, userListId } = useUserStore()

  useEffect(() => {
    if (!movieId) return

    const getCachedData = (id: string) => {
      if (!cachedMovieDetail[id]) return false
      return cachedMovieDetail[id]
    }

    const requestGetMovieDetail = async (id: string) => {
      const cachedData = getCachedData(id)
      if (cachedData) {
        setMovieDetails(cachedData.details)
        setMovieCredits(cachedData.credits)
        setIsLoading(false)
      } else {
        Promise.all([getMovieDetail(id), getMovieCredits(id)]).then((results) => {
          const details = results[0]
          const credits = results[1]
          if (details) {
            setMovieDetails(details)
            setCachedMovieDetail(id, 'details', details)
          }
          if (credits) {
            setMovieCredits(credits)
            setCachedMovieDetail(id, 'credits', credits)
          }
          setIsLoading(false)
        })
      }
    }

    const requestGetMyAccountState = async (movieId: string) => {
      const watchlistRes = await getMovieIncludingStatus(userListId, +movieId)
      setInMyWatchList(watchlistRes.item_present)
    }

    if (userInfo.uid) requestGetMyAccountState(movieId)
    requestGetMovieDetail(movieId)

    //eslint-disable-next-line
  }, [params])

  useEffect(() => {
    movieCredits?.crew.forEach((crew) => {
      if (crew.job === 'Director') setDirectorName(crew.name)
    })
  }, [movieCredits])

  const checkUserLogin = () => {
    if (!userInfo.uid) {
      notify({ type: 'warning', text: '로그인 후 이용 가능합니다.' })
      return false
    } else return true
  }

  const addToMyWatchList = async () => {
    const loginMember = checkUserLogin()
    if (!loginMember || !movieId) return

    const res = await postAddMovie(userListId, +movieId)
    if (res?.success) {
      setInMyWatchList(true)
    }
  }

  const removeFromMyWatchList = async () => {
    const loginMember = checkUserLogin()
    if (!loginMember || !movieId) return
    const res = await postRemoveMovie(userListId, +movieId)
    if (res.success) {
      setInMyWatchList(false)
    }
  }

  if (isLoading) {
    return (
      <Container>
        <div className="no-result">
          <Loading />
        </div>
      </Container>
    )
  }

  if (!isLoading && !movieDetails && !movieCredits) {
    return (
      <Container>
        <div className="no-result">
          <span>영화 정보를 불러올 수 없습니다.</span>
          <span>인터넷 연결 상태를 확인해주세요.</span>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      {movieDetails && movieCredits && (
        <>
          <DetailSection $backdrop={movieDetails.backdrop_path}>
            <DetailBookmark>
              {inMyWatchList ? (
                <button className="delete-button" onClick={() => removeFromMyWatchList()}>
                  <BookmarkFillIcon />
                  <span>관심삭제</span>
                </button>
              ) : (
                <button onClick={() => addToMyWatchList()}>
                  <BookmarkBlankIcon />
                  <span>관심등록</span>
                </button>
              )}
            </DetailBookmark>
            <DetailInfo>
              <div className="poster">
                {movieDetails.poster_path ? (
                  <img src={DETAIL_POSTER_BASE_URL + movieDetails.poster_path} alt={movieDetails.title} />
                ) : (
                  <img src={'/no_image.webp'} alt="이미지 없음" />
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
          <RelatedSection>
            <RecommendCarousel type="similar" relatedText={`<${movieDetails.title}>`} currentMovieId={movieId} />
          </RelatedSection>
        </>
      )}
    </Container>
  )
}

const Container = styled.main`
  position: relative;

  .no-result {
    width: 100%;
    margin: 150px auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;

    span {
      font-size: 17px;
      color: #ddd;
    }
  }
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

  .delete-button {
    color: var(--colors-green);
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

const RelatedSection = styled.section`
  position: relative;
`

export default DetailPage
