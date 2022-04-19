/* eslint-disable no-unused-vars */
import React from 'react'

import { UserLink } from '@graphql/graphql'
import { FormError, FormGroup, Label, Input, Select } from '@components/index'
import { KeyValue } from '@root/types'

import RemoveButton from '@pages/Admin/User/components/shared/removeButton'

interface Props {
  externalLinks: { label: string; value: string }[]
  link: UserLink
  errors: KeyValue<string>
  onChange: (
    index: number,
    name: string,
    value: string | number | boolean,
  ) => void
  onRemove: (index: number) => void
}

const Link: React.FC<Props> = ({
  externalLinks,
  link,
  errors,
  onChange,
  onRemove,
}) => {
  const nameKey = `link_name_${link.index}`
  const urlKey = `link_url_${link.index}`
  const visibleKey = `link_visible_${link.index}`

  return (
    <>
      <div className="col-lg-3 col-md-4">
        <FormGroup>
          <Label htmlFor={nameKey}>
            Name
            <sup className="required">*</sup>
          </Label>
          <Select
            id={nameKey}
            name={nameKey}
            value={link.name}
            options={externalLinks}
            onChange={(e: any) => onChange(link.index, 'name', e.target.value)}
            size="lg"
          />

          {!!errors[nameKey] && <FormError>{errors[nameKey]}</FormError>}
        </FormGroup>
      </div>
      <div className="col-lg-7 col-md-5">
        <FormGroup>
          <Label htmlFor={urlKey}>
            URL
            <sup className="required">*</sup>
          </Label>
          <Input
            id={urlKey}
            name={urlKey}
            value={link.url}
            type="text"
            onChange={(e: any) => onChange(link.index, 'url', e.target.value)}
            size="lg"
          />

          {!!errors[urlKey] && <FormError>{errors[urlKey]}</FormError>}
        </FormGroup>
      </div>
      <div className="col-lg-2 col-md-3 d-flex position-relative align-items-center">
        <FormGroup className="mb-0">
          <Input
            id={visibleKey}
            name={visibleKey}
            checked={link.visible}
            type="checkbox"
            onChange={() => onChange(link.index, 'visible', !link.visible)}
            size="lg"
          />
          <Label htmlFor={visibleKey}>Visible</Label>
        </FormGroup>
        <RemoveButton
          className="link-toolbar"
          onClick={() => onRemove(link.index)}
        />
      </div>
    </>
  )
}

export default Link
