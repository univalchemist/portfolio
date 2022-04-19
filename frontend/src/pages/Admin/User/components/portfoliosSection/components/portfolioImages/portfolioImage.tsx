/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'

import { Image, Uploads, Maybe } from '@graphql/graphql'
import { ImageUploader } from '@components/index'
import { OnChangeImage } from '@root/types'

interface Props {
  defaultImage: Maybe<Image>
  image: Maybe<Uploads>
  onChange: OnChangeImage
}

const PortfolioImage: React.FC<Props> = ({ defaultImage, image, onChange }) => {
  const preview = useMemo(() => {
    if (image) return URL.createObjectURL(image.file)
    return defaultImage?.url
  }, [defaultImage, image])

  const index = useMemo(
    () => defaultImage?.index || image?.index || 0,
    [defaultImage?.index, image?.index],
  )

  return (
    <div className="w-100 h-100 portfolio-image-container">
      {Boolean(preview) && (
        <img src={preview} className="portfolio-image" alt="Image" />
      )}
      <ImageUploader
        onDropFile={(f: File[] | null) => onChange(f ? f[0] : null, index)}
      />
    </div>
  )
}

export default PortfolioImage
