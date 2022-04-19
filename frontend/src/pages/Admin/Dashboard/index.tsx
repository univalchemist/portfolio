import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom'

import { useDashboardDataQuery, AdminType } from '@graphql/graphql'
import { LoadingWrapper } from '@components/index'
import AdminSectionTitle from '@pages/Admin/components/adminSectionTitle'
import {
  VisitLineChart,
  VisitPieChart,
} from '@pages/Admin/components/visitChart'
import { getInitialDateRange } from '@pages/Admin/components/visitChart/utils'
import {
  adminsPath,
  adminUsersPath,
  contactsPath,
  visitsPath,
} from '@utils/index'
import { AppContext } from '@root/AppContext'
import { IVisit } from '@root/types'
import { ADMIN_PREFIX } from '@root/constants'

import Item from './components/item'

import './styles.scss'

const AdminDashboardPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const [admins, setAdmins] = useState<number>(0)
  const [myUsers, setMyUsers] = useState<number>(0)
  const [allUsers, setAllUsers] = useState<number>(0)
  const [contacts, setContacts] = useState<number>(0)
  const [visits, setVisits] = useState<IVisit[]>([])

  const { admin } = useContext(AppContext)

  const { data, loading } = useDashboardDataQuery({
    fetchPolicy: 'no-cache',
    variables: {
      currentAdmin: admin?.id || '',
      dateRange: getInitialDateRange(),
    },
  })

  useEffect(() => {
    if (data) {
      setAdmins(
        (data.admins?.data || []).filter(a => a.id !== admin?.id).length,
      )
      setMyUsers(
        (data.users?.data || []).filter(d => d.createdBy === admin?.email)
          .length,
      )
      setAllUsers(data.users?.data?.length || 0)
      setContacts(data.contacts?.data?.length || 0)
      setVisits(data.visits?.data || [])
    }
  }, [admin?.email, admin?.id, data])

  const onItemClick = useCallback(
    path => {
      navigate(`/${ADMIN_PREFIX}/${path}`, { replace: true })
    },
    [navigate],
  )

  return (
    <section className="rn-section-gap pb--110 align-items-center pt--75">
      <div className="container dashboard-page">
        <AdminSectionTitle title="Dashboard" />
        <div className="row">
          <div className="col-lg-12">
            <LoadingWrapper loading={loading} isEmpty={false}>
              <div className="d-flex flex-column flex-md-row items-container">
                <Item
                  title="Admins"
                  text={admins}
                  onClick={() => onItemClick(adminsPath)}
                />
                <Item
                  title="Users"
                  text={
                    admin?.type === AdminType.SuperAdmin
                      ? `${myUsers} / ${allUsers}`
                      : myUsers
                  }
                  onClick={() => onItemClick(adminUsersPath)}
                />
                <Item
                  title="New contacts"
                  text={contacts}
                  onClick={() => onItemClick(contactsPath)}
                />
              </div>
              <div
                className="px-4 visit-title"
                onClick={() => onItemClick(visitsPath)}
              >
                Visits
              </div>
              <div className="d-flex flex-column flex-md-row align-items-center mt-4 charts-container">
                <div className="visit-chart-container">
                  <VisitLineChart data={visits} />
                </div>
                <div className="visit-platform-chart-container">
                  <VisitPieChart data={visits} />
                </div>
              </div>
            </LoadingWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboardPage
