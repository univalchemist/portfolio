import React from 'react'
import classNames from 'classnames'
import BaseSkeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { BASE_COLOR, HIGHLIGHTED_COLOR } from '@root/constants'
import { KeyValue } from '@root/types'

import './styles.scss'

interface Props {
  wrapperClassName?: string
  className?: string
  baseColor?: string
  highlightedColor?: string
}

const Skeleton: React.FC<Props & KeyValue<any>> = ({
  wrapperClassName,
  className,
  baseColor = BASE_COLOR,
  highlightedColor = HIGHLIGHTED_COLOR,
  ...rest
}) => (
  <div className={classNames('sk-wrapper', wrapperClassName)}>
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightedColor}>
      <div className={classNames('sk-item', className)}>
        <BaseSkeleton count={1} {...rest} />
      </div>
    </SkeletonTheme>
  </div>
)

export default Skeleton
