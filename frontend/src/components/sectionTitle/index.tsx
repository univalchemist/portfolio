import React from 'react'
import classNames from 'classnames'

import { Maybe } from '@graphql/graphql'
import { KeyValue } from '@root/types'

interface Props {
  title: string
  subtitle: Maybe<string>
  align?: 'left' | 'right' | 'center'
  className?: string
  titleClass?: string
}

const SectionTitle: React.FC<Props & KeyValue<any>> = ({
  title,
  subtitle,
  align = 'left',
  className,
  titleClass,
  ...rest
}) => {
  return (
    <div
      className={classNames(`section-title text-${align}`, className)}
      {...rest}
    >
      {subtitle && <span className="subtitle">{subtitle}</span>}
      {title && <h2 className={classNames('title', titleClass)}>{title}</h2>}
    </div>
  )
}

export default SectionTitle
