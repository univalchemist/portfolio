/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { X } from 'react-feather'

import { ExternalLink } from '@graphql/graphql'
import { IThemes } from '@root/types'

import SharableLink from './sharableLink'
import ExternalLinks from './externalLinks'
import Themes from './themes'
import Contactable from './contactable'

interface Props {
  show: boolean
  slug: string | undefined
  onClose: () => void
}

const SharableLinkModal: React.FC<Props> = ({ show, slug, onClose }) => {
  const [links, setLinks] = useState<string[]>([])
  const [platforms, setPlatforms] = useState<string[]>([ExternalLink.Other])
  const [themes, setThemes] = useState<string[]>([IThemes.Default])
  const [contactable, setContactable] = useState<boolean>(true)

  const onChange = useCallback(
    (name: string, value: string | boolean) => {
      if (name === 'links') {
        const _links = [...links].filter(_l => _l !== value)
        if (!links.includes(value as string)) {
          _links.push(value as string)
        }
        setLinks(_links)
      } else if (name === 'platforms') {
        setPlatforms([value as string])
      } else if (name === 'themes') {
        setThemes([value as string])
      } else if (name === 'contactable') {
        setContactable(value as boolean)
      }
    },
    [links],
  )

  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered={true}
    >
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title" className="h6">
          Generate sharable user link
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
      <Modal.Body className="sharable-link-modal">
        <div className="form-wrapper form-dark no-shadow py-0 px-3">
          <SharableLink
            slug={slug}
            links={links}
            platforms={platforms}
            themes={themes}
            contactable={contactable}
          />
          <ExternalLinks
            name="links"
            value={links}
            title="External link"
            description="Choose links you want to show in the portfolio."
            onChange={onChange}
          />
          <ExternalLinks
            name="platforms"
            value={platforms}
            title="Platforms"
            description="Choose a platform where you want to share with."
            onChange={onChange}
          />
          <Themes
            name="themes"
            value={themes}
            title="Theme"
            description="Choose your favorite theme."
            onChange={onChange}
          />
          <Contactable
            name="contactable"
            value={contactable}
            onChange={onChange}
          />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SharableLinkModal
