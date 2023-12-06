import React from 'react'
import styled from 'styled-components'
import { BookmarkBlankIcon, BookmarkFillIcon } from '../constants/icon'

const DetailPage = () => {
  return (
    <DetailContainer>
      <UpperSection>
        <div className="poster">
          <img src="/poster1.jpeg" alt="poster" />
        </div>
        <div className="desc">
          <div className="row">
            <h1>the TRUMAN show TRUMAN show TRUMAN show</h1>
          </div>
          <div className="row">
            <h2>개봉</h2>
            <span>2023</span>
          </div>
          <div className="row">
            <h2>감독</h2>
            <div className="director">
              <span>credits/directing</span>
            </div>
          </div>
          <div className="row">
            <h2>장르</h2>
            <div className="genere">
              <button className="genere">애니메이션</button>
              <button className="genere">가족</button>
              <button className="genere">음악</button>
              <button className="genere">판타지</button>
            </div>
          </div>
          <div className="row">
            <h2>출연</h2>
            <div className="credits">
              <span>Anna Kendrick</span>, <span>Anna Kendrick</span>, <span>Anna Kendrick</span>,
              <span>Anna Kendrick</span>, <span>...</span>
            </div>
          </div>
          <HeartSection>
            <button>
              <BookmarkBlankIcon />
              <span>관심등록</span>
            </button>
            <button>
              <BookmarkFillIcon />
              <span>관심삭제</span>
            </button>
          </HeartSection>
        </div>
      </UpperSection>
      <LowerSection>
        전 세계 모든 트롤을 열광케 했던 최고의 아이돌 그룹 ‘브로존’. 역대급 무대 실수와 형제 간의 불화로 결국 해체한 뒤,
        모두에게 잊혀 간다. 그러던 어느 날, ‘브로존’의 황금막내 ‘브랜치’는 메인보컬 ‘플로이드’가 슈퍼스타 ‘벨벳’과
        ‘비니어’에게 잡혀 재능을 빼앗기고 있다는 소식을 듣는다. 그를 구하기 위해서는 흩어져 있는 ‘브로존’을 재결합하고
        완벽한 화음을 되찾아야 하는데… 12월, 가장 짜릿한 컴백 무대의 시작!
      </LowerSection>
    </DetailContainer>
  )
}

const DetailContainer = styled.main`
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

const UpperSection = styled.section`
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

const HeartSection = styled.section`
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
  }
`

const LowerSection = styled.section`
  position: relative;
  line-height: 1.5rem;
`

export default DetailPage
