import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TabContainer } from 'react-bootstrap'

import { LoadingOverlay } from '@components/index'
import {
  useAdminUserLazyQuery,
  User,
  Client,
  Feature,
  Portfolio,
  Resume,
} from '@graphql/graphql'
import { AdminUser, ITab } from '@root/types'
import { URL_PARAMS } from '@root/constants'
import {
  normalizeProfile,
  normalizePortfolio,
  normalizeResume,
  normalizeAdminUserData,
} from '@utils/index'

import UserTabs from './components/userTabs'
import UserTabContents from './components/userTabContents'

import './styles.scss'

const USER_TABS: ITab[] = [
  { id: 'profile', name: 'Profile' },
  { id: 'clients', name: 'Clients' },
  { id: 'features', name: 'Features' },
  { id: 'portfolios', name: 'Portfolios' },
  { id: 'resume', name: 'Resume' },
]

const UserPage: React.FC = () => {
  const params = useParams()
  const [user, setUser] = useState<AdminUser>({} as AdminUser)
  const [loading, setLoading] = useState<boolean>(false)

  const [fetchAdminUser, { loading: userLoading, data: userRes, refetch }] =
    useAdminUserLazyQuery({
      fetchPolicy: 'no-cache',
    })

  useEffect(() => {
    if (params.id) {
      fetchAdminUser({
        variables: {
          idOrSlug: params.id as string,
        },
      })
    }
  }, [fetchAdminUser, params])

  useEffect(() => {
    setUser(normalizeAdminUserData(userRes))
  }, [userRes])

  const onUserUpdated = useCallback(
    (
      k: keyof AdminUser,
      v: User | Client[] | Feature[] | Portfolio[] | Resume | undefined | null,
    ) => {
      if (!v) return
      if (k === 'profile') {
        // @ts-ignore
        setUser(u => ({ ...u, profile: normalizeProfile(v as User) }))
      } else if (k === 'clients') {
        // @ts-ignore
        setUser(u => ({ ...u, clients: v as Client[] }))
      } else if (k === 'features') {
        // @ts-ignore
        setUser(u => ({ ...u, features: v as Feature[] }))
      } else if (k === 'portfolios') {
        // @ts-ignore
        setUser(u => ({
          ...u,
          portfolios: normalizePortfolio(v as Portfolio[]),
        }))
      } else if (k === 'resume') {
        // @ts-ignore
        setUser(u => ({ ...u, resume: normalizeResume(v as Resume) }))
      }
    },
    [],
  )

  return (
    <LoadingOverlay loading={userLoading || loading}>
      <section className="rn-section-gap pb--110 align-items-center pt--75">
        <div className="container user-page">
          <div className="row">
            <div className="col-lg-12">
              <TabContainer defaultActiveKey={USER_TABS[0].id}>
                <div className="row">
                  <UserTabs tabs={USER_TABS} />
                  <UserTabContents
                    tabs={USER_TABS}
                    id={params.id}
                    user={user}
                    refetch={refetch}
                    onUserUpdated={onUserUpdated}
                    onLoading={setLoading}
                  />
                </div>
              </TabContainer>
            </div>
          </div>
        </div>
      </section>
    </LoadingOverlay>
  )
}

export default UserPage
