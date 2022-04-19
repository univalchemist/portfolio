import React, { useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import {
  UserInitialPage,
  UserPage,
  NotFoundPage,
  SignInPage,
  AdminDashboardPage,
  AdminUsersPage,
  AdminUserPage,
  AdminsPage,
  ContactsPage,
  SettingsPage,
  VisitsPage,
  AuthWrapper,
  AdminWrapper,
} from '@pages/index'

import { Layout } from '@components/index'
import {
  adminPath,
  userInitialPath,
  userPath,
  signInPath,
  adminsPath,
  adminUsersPath,
  adminUserCreatePath,
  adminUserEditPath,
  dashboardPath,
  contactsPath,
  settingsPath,
  visitsPath,
  notFoundPath,
} from '@utils/index'

const AppRoutes: React.FC = () => {
  const onError = useCallback((e: Error) => {
    console.log({ appError: e })
  }, [])

  return (
    <ErrorBoundary onError={onError} fallback={<div />}>
      <Layout>
        <Routes>
          <Route path={userInitialPath} element={<UserInitialPage />} />
          <Route path={userPath} element={<UserPage />} />
          <Route path={signInPath} element={<SignInPage />} />
          <Route path={adminPath} element={<AuthWrapper />}>
            <Route element={<AdminWrapper />}>
              <Route path={dashboardPath} element={<AdminDashboardPage />} />
              <Route path={adminUsersPath} element={<AdminUsersPage />} />
              <Route path={adminUserCreatePath} element={<AdminUserPage />} />
              <Route path={adminUserEditPath} element={<AdminUserPage />} />
              <Route path={adminsPath} element={<AdminsPage />} />
              <Route path={contactsPath} element={<ContactsPage />} />
              <Route path={settingsPath} element={<SettingsPage />} />
              <Route path={visitsPath} element={<VisitsPage />} />
            </Route>
            <Route path="*" element={<SignInPage />} />
          </Route>
          <Route path={notFoundPath} element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  )
}

export default AppRoutes
