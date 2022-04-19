import React from 'react'
import { Plus } from 'react-feather'

import './styles.scss'

interface Props {
  onClick: () => void
}

const CreateButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button type="button" className="create-user" onClick={() => onClick()}>
      <div>
        <Plus />
      </div>
    </button>
  )
}

export default CreateButton
