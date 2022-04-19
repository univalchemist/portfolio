/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Icon } from '@components/index'

import { Children } from '@root/types'

interface Props {
  children: Children
  type?: 'button' | 'submit' | 'reset'
  label?: string
  className?: string
  path?: string
  variant?: 'contained' | 'outlined' | 'texted'
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'white'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'rounded' | 'square' | 'ellipse'
  fullWidth?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  onClick?: (e?: any) => void
}

const Button: React.FC<Props> = ({
  children,
  type = 'button',
  label,
  onClick,
  className,
  path,
  icon,
  disabled,
  iconPosition = 'right',
}) => {
  if (path) {
    const internal = /^\/(?!\/)/.test(path)
    const isHash = path?.startsWith('#')

    if (internal) {
      return (
        <Link
          aria-label={label}
          className={classNames(className, 'rn-btn')}
          to={path}
        >
          {icon && iconPosition === 'left' && (
            <Icon name={icon} size={14} className={`icon-${iconPosition}`} />
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <Icon name={icon} size={14} className={`icon-${iconPosition}`} />
          )}
        </Link>
      )
    }
    if (isHash) {
      return (
        <a
          aria-label={label}
          onClick={onClick}
          className={classNames(className, 'rn-btn')}
          href={path}
        >
          {icon && iconPosition === 'left' && (
            <Icon name={icon} size={14} className={`icon-${iconPosition}`} />
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <Icon name={icon} size={14} className={`icon-${iconPosition}`} />
          )}
        </a>
      )
    }
    return (
      <a
        aria-label={label}
        className={classNames(className, 'rn-btn')}
        href={path}
        target="_blank"
        rel="noreferrer noopener"
      >
        {icon && iconPosition === 'left' && (
          <Icon name={icon} size={14} className={`icon-${iconPosition}`} />
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <Icon name={icon} size={14} className={`icon-${iconPosition}`} />
        )}
      </a>
    )
  }

  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={classNames(className, 'rn-btn')}
      type={type || 'button'}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && (
        <Icon name={icon} size={14} className={`icon-${iconPosition}`} />
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <Icon name={icon} size={14} className={`icon-${iconPosition}`} />
      )}
    </button>
  )
}

export default Button
