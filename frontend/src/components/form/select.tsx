import React from 'react'
import classNames from 'classnames'

import { KeyValue, ISelectOption } from '@root/types'

interface Props {
  className?: string
  id?: string
  name?: string
  options: ISelectOption[]
  size?: 'sm' | 'md' | 'lg'
}

const Select: React.FC<Props & KeyValue<any>> = React.forwardRef<
  HTMLSelectElement,
  Props
>(({ id, name, options, className, size = 'lg', ...rest }, ref) => {
  return (
    <select
      className={classNames('form-control', `form-control-${size}`, className)}
      name={name}
      id={id}
      ref={ref}
      {...rest}
    >
      {options.map((option, index) => (
        <option key={`option_${index}`} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  )
})

export default Select
