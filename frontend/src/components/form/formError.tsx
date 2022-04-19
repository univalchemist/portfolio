import React from 'react'
import classNames from 'classnames'

import { Children } from '@root/types'

interface Props {
  className?: string
  children: Children
}

const FormError: React.FC<Props> = ({ className, children }) => {
  return (
    <span
      className={classNames(
        'text-red mt-2 d-inline-block form-error',
        className,
      )}
    >
      {children}
    </span>
  )
}

export default FormError
