import React, { useRef } from 'react'
import classNames from 'classnames'

import { Maybe } from '@graphql/graphql'
import { KeyValue } from '@root/types'

import Feedback from './feedback'

interface Props {
  logo: Maybe<string>
  name: string
  feedback: Maybe<string>
  url: Maybe<string>
  onReadMore: () => void
}

const ClientCard: React.FC<Props & KeyValue<any>> = ({
  logo,
  name,
  feedback,
  url,
  onReadMore,
  ...rest
}) => {
  const clientRef = useRef<HTMLDivElement>(null)

  return (
    <div className="main-content" {...rest}>
      <div className="inner text-center">
        <div className="thumbnail">
          <a
            href={url || '#!'}
            className={classNames('client-logo', {
              emptyLogo: !logo,
            })}
            target={url ? '_blank' : undefined}
          >
            {logo ? <img src={logo} alt={name} /> : <span>{name}</span>}
          </a>
        </div>
        <div className="client-name" ref={clientRef}>
          <span>
            <a href={url || '#!'} target={url ? '_blank' : undefined}>
              {name}
            </a>
          </span>
        </div>
        <Feedback feedback={feedback} onReadMore={onReadMore} />
      </div>
    </div>
  )
}

export default ClientCard
