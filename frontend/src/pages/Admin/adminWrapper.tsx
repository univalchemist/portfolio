import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './components/header'

const AdminWrapper: React.FC = () => {
  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification')
    } else {
      window.Notification.requestPermission()
    }
  }, [])

  return (
    <>
      <Header className="admin-header" />
      <main className="page-wrapper-two admin-wrapper">
        <Outlet />
      </main>
    </>
  )
}

export default AdminWrapper
