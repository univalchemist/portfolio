import React from 'react'

import { Maybe } from '@graphql/graphql'

interface Props {
  title: Maybe<string>
  subtitle?: Maybe<string>
}

const ContentTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="content-title">
      <span className="subtitle">{subtitle}</span>
      <h4 className="maintitle">{title}</h4>
    </div>
  )
}
export default ContentTitle
