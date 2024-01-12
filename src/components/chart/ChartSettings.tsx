export const COLOR_LIST = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00CFF8', '#FF2003', '#00BB2F']

const RADIAN = Math.PI / 180
export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" name="favorite">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
