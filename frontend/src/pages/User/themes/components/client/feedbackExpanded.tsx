/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import Truncate from 'react-truncate'
import { Overlay, Popover } from 'react-bootstrap'

import { Maybe } from '@graphql/graphql'
import { useClickOutside } from '@hooks/index'

interface Props {
  feedback: Maybe<string>
  target: React.RefObject<HTMLDivElement> | null
}

const FeedbackExpanded: React.FC<Props> = ({ feedback, target }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [showAll, setShowAll] = useState(false)

  useClickOutside(ref, () => {
    setShowAll(false)
  })

  if (!feedback) return null

  return (
    <>
      <Overlay
        show={showAll}
        target={target?.current || null}
        placement="bottom"
        container={target}
        containerPadding={20}
      >
        <Popover id="feedback-expanded" className="p-2">
          <Popover.Body>
            <span>{feedback}</span>
          </Popover.Body>
        </Popover>
      </Overlay>
      {!!feedback && (
        <>
          <div className="seperator" />
          <div className="client-feedback">
            <Truncate
              lines={2}
              ellipsis={
                <span>
                  ...
                  <span
                    ref={ref}
                    className="mx-2 read-more"
                    onClick={() => setShowAll(!showAll)}
                  >
                    Read more
                  </span>
                </span>
              }
            >
              {feedback}
            </Truncate>
          </div>
        </>
      )}
    </>
  )
}

export default FeedbackExpanded
