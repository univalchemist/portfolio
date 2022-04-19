/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { X } from 'react-feather'

import { SkillInput, SkillCategory, Maybe } from '@graphql/graphql'
import { KeyValue } from '@root/types'
import {
  FormGroup,
  FormError,
  Input,
  Button,
  Label,
  Select,
} from '@components/index'

interface Props {
  show: boolean
  lastIndex: number
  data: Maybe<SkillInput>
  onSave: (v: SkillInput) => void
  onClose: () => void
}

const SkillModal: React.FC<Props> = ({
  show,
  lastIndex,
  data,
  onSave,
  onClose,
}) => {
  const [userSkill, setUserSkill] = useState<SkillInput>({} as SkillInput)
  const [errors, setErrors] = useState<KeyValue<string>>({})

  useEffect(() => {
    if (!show) {
      setErrors({})
      setUserSkill({} as SkillInput)
    }
  }, [show])

  useEffect(() => {
    if (data) {
      setUserSkill(data)
    } else {
      const _skill: SkillInput = {
        index: lastIndex + 1,
        name: '',
        rate: 0,
        category: SkillCategory.Frontend,
        visible: true,
      }

      setUserSkill(_skill)
    }
  }, [data, lastIndex])

  const onChange = useCallback(
    (name: string, value: string | boolean | number | SkillCategory) => {
      const _error: KeyValue<string> = {}
      if (name === 'name') {
        if (value) {
          _error[name] = ''
        } else {
          _error[name] = 'This field is required'
        }
      }

      if (name === 'rate') {
        if (!value || isNaN(+value)) {
          _error[name] = 'Invalid value'
        } else {
          _error[name] = +value > 10 || +value < 0 ? 'Range: 0, 10' : ''
        }
      }

      setErrors(e => ({ ...e, ..._error }))
      setUserSkill(e => ({ ...e, [name]: value }))
    },
    [],
  )

  const validate = useCallback(() => {
    const _errors: KeyValue<string> = {}
    let valid = true

    if (!userSkill.name) {
      _errors.name = 'This field is required'
      valid = false
    }
    if (!userSkill.rate || isNaN(+userSkill.rate)) {
      _errors.rate = 'Invalid value'
      valid = false
    } else {
      if (+userSkill.rate > 10 || +userSkill.rate < 0) {
        _errors.rate = 'Range: 0, 10'
        valid = false
      }
    }
    setErrors(_errors)

    return valid
  }, [userSkill.name, userSkill.rate])

  const _onSave = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (!validate()) return

      onSave({ ...userSkill, rate: +(userSkill.rate || 0) })
    },
    [onSave, userSkill, validate],
  )

  const categories = useMemo(
    () =>
      Object.entries(SkillCategory).map(([k, v]) => ({
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
          Edit skill
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
                  id="name"
                  name="name"
                  value={userSkill.name || ''}
                  placeholder="Skill name"
                  type="text"
                  onChange={(e: any) => onChange('name', e.target.value)}
                  size="lg"
                />

                {!!errors.name && <FormError>{errors.name}</FormError>}
              </FormGroup>
            </div>
          </div>
          <div className="row overflow-hidden">
            <div className="col-12 col-md-6 col-lg-4">
              <FormGroup>
                <Label htmlFor="category">
                  Category
                  <sup className="required">*</sup>
                </Label>
                <Select
                  id="category"
                  name="category"
                  value={userSkill.category}
                  options={categories}
                  onChange={(e: any) => onChange('category', e.target.value)}
                  size="lg"
                />
              </FormGroup>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <FormGroup>
                <Label htmlFor="rate">
                  Rating (out of 10)
                  <sup className="required">*</sup>
                </Label>
                <Input
                  id="rate"
                  name="rate"
                  value={userSkill.rate !== undefined ? userSkill.rate : ''}
                  placeholder=""
                  type="text"
                  onChange={(e: any) => onChange('rate', e.target.value)}
                  size="lg"
                />

                {!!errors.rate && <FormError>{errors.rate}</FormError>}
              </FormGroup>
            </div>
            <div className="col-12  col-lg-4 d-flex align-items-center justify-content-start">
              <FormGroup className="mb-0">
                <Input
                  id="visible"
                  name="visible"
                  checked={userSkill.visible || false}
                  type="checkbox"
                  onChange={() => onChange('visible', !userSkill.visible)}
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

export default SkillModal
