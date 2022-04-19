import React from 'react'

interface Props {
  title: string
  text: string | number
  onClick: () => void
}

const Item: React.FC<Props> = ({ title, text, onClick }) => (
  <div className="dashboard-item px-4 py-3 mx-3 my-3 my-md-0" onClick={onClick}>
    <span className="dashboard-item-title">{title}</span>
    <span className="dashboard-item-text">{text}</span>
  </div>
)

export default Item
