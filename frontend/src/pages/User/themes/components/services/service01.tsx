/* eslint-disable no-unused-vars */
import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

import { Anchor, Icon } from '@components/index'
import { ProfileFeature } from '@root/types'
import { Maybe } from '@graphql/graphql'

interface Props {
  data: ProfileFeature
  onView: (title: string, description: Maybe<string>) => void
}

const ServiceCard: React.FC<Props> = ({ data, onView }) => {
  return (
    <div
      className="rn-service service-card-one"
      onClick={() => onView(data.title, data.description)}
    >
      <div className="inner">
        <div className="content">
          <Icon name={data.icon || 'airplay'} />
          <h6 className="title color-lightn">{data.title}</h6>
          <p className="description">
            <LinesEllipsis
              text={data.description || ''}
              maxLine="4"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </p>
          <Anchor className="read-more-button" path="#!">
            <Icon name="arrow-right" />
          </Anchor>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
