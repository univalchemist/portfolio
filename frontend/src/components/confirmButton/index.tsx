import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Button, Spinner } from 'react-bootstrap'

import { Icon } from '@components/index'

interface Props {
  className?: string
  textClassName?: string
  iconClassName?: string
  variant: string
  wait?: boolean
  loading?: boolean
  text?: string
  iconName?: string
  iconSize?: number
  onClick: () => void
}

const sleep = 3 // 3s

const ConfirmButton: React.FC<Props> = ({
  className,
  textClassName,
  iconClassName,
  variant,
  text,
  iconName,
  iconSize = 14,
  wait = true,
  loading = false,
  onClick,
}) => {
  const timer = useRef<NodeJS.Timeout | undefined>()
  const [confirming, setConfirming] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(sleep)

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current)
    }
  }, [])

  const _onClick = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()

      if (wait) {
        if (confirming) {
          setConfirming(false)
          setCountdown(sleep)
          clearTimer()
        } else {
          setConfirming(true)
          timer.current = setInterval(() => {
            setCountdown(c => Math.max(0, c - 1))
          }, 1000)
        }
      } else {
        onClick()
      }
    },
    [wait, confirming, clearTimer, onClick],
  )

  useEffect(() => {
    if (countdown === 0) {
      clearTimer()
      setCountdown(sleep)
      setConfirming(false)
      onClick()
    }
  }, [countdown, clearTimer, onClick])

  useEffect(
    () => () => {
      clearTimer()
    },
    [clearTimer],
  )

  return (
    <Button
      className={classNames(
        'd-flex align-items-center justify-content-center',
        className,
      )}
      disabled={loading}
      onClick={_onClick}
      variant={variant}
    >
      {loading ? (
        <Spinner animation="grow" variant="light" size="sm" />
      ) : confirming ? (
        <span className={textClassName}>{countdown}</span>
      ) : (
        <>
          {!!iconName && (
            <Icon name={iconName} size={iconSize} className={iconClassName} />
          )}
          {!!text && <span className={textClassName}>{text}</span>}
        </>
      )}
    </Button>
  )
}

export default ConfirmButton
