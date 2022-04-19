import React, { useContext, useCallback } from 'react'
import {
  useLocation,
  Link,
  Location,
  useNavigate,
  NavigateFunction,
} from 'react-router-dom'
import classNames from 'classnames'
import { LogOut } from 'react-feather'

import { Icon } from '@components/index'
import { isActiveLink, signInPath } from '@utils/index'
import { AppContext } from '@root/AppContext'
import { MenuType } from '@root/types'

interface Props {
  menus: MenuType[]
  className?: string
  navId: string
}

const MainMenu: React.FC<Props> = ({ menus, className, navId }) => {
  const location: Location = useLocation()
  const navigate: NavigateFunction = useNavigate()
  const { onAdminSignOut } = useContext(AppContext)

  const onSignOut = useCallback(() => {
    onAdminSignOut(() => {
      navigate(signInPath, { replace: true })
    })
  }, [navigate, onAdminSignOut])

  return (
    <nav
      id={navId}
      className={classNames('mainmenu-nav navbar-example2', className)}
    >
      <ul className="primary-menu nav nav-pills">
        {menus.map(({ id, text, path, icon }) => (
          <li key={id} className="nav-item">
            <Link
              className={classNames('nav-link', {
                active: isActiveLink(location.pathname, path),
              })}
              to={path}
            >
              {icon && <Icon name={icon} />}
              {text}
            </Link>
          </li>
        ))}
        <li key="sign-out" className="nav-item mt--50">
          <a className="nav-link" onClick={onSignOut}>
            <LogOut />
            Sign out
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default MainMenu
