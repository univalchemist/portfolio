import React from 'react'
import classNames from 'classnames'

import './styles.scss'

interface Props {
  className?: string
}

const Divider: React.FC<Props> = ({ className }) => (
  <div className={classNames('w-100 item-divider', className)} />
)

export default Divider
