import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import styled from 'styled-components'
import { COLOR_LIST, renderCustomizedLabel } from './ChartSettings'
import { IMovieInfo } from '../../types/types'
import { useEffect, useState } from 'react'
import { genresId } from '../../constants/defaultValues'
import { ITotalResults } from '../../types/hooksTypes'

const data = [
  { name: 'SF', value: 400 },
  { name: '로맨스', value: 300 },
  { name: '가족', value: 300 },
  { name: '액션', value: 200 },
  { name: '공포', value: 200 },
  { name: '스릴러', value: 400 },
  { name: '드라마', value: 100 }
]

const Chart = ({ myWatchList, totalResults }: { myWatchList: IMovieInfo[]; totalResults: ITotalResults }) => {
  const [favoriteGenre, setFavoriteGenre] = useState<number>(0)
  const [chartData, setChartData] = useState({})

  useEffect(() => {
    //페이지 여러개면?
  }, [myWatchList])

  return (
    <ChartContainer>
      <Inner>
        <div className="desc">
          <p>관심 영화 {totalResults.totalCount}개 중,</p>
          <p>
            <span>{'??'}</span> 장르가 가장 많아요!
          </p>
        </div>
        <PieChart width={300} height={280} className="chart">
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" iconType="plainline" />
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLOR_LIST[index % COLOR_LIST.length]} />
            ))}
          </Pie>
        </PieChart>
      </Inner>
    </ChartContainer>
  )
}

const ChartContainer = styled.section`
  position: relative;
  background-color: var(--colors-darkgray);
`
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .desc {
    width: 100%;
    padding: 10px 0 0;
    display: flex;
    flex-direction: column;
    margin: auto;
    text-align: center;
    font-weight: 600;
    gap: 6px;

    p {
      font-size: 1.1rem;
      font-weight: 700;
    }
    span {
      color: var(--colors-green);
      font-size: 1.2rem;
    }
  }

  .chart {
    position: relative;
    margin: auto;
  }
`

export default Chart
