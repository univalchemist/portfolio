import React from 'react'

interface Props {
  active?: boolean
  payload?: any[]
}

const CustomTooltip: React.FC<Props> = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="custom-chart-tooltip">
        {payload.map(_payload => (
          <div key={_payload.dataKey} className="chart-info-container">
            <div className="chart-label">{`${_payload.dataKey} : ${_payload.value}`}</div>
            {Object.entries(
              _payload.payload?.[`${_payload.dataKey}_from`] || {},
            ).map(([platform, count]) => (
              <div
                key={platform}
                className="chart-desc"
              >{`${platform}: ${count}`}</div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default CustomTooltip
