/* eslint-disable no-unused-vars */
import React from 'react'
import { TabContent, TabPane } from 'react-bootstrap'

import { Maybe } from '@graphql/graphql'
import { ITab, AdminUser, OnUserUpdated } from '@root/types'

import ProfileSection from './profileSection'
import ClientsSection from './clientsSection'
import FeaturesSection from './featuresSection'
import PortfoliosSection from './portfoliosSection'
import ResumeSection from './resumeSection'

interface Props {
  tabs: ITab[]
  id: Maybe<string>
  user: AdminUser
  refetch: () => void
  onUserUpdated: OnUserUpdated
  onLoading: (loading: boolean) => void
}

const UserTabContents: React.FC<Props> = ({
  tabs,
  id,
  user,
  refetch,
  onUserUpdated,
  onLoading,
}) => {
  return (
    <div className="col-lg-9">
      <TabContent>
        {tabs.map((tab: ITab) => (
          <TabPane eventKey={tab.id} key={tab.id}>
            <div className="user-data-card">
              {tab.id === 'profile' && (
                <ProfileSection
                  id={id}
                  data={user.profile}
                  onUpdate={onUserUpdated}
                  onLoading={onLoading}
                />
              )}
              {tab.id === 'clients' && (
                <ClientsSection
                  userId={id}
                  data={user.clients}
                  onUpdate={onUserUpdated}
                  onLoading={onLoading}
                />
              )}
              {tab.id === 'features' && (
                <FeaturesSection
                  userId={id}
                  data={user.features}
                  onUpdate={onUserUpdated}
                  onLoading={onLoading}
                />
              )}
              {tab.id === 'portfolios' && (
                <PortfoliosSection
                  userId={id}
                  data={user.portfolios}
                  refetch={refetch}
                  onUpdate={onUserUpdated}
                  onLoading={onLoading}
                />
              )}
              {tab.id === 'resume' && (
                <ResumeSection
                  userId={id}
                  data={user.resume}
                  refetch={refetch}
                  onUpdate={onUserUpdated}
                  onLoading={onLoading}
                />
              )}
            </div>
          </TabPane>
        ))}
      </TabContent>
    </div>
  )
}

export default UserTabContents
