import React, { useCallback, useContext, useEffect, useState } from 'react'

import {
  SettingInput,
  SettingConfig,
  ConfigInput,
  Maybe,
  useAdminSettingQuery,
  useUpsertSettingMutation,
  AdminType,
} from '@graphql/graphql'
import { KeyValue } from '@root/types'
import { AppContext } from '@root/AppContext'
import { Button, LoadingWrapper } from '@components/index'
import SettingSectionTitle from '@pages/Admin/components/adminSectionTitle'

import ConfigBlock from './components/config'
import TelegramConnect from './components/telegramConnect'

import './styles.scss'

const SettingsPage: React.FC = () => {
  const { notifyMessage, admin } = useContext(AppContext)
  const [setting, setSetting] = useState<SettingInput>({} as SettingInput)
  const [errors, setErrors] = useState<KeyValue<string>>({})

  const { data, loading } = useAdminSettingQuery({
    fetchPolicy: 'no-cache',
  })
  const [upsertSetting, { loading: upsertingSetting }] =
    useUpsertSettingMutation()

  const initSetting = useCallback((data: Maybe<SettingConfig>) => {
    if (data) {
      const { setting, config } = data
      setSetting({
        id: setting?.id,
        links: setting?.links,
        other: setting?.other,
        config: config || {
          dropBoxToken: '',
          telegramToken: '',
        },
      })
    } else {
      setSetting({
        id: null,
        links: [],
        other: [],
        config: {
          dropBoxToken: '',
          telegramToken: '',
        },
      })
    }
  }, [])

  useEffect(() => {
    initSetting(data?.setting.data)
  }, [data?.setting.data, initSetting])

  const validate = useCallback(() => {
    let valid = true

    if (!setting?.config?.dropBoxToken) {
      valid = false

      setErrors({ dropBoxToken: 'This field is required' })
    }

    return valid
  }, [setting.config?.dropBoxToken])

  const onChange = useCallback(
    (group: 'setting' | 'config', name: string, value: string) => {
      const _error: KeyValue<string> = {}

      if (group === 'config') {
        if (name === 'dropBoxToken') {
          if (value) {
            _error[name] = ''
          } else {
            _error[name] = 'This field is required'
          }
        }

        const _config: ConfigInput = setting.config as ConfigInput
        setSetting({ ...setting, config: { ..._config, [name]: value } })
      }
      setErrors(e => ({ ...e, ..._error }))
    },
    [setting],
  )

  const onSave = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (!validate()) return

      upsertSetting({
        variables: {
          input: setting,
        },
        onCompleted: res => {
          notifyMessage(
            res.upsertSetting.status ? 'success' : 'error',
            res.upsertSetting.message,
          )

          initSetting(res.upsertSetting.data)
        },
      })
    },
    [initSetting, notifyMessage, setting, upsertSetting, validate],
  )

  return (
    <section className="rn-section-gap pb--110 align-items-center pt--75">
      <div className="container settings-page">
        <SettingSectionTitle title="Setting & Config" />
        {admin?.type === AdminType.SuperAdmin && (
          <>
            <div className="row">
              <LoadingWrapper loading={loading} isEmpty={!setting}>
                <ConfigBlock
                  data={setting.config}
                  errors={errors}
                  onChange={(name: string, value: string) =>
                    onChange('config', name, value)
                  }
                />
              </LoadingWrapper>
            </div>

            <div className="row">
              <div className="col-12 col-md-10 mt-5 d-flex justify-content-end">
                <Button
                  type="submit"
                  disabled={upsertingSetting}
                  onClick={onSave}
                >
                  <span>{loading ? 'Saving' : 'Save'}</span>
                </Button>
              </div>
            </div>
          </>
        )}
        <div className="row">
          <TelegramConnect adminId={admin?.id} tgChatId={admin?.tgChatId} />
        </div>
      </div>
    </section>
  )
}

export default SettingsPage
