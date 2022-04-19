/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'

import { ExternalLink } from '@graphql/graphql'
import { getLinkIcon } from './utils'
import './styles.scss'

interface Props {
  links: { label: string; value: ExternalLink }[]
  size?: number
  value: string[]
  onChange: (value: string) => void
}

const AdminLinks: React.FC<Props> = ({ links, value, onChange, size = 26 }) => {
  return (
    <div className="admin-links-container">
      {links.map(link => (
        <div
          key={link.label}
          className="admin-links-item-container"
          title={link.label}
          onClick={() => onChange(link.value)}
        >
          <div
            className={classNames(
              'admin-link-item',
              value.includes(link.value) && 'checked',
            )}
            title={link.label}
          >
            {getLinkIcon(link.value, size)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminLinks
