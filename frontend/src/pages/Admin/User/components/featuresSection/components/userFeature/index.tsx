/* eslint-disable no-unused-vars */
import React from 'react'

import { FeatureInput, Maybe } from '@graphql/graphql'
import {
  FormError,
  FormGroup,
  Input,
  Textarea,
  Divider,
} from '@components/index'
import { KeyValue } from '@root/types'

import RemoveButton from '@pages/Admin/User/components/shared/removeButton'

interface Props {
  data: FeatureInput
  errors: KeyValue<string>
  onChange: (
    index: number,
    name: string,
    value: string | number | boolean,
  ) => void
  onRemove: (index: number, id: Maybe<string>) => void
}

const UserFeature: React.FC<Props> = ({ data, errors, onChange, onRemove }) => {
  const titleKey = `title_${data.index}`
  const descriptionKey = `description_${data.index}`
  const iconKey = `icon_${data.index}`

  return (
    <div className="col-12">
      <div className="d-flex">
        <div className="flex-1">
          <div className="row">
            <div className="col-lg-9 col-8">
              <FormGroup>
                <Input
                  id={titleKey}
                  name={titleKey}
                  value={data.title || ''}
                  placeholder="Title"
                  type="text"
                  onChange={(e: any) =>
                    onChange(data.index || 0, 'title', e.target.value)
                  }
                  size="lg"
                />

                {!!errors[titleKey] && (
                  <FormError>{errors[titleKey]}</FormError>
                )}
              </FormGroup>
            </div>
            <div className="col-lg-3 col-4">
              <FormGroup>
                <Input
                  id={iconKey}
                  name={iconKey}
                  value={data.icon || ''}
                  placeholder="Icon(Feather icon)"
                  type="text"
                  onChange={(e: any) =>
                    onChange(data.index || 0, 'icon', e.target.value)
                  }
                  size="lg"
                />
              </FormGroup>
            </div>
          </div>
        </div>

        <RemoveButton
          className="feature-toolbar"
          onClick={() => onRemove(data.index || 0, data.id)}
        />
      </div>
      <div className="mt-4">
        <FormGroup>
          <Textarea
            id={descriptionKey}
            size="lg"
            name={descriptionKey}
            value={data.description || ''}
            placeholder="Description"
            type="textarea"
            rows={5}
            onChange={(e: any) =>
              onChange(data.index || 0, 'description', e.target.value)
            }
          />
        </FormGroup>
      </div>
      <Divider />
    </div>
  )
}

export default UserFeature
