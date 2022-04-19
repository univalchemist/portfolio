import React, { useCallback, useContext } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'

import { OffCanvas, OffCanvasHeader, OffCanvasBody } from '@components/index'
import { signInPath } from '@utils/index'
import { AppContext } from '@root/AppContext'
import { MenuType } from '@root/types'

interface Props {
  isOpen: boolean
  onClick: () => void
  name: string
  menus: MenuType[]
}

const PopupMenu: React.FC<Props> = ({ isOpen, onClick, name, menus }) => {
  const navigate: NavigateFunction = useNavigate()
  const { onAdminSignOut } = useContext(AppContext)

  const onSignOut = useCallback(() => {
    onAdminSignOut(() => {
      navigate(signInPath, { replace: true })
    })
  }, [navigate, onAdminSignOut])

  return (
    <OffCanvas isOpen={isOpen} onClick={onClick}>
      <OffCanvasHeader className="pt-3 pl-4" title={name} onClick={onClick} />
      <OffCanvasBody>
        {menus && (
          <ul className="primary-menu nav nav-pills pl-4">
            {menus.map(({ id, text, path }) => (
              <li className="nav-item" key={id}>
                <Link className="nav-link" to={path} onClick={onClick}>
                  {text}
                </Link>
              </li>
            ))}
            <li key="sign-out" className="nav-item mt--30">
              <a className="nav-link" onClick={onSignOut}>
                Sign out
              </a>
            </li>
          </ul>
        )}
      </OffCanvasBody>
    </OffCanvas>
  )
}

export default PopupMenu
