/* eslint-disable no-unused-vars */
import React from 'react'
import { Eye, EyeOff } from 'react-feather'

import { ExperienceInput } from '@graphql/graphql'
import { ConfirmButton } from '@components/index'

interface Props {
  data: ExperienceInput
  onEdit: (e: ExperienceInput) => void
  onDelete: (index: number) => void
}

const ExperienceItem: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="col-12">
      <div className="d-flex flex-column position-relative p-3 resume-item">
        {/* <span className="px-3 new-badge">New</span> */}
        <div className="d-flex align-items-center mb-2">
          <span className="title flex-1 text-left color-lightn">
            {data.title}
          </span>
          <span className="pl-3">
            {data.visible ? (
              <Eye size={16} color="#ff014f" />
            ) : (
              <EyeOff size={16} />
            )}
          </span>
        </div>
        <div className="resume-item-info">
          <span className="resume-place">{data.at}</span>
          <span className="ml-2 resume-duration">{`(${data.startedFrom} - ${
            data.endedAt || 'Now'
          })`}</span>
        </div>
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
          <ConfirmButton
            className="w-auto ml-3"
            iconClassName="action-icon"
            iconName="trash-2"
            iconSize={14}
            variant="danger"
            onClick={() => onDelete(data.index)}
          />
        </div>
      </div>
    </div>
  )
}

export default ExperienceItem
