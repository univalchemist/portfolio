import React from 'react'
import classNames from 'classnames'

import { Children } from '@root/types'

interface Props {
  children: Children
  className?: string
}

const SliderItem: React.FC<Props> = ({ children, className }) => {
  return <div className={classNames(className, 'slider-item')}>{children}</div>
}

export default SliderItem
