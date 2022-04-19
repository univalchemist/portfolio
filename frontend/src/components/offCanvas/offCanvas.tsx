import React, { memo } from 'react'
import classNames from 'classnames'

import { Children } from '@root/types'

interface Props {
  className?: string
  isOpen: boolean
  children: Children
  onClick: () => void
}

const OffCanvas: React.FC<Props> = memo(
  ({ children, className, isOpen, onClick }) => {
    return (
      <div
        className={classNames(
          'popup-mobile-menu',
          isOpen ? 'menu-open' : '',
          className,
        )}
        onClick={onClick}
        onKeyPress={onClick}
        role="button"
        tabIndex={0}
      >
        <div
          className="inner"
          onClick={e => e.stopPropagation()}
          onKeyPress={onClick}
          role="button"
          tabIndex={0}
        >
          {children}
        </div>
      </div>
    )
  },
)

export default OffCanvas
