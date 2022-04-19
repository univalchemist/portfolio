import React from 'react'
import classNames from 'classnames'

import './styles.scss'

interface Props {
  techStacks: string[]
  className?: string
}

const TechStacks: React.FC<Props> = ({ techStacks, className }) => {
  if (!techStacks.length) return null

  return (
    <div className={classNames('tech-stack-container', className)}>
      {techStacks.map((techStack: string) => (
        <div key={techStack} className="tech-stack-item">
          <span>{techStack}</span>
        </div>
      ))}
    </div>
  )
}

export default TechStacks
