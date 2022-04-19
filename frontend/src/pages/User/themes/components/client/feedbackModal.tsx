/* eslint-disable no-unused-vars */
import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { X } from 'react-feather'
import 'react-image-gallery/styles/css/image-gallery.css'

import QuoteIcon from '@assets/images/icons/quote_white.png'
import { Maybe } from '@graphql/graphql'

interface Props {
  show: boolean
  data: { feedback: Maybe<string>; clientInfo: Maybe<string> } | undefined
  clientInfo?: string
  onClose: () => void
}

const FeedbackModal: React.FC<Props> = ({ show, data, onClose }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName="custom-modal modal-small feedback-modal"
      aria-labelledby="example-custom-modal-styling-title"
      centered={true}
    >
      <Modal.Header>
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="sr-only"
        >
          Custom Modal Styling
        </Modal.Title>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">
            <X />
          </span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="row align-items-center">
          <div className="col-12 p-0 mb-2">
            <img src={QuoteIcon} alt="quote" className="feedback-quote" />
          </div>
          <div className="col-lg-12">
            <pre className="feedback-text">{data?.feedback}</pre>
            {!!data?.clientInfo && (
              <div className="mt-3 w-100 text-right feedback-client">
                - {data?.clientInfo}
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default FeedbackModal
