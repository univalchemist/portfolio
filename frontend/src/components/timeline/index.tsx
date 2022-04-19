import React from 'react'
import classNames from 'classnames'

import { Children } from '@root/types'

interface Props {
  className?: string
  children: Children
}

export const Timeline: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={classNames('experience-list', className)}>{children}</div>
  )
}

export { default as TimelineCard } from './timelineCard'
