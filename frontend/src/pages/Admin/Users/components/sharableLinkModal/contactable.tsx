/* eslint-disable no-unused-vars */
import React from 'react'

import { FormGroup, Label, Input } from '@components/index'

interface Props {
  name: string
  value: boolean
  onChange: (name: string, value: string | boolean) => void
}

const Contactable: React.FC<Props> = ({ name, value, onChange }) => {
  return (
    <div className="row mb-2">
      <div className="col-12">
        <div className="link-label">Show contact info?</div>
        <div className="link-description mb-4">
          Disabling this will hide all contact info including Contact-us
          section.
        </div>
        <div className="w-100 ml-2 d-flex align-items-center flex-wrap">
          <div className="px-2 mb-2 d-flex align-items-center position-relative">
            <FormGroup className="mb-0">
              <Input
                id={name}
                name={name}
                checked={value}
                type="checkbox"
                onChange={() => onChange(name, !value)}
                size="lg"
              />
              <Label htmlFor={name}>Show contact info</Label>
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contactable
