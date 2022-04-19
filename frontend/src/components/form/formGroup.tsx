import React from 'react'
import classNames from 'classnames'

import { Children } from '@root/types'

interface Props {
  className?: string
  children: Children
}

const FormGroup: React.FC<Props> = ({ className, children }) => {
  return <div className={classNames('form-group', className)}>{children}</div>
}

export default FormGroup
