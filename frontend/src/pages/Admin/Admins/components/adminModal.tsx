/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { X } from 'react-feather'

import {
  AdminInput,
  AdminType,
  Maybe,
  useUpsertAdminMutation,
} from '@graphql/graphql'
import { KeyValue } from '@root/types'
import { FormGroup, FormError, Input, Button, Select } from '@components/index'

interface Props {
  show: boolean
  data: Maybe<AdminInput>
  onSave: () => void
  onClose: () => void
}

const AdminModal: React.FC<Props> = ({ show, data, onSave, onClose }) => {
  const [admin, setAdmin] = useState<AdminInput>({} as AdminInput)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errors, setErrors] = useState<KeyValue<string>>({})

  const [upsertAdmin, { loading: upsertingAdmin }] = useUpsertAdminMutation()

  useEffect(() => {
    if (!show) {
      setErrors({})
      setAdmin({} as AdminInput)
    }
  }, [show])

  useEffect(() => {
    if (data) {
      setAdmin(data)
    } else {
      const _admin: AdminInput = {
        id: null,
        email: '',
        password: null,
        type: AdminType.Admin,
      }

      setAdmin(_admin)
    }
  }, [data])

  const validatePassword = useCallback(
    cPassword => {
      const _error: KeyValue<string> = {}
      let isValid = true
      if (!admin.password) {
        _error.password = ''
        _error.confirmPassword = ''
      } else {
        if (admin.password.length < 6) {
          _error.password = '6 characters at least.'
          isValid = false
        } else if (admin.password !== cPassword) {
          _error.password = ''
          _error.confirmPassword = "Password doesn't match"
          isValid = false
        } else {
          _error.password = ''
          _error.confirmPassword = ''
        }
      }

      setErrors(e => ({ ...e, ..._error }))
      return isValid
    },
    [admin.password],
  )

  const onChange = useCallback(
    (name: string, value: string | AdminType) => {
      const _error: KeyValue<string> = {}
      if (name === 'email') {
        if (value) {
          _error[name] = ''
        } else {
          _error[name] = 'This field is required'
        }

        setAdmin(a => ({ ...a, [name]: value }))
        setErrors(e => ({ ...e, ..._error }))
      } else if (name === 'password') {
        setAdmin(a => ({ ...a, [name]: value }))
        validatePassword(confirmPassword)
      } else if (name === 'confirmPassword') {
        setConfirmPassword(value)
        validatePassword(value)
      } else {
        setAdmin(a => ({ ...a, [name]: value }))
      }
    },
    [validatePassword, confirmPassword],
  )

  const validate = useCallback(() => {
    let valid = true

    if (!admin.email) {
      valid = false

      setErrors({ email: 'This field is required' })
    }

    const isPasswordValid = validatePassword(confirmPassword)

    return valid || isPasswordValid
  }, [admin.email, confirmPassword, validatePassword])

  const _onSave = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (!validate()) return

      let input: AdminInput = {} as AdminInput
      if (admin.password) {
        input = {
          id: admin.id,
          email: admin.email,
          type: admin.type,
          password: admin.password,
        }
      } else {
        input = { ...admin }
      }
      upsertAdmin({
        variables: {
          input,
        },
        onCompleted: () => {
          onSave()
          onClose()
        },
      })
    },
    [admin, onClose, onSave, upsertAdmin, validate],
  )

  const types = useMemo(
    () =>
      Object.entries(AdminType).map(([k, v]) => ({
        label: k,
        value: v,
      })),
    [],
  )

  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName="custom-modal modal-small"
      aria-labelledby="example-custom-modal-styling-title"
      centered={true}
    >
      <Modal.Header>
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="sr-only"
        >
          Edit admin
        </Modal.Title>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">
            <X />
          </span>
        </button>
      </Modal.Header>
      <Modal.Body className="resume-form-modal">
        <div className="form-wrapper form-dark no-shadow py-0 px-3">
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Input
                  id="email"
                  name="email"
                  value={admin.email || ''}
                  placeholder="Email"
                  type="text"
                  onChange={(e: any) => onChange('email', e.target.value)}
                  size="lg"
                />
                {!!errors.email && <FormError>{errors.email}</FormError>}
              </FormGroup>
            </div>
            <div className="col-12">
              <FormGroup>
                <Select
                  id="type"
                  name="type"
                  value={admin.type}
                  options={types}
                  onChange={(e: any) => onChange('type', e.target.value)}
                  size="lg"
                />
              </FormGroup>
            </div>
            <div className="col-12">
              <FormGroup>
                <Input
                  id="password"
                  name="password"
                  value={admin.password || ''}
                  placeholder="Password"
                  type="password"
                  onChange={(e: any) => onChange('password', e.target.value)}
                  size="lg"
                />
                {!!errors.password && <FormError>{errors.password}</FormError>}
              </FormGroup>
            </div>
            <div className="col-12">
              <FormGroup>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword || ''}
                  placeholder="Confirm Password"
                  type="password"
                  onChange={(e: any) =>
                    onChange('confirmPassword', e.target.value)
                  }
                  size="lg"
                />

                {!!errors.confirmPassword && (
                  <FormError>{errors.confirmPassword}</FormError>
                )}
              </FormGroup>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="row">
          <div className="col-lg-12 mt-5 d-flex align-items-center justify-content-end">
            <Button type="button" onClick={onClose}>
              <span>Cancel</span>
            </Button>
            <Button
              type="button"
              className="ml-3"
              disabled={Object.values(errors).some(v => !!v) || upsertingAdmin}
              onClick={_onSave}
            >
              <span>{upsertingAdmin ? 'Saving...' : 'Save'}</span>
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default AdminModal
