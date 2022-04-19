/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import VisibilitySensor from 'react-visibility-sensor'

interface Props {
  titleClassName?: string
  title?: string
  value: number
  label?: string
}

const ProgressBar: React.FC<Props> = ({
  title,
  titleClassName,
  value,
  label,
}) => {
  const [focus, setFocus] = useState<boolean>(false)

  const onChangeVisible = useCallback(
    (isVisible: boolean) => {
      if (isVisible && !focus) {
        setFocus(true)
      }
    },
    [focus],
  )

  return (
    <VisibilitySensor offset={{ top: 50 }} onChange={onChangeVisible}>
      {({ isVisible }) => (
        <div className="progress-charts">
          {title && (
            <h6
              className={classNames('heading heading-h6 pb-3', titleClassName)}
            >
              {title}
            </h6>
          )}
          <div className="progress">
            <div
              className="progress-bar wow fadeInLeft"
              data-wow-duration="0.5s"
              data-wow-delay=".3s"
              role="progressbar"
              style={{ width: focus ? value + '%' : 0 }}
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span className="percent-label">{label || `${value}%`}</span>
            </div>
          </div>
        </div>
      )}
    </VisibilitySensor>
  )
}

export default ProgressBar
