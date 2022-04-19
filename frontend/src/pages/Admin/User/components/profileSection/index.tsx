/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Button, Form, FormRow, SectionSeparator } from '@components/index'
import {
  Maybe,
  User,
  UserLink,
  ExternalLink,
  useUpdateUserMutation,
  useCreateUserMutation,
  Image,
  Uploads,
} from '@graphql/graphql'
import { AppContext } from '@root/AppContext'
import { AVAILABILITY_TEXT } from '@root/constants'
import { OnUserUpdated, KeyValue } from '@root/types'
import { fullName } from '@utils/index'

import UserAvatar from './userAvatar'
import UserLinks from './userLinks'
import UserImages from './userImages'

const slugify = require('slug')

interface Props {
  id: Maybe<string>
  data: Maybe<User>
  onUpdate: OnUserUpdated
  onLoading: (loading: boolean) => void
}

interface FormType {
  slug: string
  firstName: string
  middleName?: string
  lastName: string
  email: string
  phone?: string
  address?: string
  title: string
  slogan?: string
  availability?: string
  bio: string
  links: UserLink[]
  active: boolean
}

const ProfileSection: React.FC<Props> = ({ id, data, onUpdate, onLoading }) => {
  const { notifyMessage } = useContext(AppContext)
  const [userLinks, setUserLinks] = useState<UserLink[]>([])
  const [errors, setErrors] = useState({})
  const [userSlug, setUserSlug] = useState<string>('')
  const [userFirstName, setUserFirstName] = useState<string>('')
  const [userMiddleName, setUserMiddleName] = useState<string>('')
  const [userLastName, setUserLastName] = useState<string>(data?.lastName || '')
  const [avatar, setAvar] = useState<Uploads | null>(null)
  const [defaultImages, setDefaultImages] = useState<Image[]>([])
  const [images, setImages] = useState<Uploads[]>([])

  const [updateProfile, { loading: updating }] = useUpdateUserMutation()
  const [createProfile, { loading: creating }] = useCreateUserMutation()

  useEffect(() => {
    onLoading(updating || creating)
  }, [updating, creating, onLoading])

  useEffect(() => {
    setUserSlug(data?.slug || '')
    setUserFirstName(data?.firstName || '')
    setUserMiddleName(data?.middleName || '')
    setUserLastName(data?.lastName || '')
  }, [data?.firstName, data?.lastName, data?.middleName, data?.slug])

  useEffect(() => {
    const _links = data?.links || []
    if (!_links?.length) {
      _links.push({
        index: 0,
        name: ExternalLink.Github,
        url: '',
        visible: true,
      })
    }
    setUserLinks(_links)
  }, [data?.links])

  useEffect(() => {
    setDefaultImages(data?.backgroundImages || [])
  }, [data?.backgroundImages])

  const onFormChange = useCallback(
    (name: string, value: string) => {
      let _slug = ''
      if (name === 'slug') {
        setUserSlug(value)
      } else if (name === 'firstName') {
        setUserFirstName(value)
        const str = fullName({
          firstName: value,
          middleName: userMiddleName,
          lastName: userLastName,
        })
        _slug = slugify(str)
      } else if (name === 'middleName') {
        setUserMiddleName(value)
        const str = fullName({
          firstName: userFirstName,
          middleName: value,
          lastName: userLastName,
        })
        _slug = slugify(str)
      } else if (name === 'lastName') {
        setUserLastName(value)
        const str = fullName({
          firstName: userFirstName,
          middleName: userMiddleName,
          lastName: value,
        })
        _slug = slugify(str)
      }
      if (_slug) setUserSlug(_slug)
    },
    [userFirstName, userLastName, userMiddleName],
  )

  const validateLinks = useCallback(() => {
    const _errors: KeyValue<string> = {}
    let valid = true

    userLinks.forEach((link: UserLink) => {
      if (!link.url) {
        _errors[`link_url_${link.index}`] = 'URL is required'
        valid = false
      } else {
        const validUrl = /^(http|https):\/\/[^ "]+$/.test(link.url)
        if (!validUrl) {
          _errors[`link_url_${link.index}`] = 'URL is invalid'
          valid = false
        } else {
          _errors[`link_url_${link.index}`] = ''
        }
      }
    })
    setErrors(_errors)

    return valid
  }, [userLinks])

  const onAddNewLink = useCallback(() => {
    const lastLink = userLinks.sort((a, b) => (a.index > b.index ? -1 : 1))[0]
    setUserLinks(l => [
      ...l,
      {
        index: lastLink.index + 1,
        name: ExternalLink.Github,
        url: '',
        visible: true,
      },
    ])
  }, [userLinks])

  const onRemoveLink = useCallback((index: number) => {
    setUserLinks(l => l.filter(_l => _l.index !== index))
  }, [])

  const onChangeImages = useCallback((df: Image[], nf: Uploads[]) => {
    setDefaultImages(df)
    setImages(nf)
  }, [])

  const onSubmit = useCallback(
    (data: FormType) => {
      if (!validateLinks()) {
        return
      }
      const onRes = (res: any, key: string) => {
        notifyMessage(res[key].status ? 'success' : 'error', res[key].message)
        if (res[key].status) {
          onUpdate('profile', res[key].data)
        }
      }

      if (id) {
        updateProfile({
          variables: {
            id,
            input: {
              ...data,
              slug: userSlug,
              links: userLinks,
              backgroundImages: defaultImages,
            },
            avatar,
            backgroundImages: images,
          },
          onCompleted: res => onRes(res, 'updateUser'),
        })
      } else {
        createProfile({
          variables: {
            input: {
              ...data,
              slug: userSlug,
              links: userLinks,
              backgroundImages: defaultImages,
            },
            avatar,
            backgroundImages: images,
          },
          onCompleted: res => onRes(res, 'createUser'),
        })
      }
    },
    [
      avatar,
      createProfile,
      defaultImages,
      id,
      userSlug,
      images,
      notifyMessage,
      onUpdate,
      updateProfile,
      userLinks,
      validateLinks,
    ],
  )

  if (id && !Object.keys(data || {}).length) return null

  return (
    <div className="form-wrapper form-dark">
      <UserAvatar
        defaultAvatar={data?.avatar}
        avatar={avatar}
        onChange={(f: Uploads | null) => setAvar(f)}
      />
      <Form
        className="rnt-profile-form rwt-dynamic-form row"
        id="profile-form"
        defaultValues={{
          slug: data?.slug || '',
          firstName: data?.firstName || '',
          middleName: data?.middleName || '',
          lastName: data?.lastName || '',
          email: data?.email || '',
          phone: data?.phone || '',
          address: data?.address || '',
          title: data?.title || '',
          slogan: data?.slogan || '',
          availability: data?.availability || '',
          bio: data?.bio || '',
          active: data?.active === undefined ? true : data?.active,
        }}
        onSubmit={onSubmit}
        onChange={onFormChange}
      >
        <FormRow
          className="col-lg-4 col-md-6"
          value={userFirstName}
          name="firstName"
          label="First name"
          required
        />
        <FormRow
          className="col-lg-4 col-md-6"
          value={userMiddleName}
          name="middleName"
          label="Middle name"
          required={false}
        />
        <FormRow
          className="col-lg-4 col-md-6"
          value={userLastName}
          name="lastName"
          label="Last name"
          required
        />
        <FormRow
          className="col-md-6"
          name="email"
          label="Email"
          type="email"
          required
        />
        <FormRow
          className="col-md-6"
          name="phone"
          label="Phone"
          required={false}
        />
        <FormRow
          className="col-12"
          name="title"
          label="Title"
          type="textarea"
          rows={2}
          required
        />
        <FormRow
          className="col-12"
          name="availability"
          label="Availability"
          type="textarea"
          placeholder={AVAILABILITY_TEXT}
          required={false}
          rows={2}
        />
        <FormRow
          className="col-12"
          name="slogan"
          label="Slogan"
          type="textarea"
          rows={2}
          required={false}
        />
        <FormRow
          className="col-12"
          name="bio"
          label="Bio"
          rows={7}
          type="textarea"
          required
        />
        <FormRow
          className="col-12"
          name="address"
          label="Address"
          required={false}
        />
        <FormRow
          className="col-12"
          value={userSlug}
          name="slug"
          label="Slug"
          required
        />
        <FormRow
          className="col-md-4"
          name="active"
          label="Active"
          type="checkbox"
          required={false}
        />
        <SectionSeparator title="External links" />
        <UserLinks
          links={userLinks.sort((a, b) => (a.index > b.index ? 1 : -1))}
          onChange={setUserLinks}
          errors={errors}
          onAdd={onAddNewLink}
          onRemove={onRemoveLink}
        />
        <SectionSeparator title="Background images" />
        <UserImages
          defaultImages={defaultImages}
          images={images}
          onChange={onChangeImages}
        />
        <div className="col-lg-12 mt-5 d-flex justify-content-end">
          <Button type="submit" disabled={updating || creating}>
            <span>{updating || creating ? 'Saving' : 'Save'}</span>
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ProfileSection
