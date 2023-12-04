import React from 'react'
import styled from 'styled-components'

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
            <h2>개봉연도</h2>
            <span>2023</span>
          </div>
          <div className="row">
            <h2>감독</h2>
            <span>credits / directing </span>
          </div>
          <div className="row">
            <h2>장르</h2>
            <span className="genere">애니메이션</span>
            <span className="genere">가족</span>
            <span className="genere">음악</span>
            <span className="genere">판타지</span>
          </div>
          <div className="row">
            <h2>출연</h2>
            <span>Anna Kendrick</span>
            <span>Anna Kendrick</span>
            <span>Anna Kendrick</span>
            <span>Anna Kendrick</span>
            <span>...</span>
          </div>
          <HeartSection>❤️ 관심목록에 추가</HeartSection>
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
  background-color: #ffffff1b;
  border-radius: 10px;
  text-align: center;
  padding: 16px;
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
    background-color: blanchedalmond;

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
    gap: 8px;

    .row {
      display: flex;
      gap: 15px;

      h1 {
        font-size: 1.7rem;
        margin: 0 auto 16px;
        font-weight: 700;
      }
      h2 {
        font-weight: 600;
      }
      span {
      }
    }
  }

  @media (max-width: 560px) {
    display: flex;
    flex-direction: column;
  }
`

const HeartSection = styled.section`
  position: relative;
`

const LowerSection = styled.section`
  position: relative;
  line-height: 1.5rem;
`

export default DetailPage
