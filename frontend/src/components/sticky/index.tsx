import React from 'react'
import classNames from 'classnames'

import { Children } from '@root/types'

interface Props {
  className?: string
  top?: string
  children: Children
}

const Sticky: React.FC<Props> = ({ children, className, top }) => {
  return (
    <div
      className={classNames('position-sticky sticky-top', className)}
      style={{ top }}
    >
      {children}
    </div>
  )
}

export default Sticky
