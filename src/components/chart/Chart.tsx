import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import styled from 'styled-components'
import { COLOR_LIST, renderCustomizedLabel } from './ChartSettings'
import { IChartData, IChartDataArr, IMovieInfo, ITotalResults } from '../../types/types'
import { useEffect, useState } from 'react'
import { genresId, genresIdType } from '../../constants/defaultValues'
import { useMediaQuery } from 'react-responsive'

const Chart = ({ watchList, totalResults }: { watchList: IMovieInfo[]; totalResults: ITotalResults }) => {
  const [favoriteChartData, setFavoriteChartData] = useState<IChartDataArr[]>([])
  const isMobile = useMediaQuery({
    query: '(max-width: 600px)'
  })

  useEffect(() => {
    const chartData: IChartData = {}
    watchList.forEach((movie) => {
      movie.genre_ids.forEach((id) => {
        chartData[id] = chartData[id] + 1 || 1
      })
    })

    const newDataArr: IChartDataArr[] = []
    let etcCount = 0
    const sortedChartData = Object.entries(chartData).sort((a, b) => b[1] - a[1])
    sortedChartData.forEach((genre, index) => {
      if (index < 7) {
        const genreId = +genre[0]
        newDataArr.push({ name: genresId[genreId as genresIdType], value: genre[1] })
      } else {
        etcCount += genre[1]
      }
    })
    newDataArr.push({ name: '그 외', value: etcCount })
    setFavoriteChartData(newDataArr)

    //eslint-disable-next-line
  }, [watchList])

  const getFavoriteGenre = () => {
    return favoriteChartData.length ? favoriteChartData[0].name : '?'
  }

  return (
    <ChartContainer>
      <Inner>
        <div className="desc">
          <p>관심 영화 {totalResults.totalCount}개 중,</p>
          <p>
            <span>{getFavoriteGenre()}</span> 장르가 가장 많아요!
          </p>
        </div>
        <PieChart width={isMobile ? 300 : 400} height={280} className="chart">
          <Tooltip />
          <Legend
            layout={isMobile ? 'horizontal' : 'vertical'}
            align={isMobile ? 'center' : 'right'}
            verticalAlign={isMobile ? 'bottom' : 'middle'}
            iconType="plainline"
          />
          <Pie
            data={favoriteChartData}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {favoriteChartData.map((entry, index) => (
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
  padding: 15px 0 35px;
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
