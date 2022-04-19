import React, { useContext, useMemo } from 'react'
import classNames from 'classnames'

import { BurgerButton } from '@components/index'
import { useOffCanvas } from '@hooks/index'

import { AdminType } from '@graphql/graphql'
import {
  dashboardPath,
  adminUsersPath,
  adminsPath,
  contactsPath,
  settingsPath,
  visitsPath,
} from '@utils/index'
import { MenuType } from '@root/types'
import { AppContext } from '@root/AppContext'

import Menu from '../menu'
import PopupMenu from '../popupMenu'

interface Props {
  className?: string
}

const adminMenus: MenuType[] = [
  {
    id: 1,
    text: 'Dashboard',
    path: dashboardPath,
    icon: 'activity',
  },
  {
    id: 3,
    text: 'Users',
    path: adminUsersPath,
    icon: 'users',
  },
  {
    id: 4,
    text: 'Visits',
    path: visitsPath,
    icon: 'repeat',
  },
  {
    id: 5,
    text: 'Contacts',
    path: contactsPath,
    icon: 'message-circle',
  },
  {
    id: 6,
    text: 'Settings',
    path: settingsPath,
    icon: 'settings',
  },
]

const superAdminMenus: MenuType[] = [
  ...adminMenus,
  {
    id: 2,
    text: 'Admins',
    path: adminsPath,
    icon: 'layers',
  },
]

const AdminHeader: React.FC<Props> = ({ className }) => {
  const { admin } = useContext(AppContext)
  const { offCanvas, offCanvasHandler } = useOffCanvas()

  const menus: MenuType[] = useMemo(() => {
    const _menus: MenuType[] =
      admin?.type === AdminType.SuperAdmin ? superAdminMenus : adminMenus

    return _menus.sort((a, b) => (a.id > b.id ? 1 : -1))
  }, [admin?.type])

  return (
    <>
      <div className="d-none d-xl-block">
        <header
          className={classNames(
            'rn-header-area d-flex align-items-start flex-column left-header-style',
            className,
          )}
        >
          <Menu menus={menus} navId="sideNavs" />
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
        name={admin?.email || ''}
        menus={menus}
      />
    </>
  )
}

export default AdminHeader
