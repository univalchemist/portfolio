import React, { useCallback, useContext } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom'

import { AdminType, useAdminUsersQuery } from '@graphql/graphql'
import { AppContext } from '@root/AppContext'
import { LoadingWrapper } from '@components/index'
import AdminSectionTitle from '@pages/Admin/components/adminSectionTitle'

import UserList from './components/userList'
import CreateButton from './components/createButton'

import './styles.scss'

const AdminUsersPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const { admin } = useContext(AppContext)

  const { data, loading, refetch } = useAdminUsersQuery({
    fetchPolicy: 'no-cache',
    variables:
      admin?.type === AdminType.SuperAdmin
        ? {}
        : { createdBy: admin?.id || '' },
  })

  const onCreateUpdateUser = useCallback(
    (id?: string) => {
      if (id) {
        navigate(`${id}/edit`)
      } else {
        navigate(`create`)
      }
    },
    [navigate],
  )

  return (
    <section className="rn-section-gap pb--110 align-items-center pt--75">
      <div className="container users-page">
        <AdminSectionTitle title="Users" />
        <div className="row">
          <div className="col-lg-12 overflow-auto">
            <LoadingWrapper
              loading={loading}
              isEmpty={!data?.users.data?.length}
            >
              <UserList
                users={data?.users.data || []}
                onRowClick={onCreateUpdateUser}
                refetch={refetch}
              />
            </LoadingWrapper>
            <CreateButton onClick={onCreateUpdateUser} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminUsersPage
