/* eslint-disable no-unused-vars */
import React from 'react'

import { Contact, ExternalLink } from '@graphql/graphql'
import { ConfirmButton } from '@components/index'
import { fullName, formatTime } from '@utils/index'

interface Props {
  data: Contact
  onView: (id: string) => void
  onDelete: (id: string) => void
}

const ContactItem: React.FC<Props> = ({ data, onView, onDelete }) => {
  return (
    <div
      className="col-12 col-md-10 col-lg-8 col-xl-6"
      onClick={() => onView(data.id)}
    >
      <div className="d-flex flex-column position-relative p-3 mb-4 contact-item">
        {!data.seen && <span className="px-3 new-badge">New</span>}
        <span className="pb-2 contact-ref">
          {data.ref || ExternalLink.Other}
        </span>
        <div className="d-flex flex-row align-items-center w-100 px-2 contact-info">
          <span className="color-lightn info-label">To: </span>
          <span className="flex-1 text-left color-lightn ml-2 contact-to">
            {`${fullName({
              firstName: data.user?.firstName,
              middleName: data.user?.middleName,
              lastName: data.user?.lastName,
            })} (${data.user?.email})`}
          </span>
        </div>
        <div className="d-flex flex-row align-items-center w-100 px-2 contact-info">
          <span className="color-lightn info-label">From: </span>
          <span className="flex-1 text-left ml-2 contact-from">
            {data.name ? `${data.name} (${data.email})` : data.email}
          </span>
        </div>
        <div className="w-100 text-right mt-2 mb-1 contact-time">
          {formatTime(data.createdAt)}
        </div>
        {!!data.message && (
          <div className="pt-2 pl-4 flex-1 text-left contact-message">
            {data.message}
          </div>
        )}
        <div className="d-flex flex-row align-items-center justify-content-end mt-3">
          <ConfirmButton
            className="w-auto ml-3"
            iconClassName="action-icon"
            iconName="trash-2"
            iconSize={14}
            variant="danger"
            onClick={() => onDelete(data.id)}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactItem
