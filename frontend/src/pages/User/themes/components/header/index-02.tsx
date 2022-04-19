import React, { useContext, useMemo } from 'react'
import classNames from 'classnames'

import AvatarPlaceholder from '@assets/images/avatar-placeholder.jpeg'
import {
  BurgerButton,
  Logo,
  MainMenu,
  PopupMenu,
  FindWithMe,
} from '@components/index'
import { useOffCanvas } from '@hooks/index'

import { MenuType } from '@root/types'
import { AppContext } from '@root/AppContext'
import { fullName, getMenus } from '@utils/index'

import Expertise from '../expertise'

interface Props {
  contactable?: boolean
  className?: string
}

const Header: React.FC<Props> = ({ contactable, className }) => {
  const { user } = useContext(AppContext)
  const { offCanvas, offCanvasHandler } = useOffCanvas()

  const { profile, resume } = user

  const menus: MenuType[] = useMemo(
    () => getMenus(user, contactable),
    [user, contactable],
  )

  return (
    <>
      <div className="d-none d-xl-block">
        <header
          className={classNames(
            'rn-header-area d-flex align-items-start flex-column left-header-style',
            className,
          )}
        >
          <Logo
            image={{
              src: profile?.avatar?.url || AvatarPlaceholder,
              alt: 'user avatar',
            }}
            className="logo-area header-avatar mx-auto"
          />
          {!!profile.slogan && (
            <h6 className="w-100 text-center pt-4 mb-0 header-slogan">
              {profile.slogan}
            </h6>
          )}
          <MainMenu menus={menus} navId="sideNavs" />

          {profile?.links && profile.links.length > 0 && (
            <div className="footer w-100">
              <div className="social-share-style-1 mt--40">
                <span className="title">find with me</span>
                <FindWithMe
                  links={profile.links.filter(l => l.visible)}
                  size={20}
                />
              </div>
            </div>
          )}
          <Expertise expertise={resume?.skills || []} />
        </header>
      </div>
      <div className="header-style-2 d-block d-xl-none">
        <div className="row align-items-center">
          <div className="col-8 offset-4">
            <div className="header-right text-right">
              <div className="hamberger-menu">
                <i id="menuBtn" className="feather-menu humberger-menu"></i>
              </div>
              <BurgerButton onClick={offCanvasHandler} />
            </div>
          </div>
        </div>
      </div>
      <PopupMenu
        isOpen={offCanvas}
        onClick={offCanvasHandler}
        name={fullName({
          firstName: profile?.firstName,
          middleName: profile?.middleName,
          lastName: profile?.lastName,
        })}
        menus={menus}
        socials={profile?.links || []}
        slogan={profile?.slogan}
        logo={profile?.avatar?.url || AvatarPlaceholder}
      >
        <Expertise expertise={resume?.skills || []} />
      </PopupMenu>
    </>
  )
}

export default Header
