/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { X } from 'react-feather'

import { ExperienceInput, Maybe } from '@graphql/graphql'
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
  data: Maybe<ExperienceInput>
  onSave: (v: ExperienceInput) => void
  onClose: () => void
}

const ExperienceModal: React.FC<Props> = ({
  show,
  lastIndex,
  data,
  onSave,
  onClose,
}) => {
  const [userExperience, setUserExperience] = useState<ExperienceInput>(
    {} as ExperienceInput,
  )
  const [errors, setErrors] = useState<KeyValue<string>>({})

  useEffect(() => {
    if (!show) {
      setErrors({})
      setUserExperience({} as ExperienceInput)
    }
  }, [show])

  useEffect(() => {
    if (data) {
      setUserExperience(data)
    } else {
      const _experience: ExperienceInput = {
        index: lastIndex + 1,
        title: '',
        at: '',
        startedFrom: '',
        endedAt: '',
        description: '',
        visible: true,
      }

      setUserExperience(_experience)
    }
  }, [data, lastIndex])

  const onChange = useCallback((name: string, value: string | boolean) => {
    const _error: KeyValue<string> = {}
    if (name === 'startedFrom' || name === 'at') {
      if (value) {
        _error[name] = ''
      } else {
        _error[name] = 'This field is required'
      }
    }

    setErrors(e => ({ ...e, ..._error }))
    setUserExperience(e => ({ ...e, [name]: value }))
  }, [])

  const validate = useCallback(() => {
    const _errors: KeyValue<string> = {}
    let valid = true

    if (!userExperience.startedFrom) {
      _errors.startedFrom = 'This field is required'
      valid = false
    }
    if (!userExperience.at) {
      _errors.at = 'This field is required'
      valid = false
    }
    setErrors(_errors)

    return valid
  }, [userExperience.at, userExperience.startedFrom])

  const _onSave = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (!validate()) return

      onSave(userExperience)
    },
    [onSave, userExperience, validate],
  )

  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered={true}
    >
      <Modal.Header>
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="sr-only"
        >
          Edit experience
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
                  value={userExperience.title || ''}
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
                <Input
                  id="at"
                  name="at"
                  value={userExperience.at || ''}
                  placeholder="Where"
                  type="text"
                  onChange={(e: any) => onChange('at', e.target.value)}
                  size="lg"
                />

                {!!errors.at && <FormError>{errors.at}</FormError>}
              </FormGroup>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="flex-1">
              <FormGroup>
                <Input
                  id="startedFrom"
                  name="startedFrom"
                  value={userExperience.startedFrom || ''}
                  placeholder="Started from (YYYY/MM or YYYY/MM/DD)"
                  type="text"
                  onChange={(e: any) => onChange('startedFrom', e.target.value)}
                  size="lg"
                />

                {!!errors.startedFrom && (
                  <FormError>{errors.startedFrom}</FormError>
                )}
              </FormGroup>
            </div>
            <div className="mb--20 px-3">-</div>
            <div className="flex-1">
              <FormGroup>
                <Input
                  id="endedAt"
                  name="endedAt"
                  value={userExperience.endedAt || ''}
                  placeholder="Ended at (YYYY/MM or YYYY/MM/DD)"
                  type="text"
                  onChange={(e: any) => onChange('endedAt', e.target.value)}
                  size="lg"
                />

                {!!errors.endedAt && <FormError>{errors.endedAt}</FormError>}
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
                  value={userExperience.description || ''}
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
          <div className="row overflow-hidden">
            <div className="col-12 d-flex align-items-center justify-content-start">
              <FormGroup className="mb-0">
                <Input
                  id="visible"
                  name="visible"
                  checked={userExperience.visible || false}
                  type="checkbox"
                  onChange={() => onChange('visible', !userExperience.visible)}
                  size="lg"
                />
                <Label htmlFor="visible">Visible</Label>
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

export default ExperienceModal
