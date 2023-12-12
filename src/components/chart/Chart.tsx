import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, Text } from 'recharts'
import styled from 'styled-components'

const data = [
  { name: 'SF', value: 400 },
  { name: '로맨스', value: 300 },
  { name: '가족', value: 300 },
  { name: '액션', value: 200 },
  { name: '공포', value: 200 },
  { name: '스릴러', value: 400 },
  { name: '드라마', value: 100 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00CFF8', '#FF2003', '#00BB2F']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" name="favorite">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const Chart = () => {
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
