import React from 'react'
import { Link } from 'react-router-dom'

import { Children } from '@root/types'

interface Props {
  path: string
  className?: string
  rel?: string
  label?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  children: Children
  onClick?: () => void
}

const Anchor = React.forwardRef<HTMLAnchorElement, Props>(
  (
    {
      path,
      children,
      className,
      label,
      onClick,
      rel = 'noopener noreferrer',
      target = '_blank',
    },
    ref,
  ) => {
    const internal = /^\/(?!\/)/.test(path)
    if (!internal) {
      const isHash = path.startsWith('#')
      if (isHash) {
        return (
          <a
            aria-label={label}
            className={className}
            href={path}
            onClick={onClick}
            ref={ref}
          >
            {children}
          </a>
        )
      }
      return (
        <a
          aria-label={label}
          rel={rel}
          className={className}
          href={path}
          target={target}
          onClick={onClick}
          ref={ref}
        >
          {children}
        </a>
      )
    }

    return (
      <Link
        aria-label={label}
        rel="preload"
        className={className}
        ref={ref}
        to={path}
      >
        {children}
      </Link>
    )
  },
)

export default Anchor
