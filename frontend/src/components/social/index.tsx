import React from 'react'
import classNames from 'classnames'

import { Children } from '@root/types'

interface Props {
  className?: string
  children: Children
}

export const Social: React.FC<Props> = ({ className, children }) => {
  return (
    <ul className={classNames(className, 'social-share d-flex liststyle')}>
      {children}
    </ul>
  )
}

export { default as SocialLink } from './socialLink'
