import React from 'react'

import {
  Anchor,
  Icon,
  Social,
  SocialLink,
  OffCanvas,
  OffCanvasHeader,
  OffCanvasBody,
} from '@components/index'
import { UserLink, Maybe } from '@graphql/graphql'
import { MenuType, Children } from '@root/types'

interface Props {
  isOpen: boolean
  onClick: () => void
  name: string
  menus: MenuType[]
  socials: UserLink[]
  slogan?: Maybe<string>
  logo?: Maybe<string>
  children?: Children
}

const PopupMenu: React.FC<Props> = ({
  isOpen,
  onClick,
  name,
  menus,
  socials,
  slogan,
  logo,
  children,
}) => {
  return (
    <OffCanvas isOpen={isOpen} onClick={onClick}>
      <OffCanvasHeader
        className="pt-3 pl-4"
        logo={{ src: logo || '', alt: 'Logo' }}
        title={name}
        description={slogan}
        onClick={onClick}
      />
      <OffCanvasBody>
        {menus && (
          <ul className="primary-menu nav nav-pills pl-4">
            {menus.map(({ id, text, path }) => (
              <li className="nav-item" key={id}>
                <Anchor
                  className="nav-link smoth-animation"
                  path={`#${path}`}
                  onClick={onClick}
                >
                  {text}
                </Anchor>
              </li>
            ))}
          </ul>
        )}

        {socials.length > 0 && (
          <div className="social-share-style-1 mt--40 pl-4">
            <span className="title">find with me</span>
            <Social>
              {socials.map(social => (
                <SocialLink key={social.name} path={social.url}>
                  <Icon name={social.name} />
                </SocialLink>
              ))}
            </Social>
          </div>
        )}
        {children}
      </OffCanvasBody>
    </OffCanvas>
  )
}

export default PopupMenu
