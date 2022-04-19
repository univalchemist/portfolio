import React from 'react'
import classNames from 'classnames'
import Spinner from 'react-bootstrap/Spinner'

import { Children } from '@root/types'

import './styles.scss'

interface Props {
  loading: boolean
  children: Children
}

const LoadingOverlay: React.FC<Props> = ({ loading, children }) => {
  return (
    <>
      {children}
      <div
        className={classNames('loading-overlay', {
          visible: loading,
        })}
      >
        <Spinner animation="grow" variant="light" />
      </div>
    </>
  )
}

export default LoadingOverlay
