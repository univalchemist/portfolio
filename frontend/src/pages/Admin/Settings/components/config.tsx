/* eslint-disable no-unused-vars */
import React from 'react'

import { ConfigInput, InputMaybe } from '@graphql/graphql'
import { KeyValue } from '@root/types'
import { FormGroup, FormError, Input, Label } from '@components/index'

interface Props {
  data: InputMaybe<ConfigInput>
  errors: KeyValue<string>
  onChange: (name: string, value: string) => void
}

const ConfigBlock: React.FC<Props> = ({ data, errors, onChange }) => {
  return (
    <div className="col-12 col-md-10 form-wrapper form-dark">
      <div className="row">
        <div className="col-12">
          <FormGroup>
            <Label htmlFor="dropBoxToken">DropBox Token</Label>
            <Input
              id="dropBoxToken"
              name="dropBoxToken"
              value={data?.dropBoxToken || ''}
              placeholder=""
              type="text"
              onChange={(e: any) => onChange('dropBoxToken', e.target.value)}
              size="lg"
            />
            {!!errors.dropBoxToken && (
              <FormError>{errors.dropBoxToken}</FormError>
            )}
          </FormGroup>
        </div>
        <div className="col-12">
          <FormGroup>
            <Label htmlFor="telegramToken">TelegramBot Token</Label>
            <Input
              id="telegramToken"
              name="telegramToken"
              value={data?.telegramToken || ''}
              placeholder=""
              type="text"
              onChange={(e: any) => onChange('telegramToken', e.target.value)}
              size="lg"
            />
            {!!errors.telegramToken && (
              <FormError>{errors.telegramToken}</FormError>
            )}
          </FormGroup>
        </div>
      </div>
    </div>
  )
}

export default ConfigBlock
