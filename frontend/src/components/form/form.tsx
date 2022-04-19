/* eslint-disable no-unused-vars */
import React from 'react'
import { useForm } from 'react-hook-form'

import { Children } from '@root/types'

interface Props {
  className?: string
  id?: string
  defaultValues?: any
  children: Children
  onSubmit: (data: any, e?: any) => void
  onChange?: (name: string, value: string) => void
}

const Form: React.FC<Props> = ({
  className,
  id,
  defaultValues,
  children,
  onSubmit,
  onChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValues || {},
  })

  return (
    <form
      className={className}
      id={id}
      onChange={(e: any) => {
        if (onChange) {
          onChange(e.target.name, e.target.value)
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {Array.isArray(children)
        ? children.map(child => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    errors,
                    key: child.props.name,
                  },
                })
              : child
          })
        : children}
    </form>
  )
}

export default Form
