import React from 'react'

import { Maybe } from '@graphql/graphql'

import './styles.scss'

interface Props {
  text: Maybe<string>
}

const Helper: React.FC<Props> = ({ text }) => {
  if (!text) return null

  return (
    <div className="w-100 mt-1">
      <div className="field-helper">{text}</div>
    </div>
  )
}
export default Helper
