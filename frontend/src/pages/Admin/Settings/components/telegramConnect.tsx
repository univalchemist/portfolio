import React, { useCallback, useMemo } from 'react'
import { FaTelegram } from 'react-icons/fa'

import { Maybe, useTgChatIdUpdatedSubscription } from '@graphql/graphql'
import { TG_BOT } from '@root/constants'

import { useSetTgChatIdMutation } from '@graphql/graphql'

interface Props {
  adminId: string | undefined
  tgChatId: Maybe<string>
}

const TelegramConnect: React.FC<Props> = ({ adminId, tgChatId }) => {
  const [setTGChatId] = useSetTgChatIdMutation()
  const { data: subData } = useTgChatIdUpdatedSubscription()

  const connected = useMemo(() => {
    if (!subData?.tgChatIdUpdated) return Boolean(tgChatId)

    return Boolean(subData.tgChatIdUpdated?.tgChatId)
  }, [subData?.tgChatIdUpdated, tgChatId])

  const onSetTGChatId = useCallback(() => {
    if (!adminId) return
    setTGChatId({
      variables: {
        id: adminId,
      },
    })
  }, [adminId, setTGChatId])

  if (!adminId) return null

  return (
    <div className="col-12 mt-5 d-flex">
      <div className="telegram-button">
        {connected ? (
          <a className="tg-connected" onClick={onSetTGChatId}>
            <FaTelegram size={24} />
            <span className="ml-3">Disconnect Telegram</span>
          </a>
        ) : (
          <a
            className="tg-disconnected"
            href={`https://t.me/${TG_BOT}?start=${adminId}`}
            target="_blank"
          >
            <FaTelegram size={24} />
            <span className="ml-3">Connect Telegram</span>
          </a>
        )}
      </div>
    </div>
  )
}

export default TelegramConnect
