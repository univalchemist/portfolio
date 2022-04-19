import React from 'react'
import classNames from 'classnames'
import { X } from 'react-feather'

import Logo from '@components/logo'
import { Maybe } from '@graphql/graphql'
import { ImageType } from '@root/types'

interface Props {
  className?: string
  title?: string
  description?: Maybe<string>
  logo?: ImageType
  onClick: () => void
}

const OffCanvasHeader: React.FC<Props> = ({
  className,
  title,
  description,
  logo,
  onClick,
}) => {
  return (
    <div className={classNames('menu-top', className)}>
      <div className="menu-header">
        <div className="d-flex flex-grow-1 align-items-center logo-container">
          {logo?.src && <Logo image={logo} className="header-menu-logo mr-4" />}
          <h5 className="mb-0 header-menu-title flex-1 pr-3">{title || ''}</h5>
        </div>
        <div className="close-button">
          <button className="close-menu-activation close" onClick={onClick}>
            <X />
          </button>
        </div>
      </div>
      {description && <p className="discription">{description}</p>}
    </div>
  )
}

export default OffCanvasHeader
