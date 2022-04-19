import React, { useCallback, useContext, useEffect, useState } from 'react'

import { LoadingWrapper, DateRangePicker } from '@components/index'
import AdminSectionTitle from '@pages/Admin/components/adminSectionTitle'
import {
  VisitLineChart,
  VisitPieChart,
} from '@pages/Admin/components/visitChart'
import { getInitialDateRange } from '@pages/Admin/components/visitChart/utils'
import {
  useVisitsLazyQuery,
  useAdminsLazyQuery,
  useVisitFilterUserDataLazyQuery,
  VisitsQueryVariables,
  Visit,
  Admin,
  User,
  AdminType,
} from '@graphql/graphql'
import { ISelectOption } from '@root/types'
import { AppContext } from '@root/AppContext'
import { localToUTCTime } from '@utils/index'

import AdminSelector from './components/adminSelector'
import UserSelector from './components/userSelector'
import VisitsTable from './components/visitsTable'

import './styles.scss'

const VisitsPage: React.FC = () => {
  const { admin: currentAdmin } = useContext(AppContext)

  const [selectedAdmin, setSelectedAdmin] = useState<ISelectOption | undefined>(
    currentAdmin
      ? {
          label: currentAdmin.email,
          value: currentAdmin.id,
        }
      : undefined,
  )
  const [selectedUser, setSelectedUser] = useState<ISelectOption | undefined>()
  const [dateRange, setDateRange] = useState<[string, string]>(
    getInitialDateRange(true),
  )
  const [admins, setAdmins] = useState<Admin[]>([])
  const [users, setUsers] = useState<Partial<User>[]>([])
  const [visits, setVisits] = useState<Visit[]>([])

  const [fetchAdmins] = useAdminsLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: res => {
      setAdmins((res.admins?.data || []).filter(a => a.id !== currentAdmin?.id))
      console.log({ adminRes: res })
    },
  })

  const [fetchUsers] = useVisitFilterUserDataLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: res => {
      setUsers(res.users?.data || [])
      console.log({ usersRes: res })
    },
  })

  const [fetchVisits, { loading: visitsLoading, refetch: refetchVisits }] =
    useVisitsLazyQuery({
      fetchPolicy: 'no-cache',
      onCompleted: res => {
        setVisits(res.visits?.data || [])
        console.log({ visitsRes: res })
      },
    })

  useEffect(() => {
    if (!selectedAdmin) return

    let variables: VisitsQueryVariables = {
      dateRange: dateRange.length
        ? [localToUTCTime(dateRange[0]), localToUTCTime(dateRange[1])]
        : getInitialDateRange(),
    }
    if (selectedAdmin.value) {
      variables = { ...variables, createdBy: selectedAdmin.value as string }
    }
    if (selectedUser?.value) {
      variables = { ...variables, userId: selectedUser.value as string }
    }
    fetchVisits({
      variables,
    })
  }, [dateRange, fetchVisits, selectedAdmin, selectedUser])

  useEffect(() => {
    if (currentAdmin?.type === AdminType.SuperAdmin) {
      fetchAdmins()
    }
  }, [currentAdmin?.type, fetchAdmins])

  useEffect(() => {
    if (selectedAdmin) {
      fetchUsers({
        variables: {
          createdBy: selectedAdmin.value as string,
        },
      })
    }
  }, [fetchUsers, selectedAdmin])

  const onSelectAdmin = useCallback(id => {
    setSelectedUser(undefined)
    setSelectedAdmin(id)
  }, [])

  return (
    <section className="rn-section-gap pb--110 align-items-center pt--75">
      <div className="container visits-page">
        <AdminSectionTitle title="Visits" />
        <div className="row">
          <div className="col-lg-12">
            <LoadingWrapper loading={visitsLoading} isEmpty={false}>
              <div className="row">
                <div className="col-12 d-flex flex-column flex-md-row align-items-center justify-content-center">
                  <div className="flex-1" />
                  <AdminSelector
                    selected={selectedAdmin}
                    data={admins}
                    onSelect={onSelectAdmin}
                  />
                  <UserSelector
                    selected={selectedUser}
                    data={users}
                    onSelect={setSelectedUser}
                  />
                  <DateRangePicker
                    className="mb-3 mx-3"
                    selected={dateRange}
                    onSelect={setDateRange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex flex-column flex-md-row align-items-center mt-4 charts-container">
                    <div className="visit-chart-container">
                      <VisitLineChart data={visits} />
                    </div>
                    <div className="visit-platform-chart-container">
                      <VisitPieChart data={visits} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <VisitsTable data={visits} onDeleted={refetchVisits} />
              </div>
            </LoadingWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisitsPage
