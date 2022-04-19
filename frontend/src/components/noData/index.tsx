import React from 'react'
import classNames from 'classnames'

import './styles.scss'

interface Props {
  className?: string
  text?: string
}

const NoData: React.FC<Props> = ({ className, text }) => {
  return (
    <div className={classNames('no-data-container py-4', className)}>
      <div className="no-data-text">{text || 'No data found'}</div>
    </div>
  )
}

export default NoData
