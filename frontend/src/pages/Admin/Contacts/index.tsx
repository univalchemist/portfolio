import React, { useCallback, useContext, useEffect, useState } from 'react'

import {
  Contact,
  Maybe,
  useAdminContactsQuery,
  useMakeContactSeenMutation,
  useDeleteContactMutation,
  useContactAddedSubscription,
} from '@graphql/graphql'
import { AppContext } from '@root/AppContext'
import { LoadingWrapper } from '@components/index'
import AdminSectionTitle from '@pages/Admin/components/adminSectionTitle'

import logo from '@assets/images/p.png'

import ContactItem from './components/contactItem'

import './styles.scss'

const ContactsPage: React.FC = () => {
  const { notifyMessage } = useContext(AppContext)

  const [contacts, setContacts] = useState<Contact[]>([])

  const { data, loading } = useAdminContactsQuery({
    fetchPolicy: 'no-cache',
  })

  const { data: subData } = useContactAddedSubscription()
  const [deleteContact] = useDeleteContactMutation()

  const [makeContactSeen] = useMakeContactSeenMutation()

  useEffect(() => {
    // @ts-ignore
    const _contacts: Contact[] = (data?.contacts.data || []).sort(c =>
      c.seen ? 1 : -1,
    )

    setContacts(_contacts)
  }, [data?.contacts.data])

  useEffect(() => {
    if (subData?.contactAdded) {
      setContacts(c => [...c, subData.contactAdded as Contact])
      const client = subData.contactAdded?.name
        ? `${subData.contactAdded.name} (${subData.contactAdded.email})`
        : subData.contactAdded.email

      const options = {
        body: subData.contactAdded.message || '',
        icon: logo,
      }

      const ref = subData.contactAdded.ref
        ? `${subData.contactAdded.ref}: `
        : ''
      if (client) {
        new Notification(`${ref}${client}`, options)
      }
    }
  }, [subData?.contactAdded])

  const onContactUpdated = useCallback(
    (id: string, data: Maybe<Contact>) => {
      const _contacts: Contact[] = []
      contacts.forEach((contact: Contact) => {
        if (contact.id === id) {
          if (data) {
            _contacts.push(data)
          }
        } else {
          _contacts.push(contact)
        }
      })
      setContacts(_contacts)
    },
    [contacts],
  )

  const onViewContact = useCallback(
    (id: string) => {
      if (id) {
        makeContactSeen({
          variables: {
            id,
          },
          onCompleted: res => {
            // @ts-ignore
            onContactUpdated(id, res?.makeContactSeen?.data)
          },
        })
      }
    },
    [makeContactSeen, onContactUpdated],
  )

  const onRemoveContact = useCallback(
    (id: string) => {
      if (id) {
        deleteContact({
          variables: {
            id,
          },
          onCompleted: res => {
            notifyMessage(
              res.deleteContact.status ? 'success' : 'error',
              res.deleteContact.message,
            )
            if (res?.deleteContact.status) {
              onContactUpdated(id, null)
            }
          },
        })
      }
    },
    [deleteContact, notifyMessage, onContactUpdated],
  )

  return (
    <section className="rn-section-gap pb--110 align-items-center pt--75">
      <div className="container contacts-page">
        <AdminSectionTitle title="Contacts" />
        <div className="row">
          <LoadingWrapper loading={loading} isEmpty={!contacts.length}>
            {contacts.map((_contact, index) => (
              <ContactItem
                key={index}
                data={_contact}
                onView={onViewContact}
                onDelete={onRemoveContact}
              />
            ))}
          </LoadingWrapper>
        </div>
      </div>
    </section>
  )
}

export default ContactsPage
