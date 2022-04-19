import React from 'react'
import classNames from 'classnames'

import { FindWithMe } from '@components/index'

import { Maybe, UserLink } from '@graphql/graphql'

interface Props {
  className?: string
  image: Maybe<string>
  title: string
  subtitle: Maybe<string>
  description: Maybe<string>
  phone: Maybe<string>
  email: Maybe<string>
  address: Maybe<string>
  socials: UserLink[]
}

const ContactInfoCard: React.FC<Props> = ({
  className,
  image,
  title,
  subtitle,
  description,
  phone,
  email,
  address,
  socials,
}) => {
  return (
    <div className={classNames('contact-about-area', className)}>
      {image && (
        <div className="thumbnail">
          <img src={image} alt="contact-img" />
        </div>
      )}
      <div className="title-area">
        {title && <h4 className="title">{title}</h4>}
        {subtitle && <span>{subtitle}</span>}
      </div>
      <div className="description">
        {description && <p>{description}</p>}
        {phone && (
          <span className="phone">
            Phone:
            <a className="ml-3" href={`tel:${phone}`}>
              {phone}
            </a>
          </span>
        )}
        {email && (
          <span className="mail">
            Email:
            <a className="ml-3" href={`mailto:${email}`}>
              {email}
            </a>
          </span>
        )}
        {address && (
          <span className="address">
            Address:<span className="ml-3">{address}</span>
          </span>
        )}
      </div>
      {socials.length > 0 && (
        <div className="social-area">
          <div className="name">FIND WITH ME</div>
          <FindWithMe links={socials.filter(l => l.visible)} />
        </div>
      )}
    </div>
  )
}

export default ContactInfoCard
