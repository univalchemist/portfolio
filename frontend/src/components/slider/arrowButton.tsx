import React from 'react'
import classNames from 'classnames'

import { Icon } from '@components/index'

interface Props {
  icon: string
  className?: string
  onClick?: () => void
}

const ArrowButton: React.FC<Props> = ({ onClick, icon, className }) => (
  <button onClick={onClick} className={classNames('slide-arrow', className)}>
    <Icon name={icon} />
  </button>
)

export default ArrowButton
