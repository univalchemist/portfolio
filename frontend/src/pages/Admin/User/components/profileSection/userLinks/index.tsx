/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo } from 'react'

import { UserLink, ExternalLink } from '@graphql/graphql'
import { DragDrop } from '@components/index'
import { moveElInArray } from '@utils/index'
import { KeyValue } from '@root/types'

import DragHandler from '@pages/Admin/User/components/shared/dragHandler'
import AddButton from '@pages/Admin/User/components/shared/addButton'
import Link from './link'

import './styles.scss'

interface Props {
  links: UserLink[]
  errors: KeyValue<string>
  onChange: (l: UserLink[]) => void
  onAdd: () => void
  onRemove: (index: number) => void
}

const UserLinks: React.FC<Props> = ({
  links,
  errors,
  onChange,
  onAdd,
  onRemove,
}) => {
  const _onChangeIndex = useCallback(
    (sourceIndex: number, destIndex: number) => {
      const _links: UserLink[] = moveElInArray(
        links,
        sourceIndex,
        destIndex,
      ) as UserLink[]

      onChange(_links)
    },
    [links, onChange],
  )

  const _onChange = useCallback(
    (index: number, name: string, value: string | number | boolean) => {
      const _links = links.map((userLink: UserLink) => {
        if (index === userLink.index) {
          // @ts-ignore
          userLink[name] = value
        }

        return userLink
      })

      onChange(_links)
    },
    [links, onChange],
  )

  const externalLinks = useMemo(
    () =>
      Object.entries(ExternalLink).map(([k, v]) => ({
        label: k,
        value: v,
      })),
    [],
  )

  return (
    <div className="col-12 user-links-container">
      <div className="row">
        <DragDrop
          dropClassName="col-12 py-4"
          dragClassName="row link-row py-3"
          data={links}
          isDraggable={Boolean(links.length)}
          renderDragHandler={handleProps => <DragHandler {...handleProps} />}
          renderItem={item => (
            <Link
              externalLinks={externalLinks}
              link={item}
              errors={errors}
              onChange={_onChange}
              onRemove={onRemove}
            />
          )}
          onDragEnd={_onChangeIndex}
        />
      </div>
      <div className="row">
        <AddButton onClick={onAdd} />
      </div>
    </div>
  )
}

export default UserLinks
