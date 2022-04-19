/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo } from 'react'

import { Image, Uploads } from '@graphql/graphql'
import { DragDrop } from '@components/index'
import { moveElInArray } from '@utils/index'

import DragHandler from '@pages/Admin/User/components/shared/dragHandler'
import PortfolioImage from './portfolioImage'
import PortfolioImageAdd from './portfolioImageAdd'

import './styles.scss'

interface Props {
  defaultImages: Image[]
  images: Uploads[]
  onChange: (df: Image[], nf: Uploads[]) => void
}

const PortfolioImages: React.FC<Props> = ({
  defaultImages,
  images,
  onChange,
}) => {
  const portfolioImages = useMemo(() => {
    const _images = images.filter(img => (img.index || 0) > -1)
    return [...defaultImages, ..._images].sort((a, b) =>
      (a.index || 0) > (b.index || 0) ? 1 : -1,
    )
  }, [defaultImages, images])

  const _onChange = useCallback(
    (f: File | null, index: number) => {
      const _defaultImages: Image[] = [...defaultImages].filter(
        img => img.index !== index,
      )
      const _images: Uploads[] = [...images].filter(img => img.index !== index)

      const existingDefault = defaultImages.find(img => img.index === index)
      const existing = images.find(img => img.index === index)

      _images.push({
        id: existing?.id || existingDefault?.id || null,
        index: f ? index : -1,
        file: f,
        prevPath: existing?.prevPath || existingDefault?.path || null,
      })

      onChange(_defaultImages, _images)
    },
    [defaultImages, images, onChange],
  )

  const _onChangeIndex = useCallback(
    (sourceIndex: number, destIndex: number) => {
      const _portfolioImages = moveElInArray(
        // @ts-ignore
        portfolioImages,
        sourceIndex,
        destIndex,
      )
      // @ts-ignore
      const _defaultImages = _portfolioImages.filter(
        img => !img.file,
      ) as Image[]
      // @ts-ignore
      const _images = _portfolioImages.filter(img => !!img.file) as Uploads[]

      onChange(_defaultImages, _images)
    },
    [onChange, portfolioImages],
  )

  const _onAdd = useCallback(
    (f: File | null) => {
      if (!f) return

      const indices: number[] = [
        ...defaultImages
          .map(img => img.index)
          .filter(i => i !== undefined && i !== null),
        ...images
          .map(img => img.index)
          .filter(i => i !== undefined && i !== null),
      ] as number[]

      const lastIndex = indices.length ? Math.max.apply(null, indices) : -1

      const _images: Uploads[] = [
        ...images,
        { id: null, index: lastIndex + 1, file: f },
      ]

      onChange(defaultImages, _images)
    },
    [defaultImages, images, onChange],
  )

  return (
    <div className="col-12 portfolio-images-container">
      <DragDrop
        dropClassName="row py-4"
        dragClassName="col-xl-3 col-lg-4 col-md-6 my-2 image-item"
        data={portfolioImages}
        horizontal
        isDraggable={Boolean(portfolioImages.length)}
        renderDragHandler={handleProps => <DragHandler {...handleProps} />}
        renderItem={item => (
          <PortfolioImage
            defaultImage={item.file ? null : item}
            image={item.file ? item : null}
            onChange={_onChange}
          />
        )}
        renderExtraItem={() => <PortfolioImageAdd onAdd={_onAdd} />}
        onDragEnd={_onChangeIndex}
      />
    </div>
  )
}

export default PortfolioImages
