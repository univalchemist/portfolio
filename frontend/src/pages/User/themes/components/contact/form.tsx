import React, { useCallback, useContext } from 'react'
import { ArrowRight } from 'react-feather'
import classNames from 'classnames'

import { Button, Form, FormRow } from '@components/index'
import { Maybe, ExternalLink, useCreateContactMutation } from '@graphql/graphql'
import { AppContext } from '@root/AppContext'

interface Props {
  userId: Maybe<string>
  platform?: ExternalLink
  className?: string
}

interface ContactFormType {
  name: string
  email: string
  message: string
}

const ContactForm: React.FC<Props> = ({ userId, platform, className }) => {
  const { notifyMessage } = useContext(AppContext)

  const [sendContact, { loading }] = useCreateContactMutation()

  const onContact = useCallback(
    (data: ContactFormType, e: any) => {
      if (!userId) return
      sendContact({
        variables: {
          input: {
            userId,
            ref: platform || ExternalLink.Other,
            ...data,
          },
        },
        onCompleted: res => {
          notifyMessage(
            res.createContact.status ? 'success' : 'error',
            res.createContact.message,
          )
          if (res.createContact.status) {
            e.target.reset()
          }
        },
      })
    },
    [notifyMessage, platform, sendContact, userId],
  )

  return (
    <div className={classNames('contact-form-wrapper', className)}>
      <div className="introduce">
        <Form
          className="rnt-contact-form rwt-dynamic-form row"
          id="contact-form"
          onSubmit={onContact}
        >
          <FormRow
            className="col-lg-6"
            name="name"
            label="Your Name"
            required
          />
          <FormRow
            className="col-lg-6"
            name="email"
            label="Email"
            type="email"
            required
          />
          <FormRow
            className="col-lg-12"
            name="message"
            label="Your message"
            type="textarea"
            required
          />
          <div className="col-lg-12">
            <Button type="submit" disabled={loading}>
              <span>{loading ? 'SENDING MESSAGE' : 'SEND MESSAGE'}</span>
              <ArrowRight />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ContactForm
