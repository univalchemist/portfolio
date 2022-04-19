import React from 'react'
import classNames from 'classnames'

import './styles.scss'

interface Props {
  className?: string
  title?: string
}

const SectionSeparator: React.FC<Props> = ({ className, title }) => {
  return (
    <div
      className={classNames(
        'w-100 position-relative my-3 subsection-separator',
        className,
      )}
    >
      {!!title && <span className="px-3">{title}</span>}
    </div>
  )
}

export default SectionSeparator
