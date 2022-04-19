import React from 'react'
import classNames from 'classnames'

import { Children } from '@root/types'

interface Props {
  path: string
  children: Children
  title?: string
  className?: string
}

const SocialLink: React.FC<Props> = ({ path, children, title, className }) => {
  return (
    <li className={classNames(className)}>
      <a href={path} target="_blank" rel="noopener noreferrer" title={title}>
        {children}
      </a>
    </li>
  )
}

export default SocialLink
