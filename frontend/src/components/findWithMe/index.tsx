import React from 'react'

import { UserLink } from '@graphql/graphql'

import { Social, SocialLink } from '@components/index'

import { getLinkIcon } from './utils'
import './styles.scss'

interface Props {
  links: UserLink[]
  size?: number
}

const FindWithMe: React.FC<Props> = ({ links, size = 26 }) => {
  return (
    <div className="links-container">
      <Social className="social-icone flex-wrap justify-content-start">
        {links
          .filter(l => l.visible)
          .map(link => (
            <SocialLink key={link.name} path={link.url} title={link.name}>
              {getLinkIcon(link.name, size)}
            </SocialLink>
          ))}
      </Social>
    </div>
  )
}

export default FindWithMe
