import React from 'react'
import classNames from 'classnames'

import { KeyValue } from '@root/types'

interface Props {
  className?: string
  id?: string
  name?: string
  type?: string
  size?: 'sm' | 'md' | 'lg'
}

const Input: React.FC<Props & KeyValue<any>> = React.forwardRef<
  HTMLInputElement,
  Props
>(({ id, name, className, type = 'text', size = 'lg', ...rest }, ref) => {
  return (
    <input
      className={classNames('form-control', `form-control-${size}`, className)}
      name={name}
      id={id}
      type={type}
      ref={ref}
      {...rest}
    />
  )
})

export default Input
