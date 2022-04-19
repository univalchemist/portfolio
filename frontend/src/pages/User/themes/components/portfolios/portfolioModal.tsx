/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import Modal from 'react-bootstrap/Modal'
import { X, ThumbsUp } from 'react-feather'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

import ImagePlaceholder from '@assets/images/img_placeholder.png'
import { Button, TechStacks } from '@components/index'
import { ProfilePortfolio } from '@root/types'

interface Props {
  show: boolean
  data: ProfilePortfolio
  onClose: () => void
  onLike: () => void
}

const PortfolioModal: React.FC<Props> = ({ show, data, onClose, onLike }) => {
  const [playing, setPlaying] = useState<boolean>(false)

  const images = useMemo(() => {
    return data.images
      .sort((a, b) => ((a.index || 0) > (b.index || 0) ? 1 : -1))
      .map(img => ({
        original: img.url,
        thumbnail: img.url,
        originalHeight: 600,
        originalWidth: 600,
        thumbnailHeight: 100,
        thumbnailWidth: 75,
      }))
  }, [data.images])

  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName="modal-90w"
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
        <div className="row">
          <div className="col-lg-6">
            <div
              className={classNames(
                'portfolio-popup-thumbnail',
                playing ? 'playing' : '',
              )}
            >
              {images.length ? (
                <ImageGallery
                  items={images}
                  showBullets={images.length > 1}
                  showPlayButton={images.length > 1}
                  showThumbnails={images.length > 1}
                  showNav={false}
                  slideInterval={2000}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />
              ) : (
                <img
                  src={images[0]?.original || ImagePlaceholder}
                  alt={data.title}
                  className="placeholder image-gallery-image"
                />
              )}
            </div>
          </div>

          <div className="col-lg-6 d-flex flex-column">
            <div className="d-flex flex-column pt-4">
              <h6>
                <span>Featured - {data.category}</span>
                {data.title}
              </h6>
              <p>{data.description}</p>
            </div>
            <div className="mt-2 d-flex justify-content-end">
              <Button onClick={onLike} className="thumbs-icon">
                <span>LIKE THIS </span>
                <ThumbsUp />
              </Button>
            </div>
            <TechStacks techStacks={data.techStacks || []} className="mt-5" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default PortfolioModal
