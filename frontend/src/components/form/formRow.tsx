/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'

import { UseFormRegister } from 'react-hook-form'

import { KeyValue } from '@root/types'
import { FormGroup, FormError, Input, Textarea, Label } from '.'

interface Props {
  className?: string
  name: string
  label: string
  required: boolean
  register?: UseFormRegister<any>
  type?: 'text' | 'email' | 'password' | 'textarea' | 'checkbox'
  size?: 'sm' | 'md' | 'lg'
  errors?: any
}

const FormRow: React.FC<Props & KeyValue<any>> = ({
  className,
  name,
  label,
  required,
  register,
  errors,
  type = 'text',
  size = 'lg',
  ...rest
}) => {
  const fieldOpts: any = useMemo(() => {
    const opts: any = {}

    if (required) {
      opts.required = `${label} is required`

      if (type === 'email') {
        opts.pattern = {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        }
      }
    }

    return opts
  }, [label, required, type])

  if (type === 'checkbox') {
    return (
      <div className={className}>
        <FormGroup>
          <Input
            id={name}
            type={type}
            size={size}
            {...(register ? register(name, fieldOpts) : {})}
            {...rest}
          />
          <Label htmlFor={name}>
            {label}
            {required && <sup className="required">*</sup>}
          </Label>

          {errors[name] && <FormError>{errors[name]?.message}</FormError>}
        </FormGroup>
      </div>
    )
  }

  return (
    <div className={className}>
      <FormGroup>
        <Label htmlFor={name}>
          {label}
          {required && <sup className="required">*</sup>}
        </Label>
        {type === 'textarea' ? (
          <Textarea
            id={name}
            type={type}
            size={size}
            {...(register ? register(name, fieldOpts) : {})}
            {...rest}
          />
        ) : (
          <Input
            id={name}
            type={type}
            size={size}
            {...(register ? register(name, fieldOpts) : {})}
            {...rest}
          />
        )}
        {errors[name] && <FormError>{errors[name]?.message}</FormError>}
      </FormGroup>
    </div>
  )
}

export default FormRow
