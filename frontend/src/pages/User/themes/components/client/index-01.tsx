import React, { useState, useCallback } from 'react'

import { SectionTitle } from '@components/index'
import { ProfileClient } from '@root/types'
import { Maybe } from '@graphql/graphql'
import ClientCard from './client01'
import FeedbackModal from './feedbackModal'

import './styles.scss'

interface Props {
  id?: string
  data: ProfileClient[]
}

const ClientsArea: React.FC<Props> = ({ data, id = 'clients' }) => {
  const [showModal, setShowModal] = useState(false)
  const [feedbackData, setFeedbackData] = useState<
    { feedback: Maybe<string>; clientInfo: Maybe<string> } | undefined
  >()

  const onReadMore = useCallback(
    (_feedback: Maybe<string>, _clientInfo?: Maybe<string>) => {
      if (_feedback) {
        setFeedbackData({ feedback: _feedback, clientInfo: _clientInfo })
        setShowModal(true)
      }
    },
    [],
  )

  const onClose = useCallback(() => {
    setShowModal(false)
    setFeedbackData(undefined)
  }, [])

  if (!data.length) return null

  return (
    <div className="rn-client-area rn-section-gap section-separator" id={id}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              align="center"
              title="Awesome Clients"
              subtitle="POPULAR CLIENTS"
            />
          </div>
        </div>

        <div className="row mt--50 mt_md--40 mt_sm--40">
          <div className="col-12">
            <div className="client-card">
              {data.map((client: ProfileClient) => (
                <ClientCard
                  key={client.id}
                  logo={client.logo?.url}
                  name={client.name}
                  feedback={client.feedback}
                  onReadMore={() =>
                    onReadMore(client.feedback, client.clientInfo)
                  }
                  url={client.url}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <FeedbackModal show={showModal} data={feedbackData} onClose={onClose} />
    </div>
  )
}

export default ClientsArea
