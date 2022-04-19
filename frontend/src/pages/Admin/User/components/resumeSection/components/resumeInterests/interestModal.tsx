/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { X } from 'react-feather'

import { InterestInput, Maybe } from '@graphql/graphql'
import { KeyValue } from '@root/types'
import {
  FormGroup,
  FormError,
  Input,
  Button,
  Label,
  Textarea,
} from '@components/index'

interface Props {
  show: boolean
  lastIndex: number
  data: Maybe<InterestInput>
  onSave: (v: InterestInput) => void
  onClose: () => void
}

const InterestModal: React.FC<Props> = ({
  show,
  lastIndex,
  data,
  onSave,
  onClose,
}) => {
  const [userInterest, setUserInterest] = useState<InterestInput>(
    {} as InterestInput,
  )
  const [errors, setErrors] = useState<KeyValue<string>>({})

  useEffect(() => {
    if (!show) {
      setErrors({})
      setUserInterest({} as InterestInput)
    }
  }, [show])

  useEffect(() => {
    if (data) {
      setUserInterest(data)
    } else {
      const _interest: InterestInput = {
        index: lastIndex + 1,
        title: '',
        description: '',
      }

      setUserInterest(_interest)
    }
  }, [data, lastIndex])

  const onChange = useCallback((name: string, value: string) => {
    const _error: KeyValue<string> = {}
    if (name === 'title') {
      if (value) {
        _error[name] = ''
      } else {
        _error[name] = 'This field is required'
      }
    }

    setErrors(e => ({ ...e, ..._error }))
    setUserInterest(e => ({ ...e, [name]: value }))
  }, [])

  const validate = useCallback(() => {
    const _errors: KeyValue<string> = {}
    let valid = true

    if (!userInterest.title) {
      _errors.title = 'This field is required'
      valid = false
    }
    setErrors(_errors)

    return valid
  }, [userInterest.title])

  const _onSave = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (!validate()) return

      onSave(userInterest)
    },
    [onSave, userInterest, validate],
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
          Edit interest
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
                  id="title"
                  name="title"
                  value={userInterest.title || ''}
                  placeholder="Title"
                  type="text"
                  onChange={(e: any) => onChange('title', e.target.value)}
                  size="lg"
                />

                {!!errors.title && <FormError>{errors.title}</FormError>}
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  size="lg"
                  name="description"
                  value={userInterest.description || ''}
                  placeholder="Description"
                  type="textarea"
                  rows={3}
                  onChange={(e: any) => onChange('description', e.target.value)}
                />

                {!!errors.description && (
                  <FormError>{errors.description}</FormError>
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
              disabled={Object.values(errors).some(v => !!v)}
              onClick={_onSave}
            >
              <span>Save</span>
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default InterestModal
