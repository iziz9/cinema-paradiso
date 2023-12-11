import React from 'react'
import Chart from '../components/chart/Chart'
import styled from 'styled-components'
import RecommendList from '../components/recommend/RecommendList'

const MyPage = () => {
  const data = []
  if (data.length < 1)
    //api데이터
    return (
      <MyPageContainer>
        <div className="no-result">
          <p>좋아하는 영화, 보고싶은 영화를 관심 등록 해 보세요!</p>
          <p>나의 취향에 맞는 영화를 추천받을 수 있어요.</p>
          <div className="example">
            <img src="/mypage_example.webp" alt="관심영화 등록 방법" />
            <span>관심 영화 등록하는 방법</span>
          </div>
        </div>
        <RecommendList title={'관객 평점이 가장 높은 영화'} />
        <RecommendList title={'지금 가장 인기있는 영화'} />
      </MyPageContainer>
    )
  return (
    <MyPageContainer>
      <Chart />
      <RecommendList title={'관심 등록한 영화'} />
      <RecommendList title={'취향 저격 추천 영화'} />
    </MyPageContainer>
  )
}

const MyPageContainer = styled.main`
  position: relative;

  .no-result {
    background-color: var(--colors-transgray);
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 40px 0;
    margin: auto;
    text-align: center;
    font-size: 1.2rem;

    .example {
      display: flex;
      flex-direction: column;
      gap: 5px;

      img {
        position: relative;
        width: 50%;
        height: auto;
        margin: 20px auto 0;
        border: 1px solid var(--colors-green);
        border-radius: 16px;
      }

      span {
        position: relative;
        font-size: 0.9rem;
        color: var(--colors-green);
      }
    }

    @media (max-width: 833px) {
      font-size: 1.1rem;
      .example {
        img {
          width: 80%;
        }
      }
    }
  }
`

export default MyPage
