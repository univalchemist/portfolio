import React, { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { IVisit } from '@root/types'
import { buildLineChartData } from './utils'
import CustomTooltip from './components/customTooltip'

import './styles.scss'

interface Props {
  data: IVisit[]
}

const VisitChart: React.FC<Props> = ({ data }) => {
  const chartData = useMemo(() => buildLineChartData(data), [data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={200}
        data={chartData.data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis allowDecimals={false} domain={[0, 'dataMax + 1']} />
        <Tooltip
          cursor={false}
          content={({ active, payload }) => (
            <CustomTooltip active={active} payload={payload} />
          )}
        />
        <Legend />
        {chartData.users.map(user => (
          <Line
            key={user.name}
            type="monotone"
            dataKey={user.name}
            stroke={user.color}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default VisitChart
