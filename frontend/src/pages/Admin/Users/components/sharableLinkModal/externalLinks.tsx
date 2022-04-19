/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'

import { ExternalLink } from '@graphql/graphql'
import { AdminLinks } from '@components/index'

interface Props {
  name: string
  value: string[]
  title: string
  description: string
  onChange: (name: string, value: string) => void
}

const ExternalLinks: React.FC<Props> = ({
  name,
  value,
  title,
  description,
  onChange,
}) => {
  const linkData = useMemo(() => {
    return Object.entries(ExternalLink).map(([label, value]) => ({
      label,
      value,
    }))
  }, [])

  return (
    <div className="row mb-2 links-row">
      <div className="col-12">
        <div className="link-label">{title}</div>
        <div className="link-description mb-4">{description}</div>
        <div className="w-100 ml-2 d-flex align-items-center flex-wrap">
          <AdminLinks
            links={linkData}
            value={value}
            onChange={(v: string) => onChange(name, v)}
          />
        </div>
      </div>
    </div>
  )
}

export default ExternalLinks
