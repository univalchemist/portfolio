import React from 'react'

import { Maybe } from '@graphql/graphql'

import './styles.scss'

interface Props {
  description: Maybe<string>
}

const SectionDescription: React.FC<Props> = ({ description }) => {
  if (!description) return null

  return (
    <div className="w-100 mb-4">
      <div className="section-description">{description}</div>
    </div>
  )
}
export default SectionDescription
