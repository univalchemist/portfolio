/* eslint-disable no-unused-vars */
import React, { useCallback, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import { Edit, X } from 'react-feather'

import './styles.scss'

interface Props {
  wrapperClassName?: string
  multiple?: boolean
  editable?: boolean
  onDropFile: (f: File[] | null) => void
}

interface OpenFileBrowser {
  _open: () => void
}

const ImageUploader: React.ForwardRefRenderFunction<OpenFileBrowser, Props> = (
  { multiple = false, editable = true, onDropFile, wrapperClassName },
  ref,
) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles?.length) return

      onDropFile(acceptedFiles)
    },
    [onDropFile],
  )

  const onEdit = useCallback((e: any) => {
    e.preventDefault()
    e.stopPropagation()
    inputRef.current?.click()
  }, [])

  const onRemove = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      onDropFile(null)
    },
    [onDropFile],
  )

  useImperativeHandle(
    ref,
    () => ({
      _open() {
        inputRef.current?.click()
      },
    }),
    [],
  )

  return (
    <>
      <Dropzone onDrop={onDrop} multiple={multiple} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div
            className={classNames('drop-area', wrapperClassName)}
            {...getRootProps()}
            ref={inputRef}
          >
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      {editable && (
        <div className="d-flex justify-content-center align-items-center edit-image-container">
          <button className="mx-1" onClick={onEdit}>
            <Edit size={14} color="#ff014f" />
          </button>
          <button className="mx-1" onClick={onRemove}>
            <X size={14} color="#ff014f" />
          </button>
        </div>
      )}
    </>
  )
}

export default React.forwardRef(ImageUploader)
