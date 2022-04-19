import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { ImageType } from '@root/types'

interface Props {
  className?: string
  image?: ImageType
}

const Logo: React.FC<Props> = ({ className, image }) => {
  return (
    <div className={classNames('logo', className)}>
      <Link to="/">
        {image?.src && <img src={image.src} alt={image?.alt || 'logo'} />}
      </Link>
    </div>
  )
}

export default Logo
