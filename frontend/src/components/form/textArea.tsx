import React from 'react'
import classNames from 'classnames'

import { KeyValue } from '@root/types'

interface Props {
  id: string
  name?: string
  className?: string
}

const Textarea: React.FC<Props & KeyValue<any>> = React.forwardRef<
  HTMLTextAreaElement,
  Props
>(({ id, name, className, ...rest }, ref) => {
  return (
    <textarea
      className={classNames('form-control', className)}
      name={name}
      id={id}
      ref={ref}
      {...rest}
    ></textarea>
  )
})

export default Textarea
