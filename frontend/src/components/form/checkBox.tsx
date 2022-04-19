import React from 'react'
import classNames from 'classnames'

import { KeyValue } from '@root/types'

interface Props {
  className?: string
  id?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
}

const CheckBox: React.FC<Props & KeyValue<any>> = React.forwardRef<
  HTMLInputElement,
  Props
>(({ id, name, className, size = 'lg', ...rest }, ref) => {
  return (
    <input
      className={classNames('form-control', `form-control-${size}`, className)}
      name={id}
      id={name}
      type="checkbox"
      ref={ref}
      {...rest}
    />
  )
})

export default CheckBox
