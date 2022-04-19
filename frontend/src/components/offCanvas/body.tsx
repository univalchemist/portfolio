import React from 'react'
import classNames from 'classnames'

import { Children } from '@root/types'

interface Props {
  className?: string
  children: Children
}

const OffCanvasBody: React.FC<Props> = ({ children, className }) => {
  return <div className={classNames(className, 'content')}>{children}</div>
}

export default OffCanvasBody
