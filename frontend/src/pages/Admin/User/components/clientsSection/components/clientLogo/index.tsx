import React, { useMemo, useRef } from 'react'

import { Image, Uploads, Maybe } from '@graphql/graphql'
import { ImageUploader } from '@components/index'
import { OnChangeImage } from '@root/types'

import './styles.scss'

interface Props {
  defaultImage: Maybe<Image>
  image: Maybe<Uploads>
  index: number
  onChange: OnChangeImage
}

type Uploader = React.ElementRef<typeof ImageUploader>

const ClientLogo: React.FC<Props> = ({
  defaultImage,
  image,
  index,
  onChange,
}) => {
  const uploaderRef = useRef<Uploader>(null)

  const preview = useMemo(() => {
    if (image) return URL.createObjectURL(image.file)
    return defaultImage?.url
  }, [defaultImage, image])

  return (
    <div className="mr-2 client-logo-container mb-2">
      {Boolean(preview) && (
        <img src={preview} className="client-logo" alt="Image" />
      )}
      <ImageUploader
        ref={uploaderRef}
        onDropFile={(f: File[] | null) => onChange(f ? f[0] : null, index)}
      />
    </div>
  )
}

export default ClientLogo
