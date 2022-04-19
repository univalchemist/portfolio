import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { useUserDataLazyQuery } from '@graphql/graphql'
import { IThemes } from '@root/types'
import { notFoundPath, normalizeUserData } from '@utils/index'
import { USER_CONFIG_KEY } from '@root/constants'
import { AppContext, UserConfig } from '@root/AppContext'
import { useStorage } from '@hooks/index'
import { LoadingWrapper } from '@components/index'
import UserThemeDefault from './themes/default'
import 'react-loading-skeleton/dist/skeleton.css'

const UserPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [userConfig] = useStorage<UserConfig | undefined>(
    USER_CONFIG_KEY,
    undefined,
  )
  const { user, onSetUser, onSetConfig } = React.useContext(AppContext)

  const [fetchUserData] = useUserDataLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: userRes => {
      if (userRes) {
        onSetUser(normalizeUserData(userRes, userConfig?.availableLinks || []))
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    if (!Object.keys(user).length) {
      if (userConfig?.userSlug) {
        onSetConfig(userConfig)
        fetchUserData({
          variables: {
            idOrSlug: userConfig.userSlug,
          },
        })
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [fetchUserData, onSetConfig, user, userConfig])

  if (loading) {
    return (
      <LoadingWrapper loading className="mh-100vh mw-100vw" isEmpty={false} />
    )
  }

  if (userConfig?.theme === IThemes.Default) {
    return <UserThemeDefault />
  }

  return <Navigate to={notFoundPath} replace />
}

export default UserPage
