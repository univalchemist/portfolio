/* eslint-disable no-unused-vars */
import React from 'react'

import {
  AppUser,
  ProfileClient,
  ProfilePortfolio,
  ProfileFeature,
} from '@root/types'
import { useUserDataLazyQuery } from '@graphql/graphql'
import { normalizePortfolio, normalizeResume } from '@utils/index'

export const useUserData = (onSetUser: (d: Partial<AppUser>) => void) => {
  const [fetchUserData, { data: userData }] = useUserDataLazyQuery()

  React.useEffect(() => {
    if (userData) {
      const clients = userData?.clients?.data || ([] as ProfileClient[])
      const features = userData?.features?.data || ([] as ProfileFeature[])
      const portfolios = normalizePortfolio(
        userData?.portfolios?.data || ([] as ProfilePortfolio[]),
      )
      const resume = normalizeResume(userData?.resume?.data)

      onSetUser({ clients, features, portfolios, resume })
    }
  }, [onSetUser, userData])

  const _fetchUserData = React.useCallback(
    (idOrSlug: string) => {
      fetchUserData({
        variables: {
          idOrSlug,
        },
      })
    },
    [fetchUserData],
  )

  return { fetchUserData: _fetchUserData }
}
