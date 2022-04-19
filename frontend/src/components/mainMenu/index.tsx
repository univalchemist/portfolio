import React from 'react'
import { Link } from 'react-scroll'
import classNames from 'classnames'

import { Icon } from '@components/index'

import { MenuType } from '@root/types'

interface Props {
  menus: MenuType[]
  className?: string
  navId: string
}

const MainMenu: React.FC<Props> = ({ menus, className, navId }) => {
  return (
    <nav
      id={navId}
      className={classNames('mainmenu-nav navbar-example2', className)}
    >
      <ul className="primary-menu nav nav-pills">
        {menus.map(({ id, text, path, icon }) => (
          <li key={id} className="nav-item">
            <Link
              activeClass="active"
              className="nav-link smoth-animation"
              href={`#${path}`}
              to={path}
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              {icon && <Icon name={icon} />}
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MainMenu
