import React from 'react'

import { Children } from '@root/types'

interface Props {
  className?: string
  htmlFor: string
  children: Children
}

const Label: React.FC<Props> = ({ htmlFor, className, children }) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  )
}

export default Label
