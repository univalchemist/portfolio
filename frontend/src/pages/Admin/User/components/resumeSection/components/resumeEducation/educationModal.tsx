/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { X } from 'react-feather'

import { EducationInput, Maybe } from '@graphql/graphql'
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
  data: Maybe<EducationInput>
  onSave: (v: EducationInput) => void
  onClose: () => void
}

const EducationModal: React.FC<Props> = ({
  show,
  lastIndex,
  data,
  onSave,
  onClose,
}) => {
  const [userEducation, setUserEducation] = useState<EducationInput>(
    {} as EducationInput,
  )
  const [errors, setErrors] = useState<KeyValue<string>>({})

  useEffect(() => {
    if (!show) {
      setErrors({})
      setUserEducation({} as EducationInput)
    }
  }, [show])

  useEffect(() => {
    if (data) {
      setUserEducation(data)
    } else {
      const _education: EducationInput = {
        index: lastIndex + 1,
        title: '',
        at: '',
        startedFrom: '',
        endedAt: '',
        description: '',
        degree: '',
        visible: true,
      }

      setUserEducation(_education)
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
    setUserEducation(e => ({ ...e, [name]: value }))
  }, [])

  const validate = useCallback(() => {
    const _errors: KeyValue<string> = {}
    let valid = true

    if (!userEducation.startedFrom) {
      _errors.startedFrom = 'This field is required'
      valid = false
    }
    if (!userEducation.at) {
      _errors.at = 'This field is required'
      valid = false
    }
    setErrors(_errors)

    return valid
  }, [userEducation.at, userEducation.startedFrom])

  const _onSave = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (!validate()) return

      onSave(userEducation)
    },
    [onSave, userEducation, validate],
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
          Edit education
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
                  value={userEducation.title || ''}
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
                  value={userEducation.at || ''}
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
                  value={userEducation.startedFrom || ''}
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
                  value={userEducation.endedAt || ''}
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
                  value={userEducation.description || ''}
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
            <div className="col-9 col-md-9 col-lg-10">
              <FormGroup>
                <Input
                  id="degree"
                  name="degree"
                  value={userEducation.degree || ''}
                  placeholder="Degree"
                  type="text"
                  onChange={(e: any) => onChange('degree', e.target.value)}
                  size="lg"
                />

                {!!errors.degree && <FormError>{errors.degree}</FormError>}
              </FormGroup>
            </div>
            <div className="col-3 col-md-3 col-lg-2 d-flex align-items-center">
              <FormGroup className="mb-0">
                <Input
                  id="visible"
                  name="visible"
                  checked={userEducation.visible || false}
                  type="checkbox"
                  onChange={() => onChange('visible', !userEducation.visible)}
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

export default EducationModal
