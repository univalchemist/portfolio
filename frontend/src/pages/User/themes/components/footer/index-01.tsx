import React from 'react'
import classNames from 'classnames'

import { Logo } from '@components/index'
import { ProfileUser } from '@root/types'
import { AVAILABILITY_TEXT } from '@root/constants'

interface Props {
  className?: string
  data: ProfileUser | undefined
}

const Footer: React.FC<Props> = ({ data: profile, className }) => {
  return (
    <div
      className={classNames('rn-footer-area rn-section-gap pb-5', className)}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="footer-area text-center">
              {profile?.avatar && (
                <Logo
                  image={{ src: profile?.avatar.url, alt: 'user avatar' }}
                />
              )}
              <p className="footer-availability mt--30 mb--20">
                {profile?.availability || AVAILABILITY_TEXT}
              </p>
              <p className="description">
                &copy; {new Date().getFullYear()}. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
