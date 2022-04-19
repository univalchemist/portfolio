/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Client,
  Maybe,
  ClientInput,
  useUpsertClientsMutation,
} from '@graphql/graphql'
import { Button, DragDrop } from '@components/index'
import { AppContext } from '@root/AppContext'
import { OnUserUpdated, KeyValue } from '@root/types'
import { moveElInArray } from '@utils/index'

import SectionDescription from '@pages/Admin/User/components/shared/sectionDesc'
import DragHandler from '@pages/Admin/User/components/shared/dragHandler'
import AddButton from '@pages/Admin/User/components/shared/addButton'
import UserClient from './components/userClient'

import './styles.scss'

interface Props {
  data: Maybe<Client[]>
  userId: Maybe<string>
  onUpdate: OnUserUpdated
  onLoading: (loading: boolean) => void
}

const ClientsSection: React.FC<Props> = ({
  data,
  userId,
  onUpdate,
  onLoading,
}) => {
  const { notifyMessage } = useContext(AppContext)
  const [userClients, setUserClients] = useState<ClientInput[]>([])
  const [errors, setErrors] = useState({})

  const [upsertClients, { loading }] = useUpsertClientsMutation()

  useEffect(() => {
    onLoading(loading)
  }, [onLoading, loading])

  useEffect(() => {
    const _clients: ClientInput[] = (data || []).map(
      ({
        id,
        userId,
        index,
        logo,
        name,
        clientInfo,
        url,
        feedback,
        visible,
      }) => ({
        id,
        userId,
        index: index || 0,
        logo,
        name,
        clientInfo,
        url,
        feedback,
        visible,
      }),
    )
    if (!_clients.length) {
      _clients.push({
        id: null,
        userId,
        index: 0,
        name: 'Anonymous',
        clientInfo: '',
        url: '',
        feedback: '',
        visible: true,
      })
    }
    setUserClients(_clients)
  }, [data, userId])

  const validateClients = useCallback(() => {
    const _errors: KeyValue<string> = {}
    let valid = true

    userClients.forEach((client: ClientInput) => {
      if (!client.name || client.name === 'Anonymous') {
        _errors[`name_${client.index}`] = 'Client name is required'
        valid = false
      }
      if (client.url) {
        const validUrl = /^(http|https):\/\/[^ "]+$/.test(client.url)
        if (!validUrl) {
          _errors[`url_${client.index}`] = 'URL is invalid'
          valid = false
        } else {
          _errors[`url_${client.index}`] = ''
        }
      }
    })
    setErrors(_errors)

    return valid
  }, [userClients])

  const onAddNewClient = useCallback(() => {
    const lastLink = userClients.sort((a, b) =>
      (a.index || 0) > (b.index || 0) ? -1 : 1,
    )[0]
    setUserClients(c => [
      ...c,
      {
        index: (lastLink.index || 0) + 1,
        id: null,
        userId,
        name: 'Anonymous',
        clientInfo: '',
        url: '',
        feedback: '',
        visible: true,
      },
    ])
  }, [userClients, userId])

  const onRemoveClient = useCallback(
    (index: number, id: Maybe<string>) => {
      const _userClients = id
        ? [...userClients].map(uc => {
            if (uc.index === index) {
              return { ...uc, index: -1 }
            }

            return uc
          })
        : [...userClients].filter(uc => uc.index !== index)
      setUserClients(_userClients)
    },
    [userClients],
  )

  const onChangeIndex = useCallback(
    (sourceIndex: number, destIndex: number) => {
      const _clients: ClientInput[] = moveElInArray(
        // @ts-ignore
        userClients,
        sourceIndex,
        destIndex,
      ) as ClientInput[]

      setUserClients(_clients)
    },
    [userClients],
  )

  const onChange = useCallback(
    (index: number, name: string, value: string | number | boolean) => {
      const _clients = userClients.map((userClient: ClientInput) => {
        if (index === userClient.index) {
          // @ts-ignore
          userClient[name] = value
        }

        return userClient
      })

      setUserClients(_clients)
    },
    [userClients],
  )

  const onChangeLogo = useCallback(
    (f: File | null, index: number) => {
      const _clients = userClients.map((userClient: ClientInput) => {
        if (index === userClient.index) {
          // @ts-ignore
          userClient.newLogo = f
            ? {
                id: userClient.logo?.id,
                file: f,
                index,
                prevPath: userClient.logo?.path,
              }
            : null
        }

        return userClient
      })

      setUserClients(_clients)
    },
    [userClients],
  )

  const onSubmit = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      if (!validateClients()) {
        return
      }

      upsertClients({
        variables: {
          input: userClients,
        },
        onCompleted: res => {
          notifyMessage(
            res.upsertClients.status ? 'success' : 'error',
            res.upsertClients.message,
          )
          if (res.upsertClients.status) {
            onUpdate('clients', res.upsertClients.data)
          }
        },
      })
    },
    [notifyMessage, onUpdate, upsertClients, userClients, validateClients],
  )

  const clients = useMemo(() => {
    return userClients
      .filter(uc => uc.index !== -1)
      .sort((a, b) => ((a.index || 0) > (b.index || 0) ? 1 : -1))
  }, [userClients])

  if (userId && !userClients.length) return null

  return (
    <>
      <SectionDescription description="Clients who you've worked with" />
      <div className="col-12 form-wrapper form-dark user-clients-container">
        <div className="row">
          <DragDrop
            dropClassName="col-12 py-4"
            dragClassName="row client-row py-3"
            data={clients}
            isDraggable={Boolean(clients.length)}
            renderDragHandler={handleProps => <DragHandler {...handleProps} />}
            renderItem={item => (
              <UserClient
                data={item}
                errors={errors}
                onChange={onChange}
                onChangeLogo={onChangeLogo}
                onRemove={onRemoveClient}
              />
            )}
            onDragEnd={onChangeIndex}
          />
        </div>
        <div className="row">
          <AddButton onClick={onAddNewClient} />
        </div>
        <div className="row">
          <div className="col-lg-12 mt-5 d-flex justify-content-end">
            <Button type="submit" disabled={loading} onClick={onSubmit}>
              <span>{loading ? 'Saving' : 'Save'}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientsSection
