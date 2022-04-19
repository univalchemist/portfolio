import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import classNames from 'classnames'

import { NoData } from '@components/index'
import { Children } from '@root/types'

interface Props {
  className?: string
  loading: boolean
  isEmpty: boolean
  children?: Children
}

const LoadingWrapper: React.FC<Props> = ({
  className,
  loading,
  isEmpty,
  children,
}) => {
  if (loading) {
    return (
      <div className={classNames('loading-wrapper', className)}>
        <Spinner animation="grow" variant="light" />
      </div>
    )
  }

  if (isEmpty) {
    return <NoData />
  }

  return <>{children}</>
}

export default LoadingWrapper
