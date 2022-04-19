import React from 'react'
import classNames from 'classnames'

import { Maybe } from '@graphql/graphql'

interface Props {
  title: Maybe<string>
  subtitle: Maybe<string>
  badge?: Maybe<string>
  description: Maybe<string>
  layout?: 1 | 2
  className?: string
}

const TimelineCard: React.FC<Props> = ({
  title,
  subtitle,
  badge,
  description,
  layout = 1,
  className,
}) => {
  return (
    <div className={classNames('resume-single-list', className)}>
      <div
        className={classNames(
          'inner',
          layout === 2 && 'psudo-after-none psudo-after-none',
        )}
      >
        <div className="flex-column heading">
          <div className="w-100 d-flex title">
            <h4 className="flex-1">{title}</h4>
            {badge && (
              <div className="date-of-time">
                <span>{badge}</span>
              </div>
            )}
          </div>
          <span>{subtitle}</span>
        </div>
        <p className="description">{description}</p>
      </div>
    </div>
  )
}

export default TimelineCard
