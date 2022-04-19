/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { Plus } from 'react-feather'

import { ImageUploader } from '@components/index'

interface Props {
  onAdd: (f: File | null) => void
}

type Uploader = React.ElementRef<typeof ImageUploader>

const PortfolioImage: React.FC<Props> = ({ onAdd }) => {
  const uploaderRef = useRef<Uploader>(null)

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 portfolio-image-add">
      <ImageUploader
        ref={uploaderRef}
        editable={false}
        onDropFile={(f: File[] | null) => onAdd(f ? f[0] : null)}
      />
      <div
        className="add-image-btn"
        onClick={() => uploaderRef.current?._open()}
      >
        <Plus color="red" />
      </div>
    </div>
  )
}

export default PortfolioImage
