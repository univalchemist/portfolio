import React, { useCallback, useContext, useEffect, useState } from 'react'

import {
  AdminInput,
  InputMaybe,
  useAdminsQuery,
  useDeleteAdminMutation,
} from '@graphql/graphql'
import { AppContext } from '@root/AppContext'
import { LoadingWrapper } from '@components/index'
import AdminSectionTitle from '@pages/Admin/components/adminSectionTitle'

import CreateButton from './components/createButton'
import AdminItem from './components/adminItem'
import AdminModal from './components/adminModal'

import './styles.scss'

const AdminsPage: React.FC = () => {
  const { admin: currentAdmin, notifyMessage } = useContext(AppContext)

  const [admins, setAdmins] = useState<AdminInput[]>([])
  const [selectedAdmin, setSelectedAdmin] = useState<AdminInput | undefined>()
  const [showModal, setShowModal] = useState<boolean>(false)

  const { data, loading, refetch } = useAdminsQuery({
    fetchPolicy: 'no-cache',
  })
  const [deleteAdmin, { loading: deletingAdmin }] = useDeleteAdminMutation()

  useEffect(() => {
    const _admins: AdminInput[] = (data?.admins.data || [])
      .map(({ id, email, type }) => ({
        id,
        email,
        type,
        password: '',
      }))
      .sort(a => (a.email === currentAdmin?.email ? -1 : 1))

    setAdmins(_admins)
  }, [currentAdmin?.email, data?.admins.data])

  const onCloseModal = useCallback(() => {
    setShowModal(false)
    setSelectedAdmin(undefined)
  }, [])

  const onSelectAdmin = useCallback((a: AdminInput) => {
    setSelectedAdmin(a)
    setShowModal(true)
  }, [])

  const onRemoveAdmin = useCallback(
    (id: InputMaybe<string>) => {
      if (id) {
        deleteAdmin({
          variables: {
            id,
          },
          onCompleted: res => {
            notifyMessage(
              res.deleteAdmin.status ? 'success' : 'error',
              res.deleteAdmin.message,
            )
            if (res?.deleteAdmin.status) {
              refetch()
            }
          },
        })
      }
    },
    [deleteAdmin, notifyMessage, refetch],
  )

  return (
    <section className="rn-section-gap pb--110 align-items-center pt--75">
      <div className="container admins-page">
        <AdminSectionTitle title="Administrators" />
        <div className="row">
          <LoadingWrapper loading={loading} isEmpty={!admins.length}>
            {admins.map((_admin, index) => (
              <AdminItem
                key={index}
                data={_admin}
                deleting={deletingAdmin}
                onEdit={onSelectAdmin}
                onDelete={onRemoveAdmin}
              />
            ))}
          </LoadingWrapper>
          <CreateButton onClick={() => setShowModal(true)} />
        </div>
      </div>
      {showModal && (
        <AdminModal
          show
          data={selectedAdmin}
          onSave={refetch}
          onClose={onCloseModal}
        />
      )}
    </section>
  )
}

export default AdminsPage
