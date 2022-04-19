/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'

import { AdminInput, AdminType, InputMaybe } from '@graphql/graphql'
import { ConfirmButton } from '@components/index'

interface Props {
  data: AdminInput
  deleting: boolean
  onEdit: (a: AdminInput) => void
  onDelete: (id: InputMaybe<string>) => void
}

const AdminItem: React.FC<Props> = ({ data, deleting, onEdit, onDelete }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="d-flex flex-column position-relative p-3 admin-item">
        <span className="admin-email flex-1 text-left color-lightn">
          {data.email}
        </span>
        <span
          className={classNames('admin-type flex-1 text-left mt-1', {
            'super-admin': data.type === AdminType.SuperAdmin,
          })}
        >
          {data.type}
        </span>
        <div className="d-flex flex-row align-items-center justify-content-end mt-3">
          <ConfirmButton
            className="w-auto"
            iconClassName="action-icon"
            iconName="edit"
            iconSize={14}
            variant="info"
            wait={false}
            onClick={() => onEdit(data)}
          />
          {data.type !== AdminType.SuperAdmin && (
            <ConfirmButton
              className="w-auto ml-3"
              iconClassName="action-icon"
              iconName="trash-2"
              iconSize={14}
              variant="danger"
              loading={deleting}
              onClick={() => onDelete(data.id)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminItem
