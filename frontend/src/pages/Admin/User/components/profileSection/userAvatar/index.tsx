/* eslint-disable no-unused-vars */
import React, { useCallback, useRef, useMemo } from 'react'

import { Maybe, Image, Uploads } from '@graphql/graphql'
import { ImageUploader } from '@components/index'
import AvatarPlaceholder from '@assets/images/avatar-placeholder.jpeg'

import Helper from '@pages/Admin/User/components/shared/helper'
import './styles.scss'

interface Props {
  defaultAvatar: Maybe<Image>
  avatar: Maybe<Uploads>
  onChange: (f: Uploads | null) => void
}

type Uploader = React.ElementRef<typeof ImageUploader>

const UserAvatar: React.FC<Props> = ({ defaultAvatar, avatar, onChange }) => {
  const uploaderRef = useRef<Uploader>(null)

  const previewAvatar = useMemo(() => {
    if (avatar) return URL.createObjectURL(avatar.file)
    return defaultAvatar?.url || AvatarPlaceholder
  }, [avatar, defaultAvatar?.url])

  const onChangeImage = useCallback(
    (f: File | null) => {
      if (!f) {
        onChange(null)
      } else {
        onChange({
          id: defaultAvatar?.id,
          index: defaultAvatar?.index || 0,
          file: f,
        })
      }
    },
    [defaultAvatar?.id, defaultAvatar?.index, onChange],
  )

  return (
    <div className="row pb-5 mb-2">
      <div className="col-12 d-flex flex-column align-items-center">
        <div className="avatar-container">
          <img src={previewAvatar} className="user-avatar" alt="user avatar" />
          <ImageUploader
            ref={uploaderRef}
            onDropFile={(f: File[] | null) => onChangeImage(f ? f[0] : null)}
          />
        </div>
        <Helper text="200 x 200" />
      </div>
    </div>
  )
}

export default UserAvatar
