/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { Image } from 'react-bootstrap'
import { Check } from 'react-feather'

import {
  User,
  useDuplicateUserMutation,
  useDeleteUserMutation,
} from '@graphql/graphql'
import { fullName } from '@utils/index'
import { ConfirmButton } from '@components/index'
import SharableLinkModal from '../sharableLinkModal'

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import './styles.scss'

interface Props {
  users: Omit<
    User,
    'slogan' | 'bio' | 'availability' | 'backgroundImages' | 'links'
  >[]
  onRowClick: (id: string) => void
  refetch: () => void
}

const UserList: React.FC<Props> = ({ users, onRowClick, refetch }) => {
  const [userSlug, setUserSlug] = useState<string | undefined>()
  const [showModal, setShowModal] = useState<boolean>(false)

  const [duplicateUser, { loading: duplicatingUser }] =
    useDuplicateUserMutation()

  const [deleteUser, { loading: deletingUser }] = useDeleteUserMutation()

  const onDuplicateUser = useCallback(
    (id: string) => {
      duplicateUser({
        variables: {
          id,
        },
        onCompleted: res => {
          if (res?.duplicateUser.status) {
            refetch()
          }
        },
      })
    },
    [duplicateUser, refetch],
  )

  const onDeleteUser = useCallback(
    (id: string) => {
      deleteUser({
        variables: {
          id,
        },
        onCompleted: res => {
          if (res?.deleteUser.status) {
            refetch()
          }
        },
      })
    },
    [deleteUser, refetch],
  )

  const onOpenModal = useCallback((slug: string) => {
    setUserSlug(slug)
    setShowModal(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setShowModal(false)
    setUserSlug(undefined)
  }, [])

  return (
    <Table className="users-table">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Phone</Th>
          <Th>Title</Th>
          <Th>Created By</Th>
          <Th>Active</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map(
          ({
            id,
            slug,
            firstName,
            middleName,
            lastName,
            avatar,
            email,
            phone,
            title,
            createdBy,
            active,
          }) => (
            <Tr key={id} onClick={() => onRowClick(id)}>
              <Td>
                <div className="user-name-row">
                  {avatar ? (
                    <Image
                      src={avatar.url}
                      className="user-avatar"
                      alt={firstName}
                      roundedCircle
                    />
                  ) : (
                    <div className="user-avatar" />
                  )}
                  <div className="user-name pl-4">
                    {fullName({ firstName, middleName, lastName })}
                  </div>
                </div>
              </Td>
              <Td>{email}</Td>
              <Td>{phone}</Td>
              <Td>{title}</Td>
              <Td>{createdBy}</Td>
              <Td>{active ? <Check color="#3eb75e" /> : null}</Td>
              <Td>
                <div className="action-buttons">
                  <ConfirmButton
                    className="user-action-button"
                    iconClassName="action-icon"
                    iconName="link"
                    iconSize={14}
                    variant="secondary"
                    wait={false}
                    onClick={() => onOpenModal(slug)}
                  />
                  <ConfirmButton
                    className="user-action-button"
                    iconClassName="action-icon"
                    iconName="copy"
                    iconSize={14}
                    variant="primary"
                    loading={duplicatingUser}
                    onClick={() => onDuplicateUser(id)}
                  />
                  <ConfirmButton
                    className="user-action-button"
                    iconClassName="action-icon"
                    iconName="trash-2"
                    iconSize={14}
                    variant="danger"
                    loading={deletingUser}
                    onClick={() => onDeleteUser(id)}
                  />
                </div>
              </Td>
            </Tr>
          ),
        )}
      </Tbody>
      {showModal && (
        <SharableLinkModal show slug={userSlug} onClose={onCloseModal} />
      )}
    </Table>
  )
}

export default UserList
