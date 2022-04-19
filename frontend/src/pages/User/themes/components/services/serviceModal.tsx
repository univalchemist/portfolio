/* eslint-disable no-unused-vars */
import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { X } from 'react-feather'

import { Maybe } from '@graphql/graphql'

interface Props {
  show: boolean
  title: Maybe<string>
  description: Maybe<string>
  onClose: () => void
}

const ServiceModal: React.FC<Props> = ({
  show,
  title,
  description,
  onClose,
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName="custom-modal modal-small service-modal"
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
          <div className="col-lg-12">
            <div className="service-title mb-2">{title}</div>
            <pre className="service-text">{description}</pre>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ServiceModal
