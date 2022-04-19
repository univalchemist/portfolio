import React from 'react'
import Truncate from 'react-truncate'

import { Maybe } from '@graphql/graphql'

interface Props {
  feedback: Maybe<string>
  onReadMore: () => void
}

const Feedback: React.FC<Props> = ({ feedback, onReadMore }) => {
  if (!feedback) return null

  return (
    <>
      <div className="seperator" />
      <div className="client-feedback">
        <Truncate
          lines={2}
          ellipsis={
            <span>
              ...
              <span className="mx-2 read-more" onClick={onReadMore}>
                Read more
              </span>
            </span>
          }
        >
          {feedback}
        </Truncate>
      </div>
    </>
  )
}

export default Feedback
