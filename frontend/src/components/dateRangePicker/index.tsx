/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { DateRange, RangeKeyDict } from 'react-date-range'
import moment from 'moment-timezone'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

import './styles.scss'

interface Props {
  className?: string
  key?: string
  selected?: [string | undefined, string | undefined]
  onSelect: (d: [string, string]) => void
}

const dateFormat = 'YYYY-MM-DD HH:mm:ss'
const dateLabelFormat = 'MMM D'

const DateRangePicker: React.FC<Props> = ({
  className,
  key = 'selection',
  selected,
  onSelect,
}) => {
  const dateRangeLabel = useMemo(() => {
    const start = selected?.[0]
      ? moment(selected[0]).format(dateLabelFormat)
      : moment().format(dateLabelFormat)

    const end = selected?.[1]
      ? moment(selected[1]).format(dateLabelFormat)
      : moment().format(dateLabelFormat)

    return `${start} - ${end}`
  }, [selected])

  const onSelectRange = useCallback(
    (ranges: RangeKeyDict) => {
      const range = ranges[key]
      if (range) {
        const start = range.startDate
          ? moment(range.startDate.toDateString())
              .startOf('day')
              .format(dateFormat)
          : ''
        const end = range.endDate
          ? moment(range.endDate.toDateString()).endOf('day').format(dateFormat)
          : ''
        onSelect([start, end])
      }
    },
    [key, onSelect],
  )

  return (
    <div className={classNames('date-range-container', className)}>
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="auto"
        overlay={
          <Popover id="date-ranger" className="date-ranger-popover">
            <Popover.Body>
              <DateRange
                editableDateInputs={true}
                onChange={onSelectRange}
                moveRangeOnFirstSelection={false}
                ranges={[
                  {
                    startDate: selected?.[0]
                      ? new Date(selected[0])
                      : new Date(),
                    endDate: selected?.[1] ? new Date(selected[1]) : undefined,
                    key,
                  },
                ]}
              />
            </Popover.Body>
          </Popover>
        }
      >
        {({ ref, ...triggerHandler }) => (
          <div className="dare-range" ref={ref} {...triggerHandler}>
            {dateRangeLabel}
          </div>
        )}
      </OverlayTrigger>
    </div>
  )
}

export default React.memo(DateRangePicker)
