/* eslint-disable no-unused-vars */
import React from 'react'
import { Loader } from 'react-feather'
import classNames from 'classnames'

import { Maybe } from '@graphql/graphql'
import { useDynamicIconImport } from '@hooks/index'
import { KeyValue } from '@root/types'

interface Props {
  name: Maybe<string>
  onError?: (e: any) => void
  className?: string
}

const Icon: React.FC<Props & KeyValue<any>> = ({
  name,
  onError,
  className,
  ...rest
}) => {
  const { error, loading, SvgIcon } = useDynamicIconImport(name || '', {
    onError,
  })

  if (!name) return null

  if (error) {
    return error.message
  }
  if (loading) {
    return <Loader />
  }
  if (SvgIcon) {
    // @ts-ignore
    return <SvgIcon className={classNames(className)} {...rest} />
  }
  return null
}

export default Icon
