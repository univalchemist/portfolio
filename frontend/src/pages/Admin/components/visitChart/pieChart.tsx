import React, { useMemo, useState } from 'react'
import { PieChart, Pie, ResponsiveContainer } from 'recharts'

import { IVisit } from '@root/types'
import { buildPieChartData } from './utils'
import ActivePieShape from './components/activePieShape'

interface Props {
  data: IVisit[]
}

const VisitPieChart: React.FC<Props> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const chartData = useMemo(() => buildPieChartData(data), [data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props: any) => <ActivePieShape {...props} />}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#20c997"
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VisitPieChart
