/* eslint-disable no-unused-vars */
import React from 'react'

import { ClientInput, Maybe } from '@graphql/graphql'
import { FormError, FormGroup, Label, Input, Textarea } from '@components/index'
import { OnChangeImage, KeyValue } from '@root/types'

import RemoveButton from '@pages/Admin/User/components/shared/removeButton'
import Helper from '@pages/Admin/User/components/shared/helper'
import ClientLogo from '../clientLogo'

interface Props {
  data: ClientInput
  errors: KeyValue<string>
  onChange: (
    index: number,
    name: string,
    value: string | number | boolean,
  ) => void
  onChangeLogo: OnChangeImage
  onRemove: (index: number, id: Maybe<string>) => void
}

const UserClient: React.FC<Props> = ({
  data,
  errors,
  onChange,
  onChangeLogo,
  onRemove,
}) => {
  const nameKey = `name_${data.index}`
  const clientInfoKey = `clientInfo_${data.index}`
  const urlKey = `url_${data.index}`
  const feedbackKey = `feedback_${data.index}`
  const visibleKey = `visible_${data.index}`

  return (
    <div className="col-12">
      <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
        <div className="d-flex flex-column align-items-center">
          <ClientLogo
            defaultImage={data.logo}
            image={data.newLogo}
            index={data.index || 0}
            onChange={onChangeLogo}
          />
          <Helper text="200 x 100" />
        </div>
        <div className="flex-1 mb-2">
          <div className="row">
            <div className="col-lg-4 col-12">
              <FormGroup>
                <Input
                  id={nameKey}
                  name={nameKey}
                  value={data.name || ''}
                  placeholder="Name"
                  type="text"
                  onChange={(e: any) =>
                    onChange(data.index || 0, 'name', e.target.value)
                  }
                  size="lg"
                />

                {!!errors[nameKey] && <FormError>{errors[nameKey]}</FormError>}
              </FormGroup>
            </div>
            <div className="col-lg-6 col-12">
              <FormGroup>
                <Input
                  id={clientInfoKey}
                  name={clientInfoKey}
                  value={data.clientInfo || ''}
                  placeholder="Client info(name, position, etc)"
                  type="text"
                  onChange={(e: any) =>
                    onChange(data.index || 0, 'clientInfo', e.target.value)
                  }
                  size="lg"
                />

                {!!errors[clientInfoKey] && (
                  <FormError>{errors[clientInfoKey]}</FormError>
                )}
              </FormGroup>
            </div>
            <div className="col-lg-2 col-12 d-flex position-relative align-items-center">
              <FormGroup className="mb-0">
                <Input
                  id={visibleKey}
                  name={visibleKey}
                  checked={data.visible}
                  type="checkbox"
                  onChange={() =>
                    onChange(data.index || 0, 'visible', !data.visible)
                  }
                  size="lg"
                />
                <Label htmlFor={visibleKey}>Visible</Label>
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <FormGroup className="mb-0">
                <Input
                  id={urlKey}
                  name={urlKey}
                  value={data.url || ''}
                  type="text"
                  placeholder="URL"
                  onChange={(e: any) =>
                    onChange(data.index || 0, 'url', e.target.value)
                  }
                  size="lg"
                />

                {!!errors[urlKey] && <FormError>{errors[urlKey]}</FormError>}
              </FormGroup>
            </div>
          </div>
        </div>

        <RemoveButton
          className="client-toolbar"
          onClick={() => onRemove(data.index || 0, data.id)}
        />
      </div>
      <div className="mt-4">
        <FormGroup>
          <Textarea
            id={feedbackKey}
            size="lg"
            name={feedbackKey}
            value={data.feedback || ''}
            placeholder="Feedback"
            type="textarea"
            rows={5}
            onChange={(e: any) =>
              onChange(data.index || 0, 'feedback', e.target.value)
            }
          />
        </FormGroup>
      </div>
    </div>
  )
}

export default UserClient
