import React from 'react'
import { Menu } from 'react-feather'

import { KeyValue } from '@root/types'

import './styles.scss'

type Props = KeyValue<any>

const DragHandler: React.FC<Props> = ({ ...rest }) => {
  return (
    <div className="drag-handler shared" {...rest}>
      <div>
        <Menu size={14} color="#FFFFFF" />
      </div>
    </div>
  )
}

export default DragHandler
