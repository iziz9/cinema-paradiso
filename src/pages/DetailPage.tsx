import React from 'react'
import styled from 'styled-components'
import { BookmarkBlankIcon, BookmarkFillIcon } from '../constants/icon'
import RecommendList from '../components/recommend/RecommendList'

const DetailPage = () => {
  return (
    <Container>
      <DetailSection>
        <DetailUpper>
          <div className="poster">
            <img src="/poster1.jpeg" alt="poster" />
          </div>
          <div className="desc">
            <div className="row">
              <h1>트루먼 쇼</h1>
            </div>
            <div className="row">
              <h2>개봉</h2>
              <span>1998</span>
            </div>
            <div className="row">
              <h2>감독</h2>
              <div className="director">
                <span>Peter Weir</span>
              </div>
            </div>
            <div className="row">
              <h2>장르</h2>
              <div className="genere">
                <button className="genere">코미디</button>
                <button className="genere">드라마</button>
              </div>
            </div>
            <div className="row">
              <h2>출연</h2>
              <div className="credits">
                <span>Jim Carrey</span>, <span>Layra Linney</span>, <span>Noah Emmerich</span>,
                <span>Natascha McElhone</span>, <span>Holland Taylor</span>, <span>...</span>
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
        <DetailLower>
          트루먼 버뱅크는 작고 조용한 섬마을에 사는 평범한 세일즈맨이다. 그런 그가 자신의 삶에 대해 의문을 갖기 시작한
          것은 평소와 다름없이 평범한 어느 날, 갑자기 하늘에서 촬영용 조명등이 떨어지고, 어렸을 적 자신이 익사를 직접
          목격했던 아버지가 살아오고, 또 누군가에 의해 끌려가는 등 상식 밖의 일들이 벌어지고 나서부터였다. 평생을 그다지
          신경쓰지 않고 지냈던 일상이었지만 주변을 보니 이상한 일이 너무 많았다. 결국 자신이 특별한 상황에 놓여있다는
          확신을 하게된 트루먼은 첫사랑 실비아의 모든 것이 다 거짓라는 말을 되새기며 일상으로부터 탈출을 결심하게
          되는데...
        </DetailLower>
      </DetailSection>
      <RelatedSection>
        <RecommendList title={`<${'RRR'}> 비슷한 영화`} />
      </RelatedSection>
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
    width: 30%;
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
