import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import styled from 'styled-components'
import { COLOR_LIST, renderCustomizedLabel } from './ChartSettings'
import { IMovieInfo } from '../../types/types'

const data = [
  { name: 'SF', value: 400 },
  { name: '로맨스', value: 300 },
  { name: '가족', value: 300 },
  { name: '액션', value: 200 },
  { name: '공포', value: 200 },
  { name: '스릴러', value: 400 },
  { name: '드라마', value: 100 }
]

const Chart = ({ watchList }: { watchList: IMovieInfo[] }) => {
  // const [chartValue, setChartValue] = useState([])

  // useEffect(() => {
  //   // 목록에서 차트 데이터 추출하기
  //   const initialValue = 0
  //   const filteredValue = watchList.reduce((acc, cur) => {
  //     //cur.genre_ids.map(id => setChartValue(name 이미 있으면 value:+1, 없으면 {name:id, value:1}))
  //     // 장르 id로 저장하고 장르목록 import해와서 차트 컴포넌트에서 텍스트로 바꾸기
  //     // return {name: cur.genre_ids, value: value+1}
  //   }, initialValue)
  //   // setChartValue(filteredValue)
  // }, [watchList])

  return (
    <ChartContainer>
      <Inner>
        <div className="desc">
          <p>관심 영화 {'n'}개 중,</p>
          <p>
            <span>{'SF'}</span> 장르가 가장 많아요!
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
    padding: 20px 0 0;
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
