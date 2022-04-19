import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, NavigateFunction } from 'react-router-dom'

import {
  useUserDataLazyQuery,
  useCreateVisitMutation,
  ExternalLink,
} from '@graphql/graphql'
import { AppContext, UserConfig } from '@root/AppContext'
import { USER_CONFIG_KEY, URL_PARAMS } from '@root/constants'
import {
  getIdNLinks,
  getThemeNPlatform,
  normalizeUserData,
  notFoundPath,
} from '@utils/index'
import { LoadingWrapper } from '@components/index'
import { useStorage } from '@hooks/index'
import 'react-loading-skeleton/dist/skeleton.css'

const UserInitialPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const [userConfig] = useStorage<UserConfig | undefined>(
    USER_CONFIG_KEY,
    undefined,
  )
  const { onSetUser, onSetConfig } = useContext(AppContext)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const params = useParams()

  const [fetchUserData] = useUserDataLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: userRes => {
      if (userRes) {
        setUserId(userRes.profile?.data?.id || '')
        onSetUser(normalizeUserData(userRes, links))
        setLoaded(true)
      }
    },
  })

  const [recordVisit] = useCreateVisitMutation()

  const { userSlug, links, platform, theme, contactable, profileUrl } =
    useMemo(() => {
      const {
        userSlug: __userSlug,
        profileUrl: __profileUrl,
        availableLinks: __availableLinks,
        platform: __platform,
        contactable: contactable,
      } = userConfig || {}

      const { userSlug: _userSlug, links: _links } = getIdNLinks(
        params[URL_PARAMS.SLUG] || '',
      )
      const {
        platform: _platform,
        theme: _theme,
        contactable: _contactable,
      } = getThemeNPlatform(params.config || '')

      return {
        userSlug: _userSlug || __userSlug,
        links: _links || __availableLinks,
        platform: _platform || __platform,
        theme: _theme,
        contactable: _contactable || contactable,
        profileUrl: params.config
          ? window.location.href
          : __profileUrl || window.location.href,
      }
    }, [params, userConfig])

  useEffect(() => {
    onSetConfig({
      userSlug,
      profileUrl,
      availableLinks: links,
      platform,
      contactable,
      theme,
    })
  }, [contactable, links, onSetConfig, platform, profileUrl, theme, userSlug])

  useEffect(() => {
    if (userSlug) {
      setLoaded(false)
      fetchUserData({
        variables: {
          idOrSlug: userSlug,
        },
      })
    }
  }, [fetchUserData, userSlug])

  useEffect(() => {
    if (userId) {
      recordVisit({
        variables: {
          input: {
            from: platform || ExternalLink.Other,
            userAgent: navigator.userAgent,
            userId,
          },
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordVisit, userId])

  useEffect(() => {
    if (!loaded) return
    if (params) {
      navigate(`/`)
    } else {
      navigate(notFoundPath)
    }
  }, [navigate, loaded, params, theme])

  return (
    <LoadingWrapper loading className="mh-100vh mw-100vw" isEmpty={false} />
  )
}

export default UserInitialPage
