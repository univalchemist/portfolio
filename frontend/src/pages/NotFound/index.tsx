import React from 'react'

import './styles.scss'

const NotFoundPage: React.FC = () => {
  return (
    <div className="container404">
      <div>
        <div className="text404">404</div>
        <div className="text404-sub mt-5">
          The page you are looking for is not found
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
