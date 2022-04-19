import React from 'react'
import { Menu } from 'react-feather'
import classNames from 'classnames'

interface Props {
  className?: string
  onClick: () => void
}

const BurgerButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <button
      className={classNames(className, 'hamberger-menu')}
      onClick={onClick}
    >
      <Menu size={32} />
    </button>
  )
}

export default BurgerButton
