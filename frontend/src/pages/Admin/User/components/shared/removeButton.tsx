import React from 'react'
import { Trash2 } from 'react-feather'

import './styles.scss'

interface Props {
  className?: string
  onClick: () => void
}

const RemoveButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div className={className}>
      <button type="button" className="remove-btn shared" onClick={onClick}>
        <div>
          <Trash2 size={12} color="#ff014f" />
        </div>
      </button>
    </div>
  )
}

export default RemoveButton
