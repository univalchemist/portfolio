import React from 'react'
import classNames from 'classnames'
import { Plus } from 'react-feather'

import './styles.scss'

interface Props {
  alignItems?: string
  justifyContent?: string
  onClick: () => void
}

const AddButton: React.FC<Props> = ({
  alignItems,
  justifyContent,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        'col-12 d-flex',
        `align-items-${alignItems || 'center'}`,
        `justify-content-${justifyContent || 'center'}`,
      )}
    >
      <button type="button" className="add-btn shared" onClick={onClick}>
        <div>
          <Plus />
        </div>
      </button>
    </div>
  )
}

export default AddButton
