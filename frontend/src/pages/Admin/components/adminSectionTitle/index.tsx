import React from 'react'
import classNames from 'classnames'

import { KeyValue } from '@root/types'

interface Props {
  title: string
  align?: 'left' | 'right' | 'center'
  className?: string
  titleClass?: string
}

const AdminSectionTitle: React.FC<Props & KeyValue<any>> = ({
  title,
  align = 'left',
  className,
  titleClass,
  ...rest
}) => {
  return (
    <div
      className={classNames(`admin-section-title text-${align}`, className)}
      {...rest}
    >
      {title && <h3 className={titleClass}>{title}</h3>}
    </div>
  )
}

export default AdminSectionTitle
