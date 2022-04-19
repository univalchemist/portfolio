import React from 'react'

import {
  Client,
  Feature,
  Interest,
  Portfolio,
  Resume,
  User,
  Maybe,
  Education,
  Experience,
  Skill,
  SkillCategory,
  ExternalLink,
} from '@graphql/graphql'

export type Children =
  | React.ReactElement
  | React.ReactElement[]
  | React.ReactNode
  | null

export type KeyValue<T> = { [x: string]: T }

export type ProfileUser = Omit<User, 'createdBy'>
export type ProfileClient = Omit<Client, 'userId' | 'visible'>
export type ProfileFeature = Omit<Feature, 'userId'>
export type ProfileInterest = Interest
export type ProfilePortfolio = Omit<Portfolio, 'userId'>
export type ProfileResume = Omit<Resume, 'userId'>

export interface AdminUser {
  profile: User
  clients: Client[]
  features: Feature[]
  portfolios: Portfolio[]
  resume: Resume | undefined | null
}

export interface AppUser {
  profile: ProfileUser
  clients: ProfileClient[]
  features: ProfileFeature[]
  portfolios: ProfilePortfolio[]
  resume: ProfileResume | undefined | null
}

export interface MenuType {
  id: string | number
  text: string
  path: string
  icon: string
}

export interface SocialType {
  id: string | number
  icon: string
  path: string
  title: string
}

export interface ImageType {
  src: string
  alt?: string
}

export interface UserName {
  firstName: Maybe<string>
  middleName: Maybe<string>
  lastName: Maybe<string>
}

export interface ITab {
  id: string
  name: string
}

export enum IThemes {
  Default = 'd',
}

export interface IndexedDatum {
  [x: string]: any
  index: Maybe<number>
}

export type OnChangeImage = (f: File | null, index: number) => void

export type OnDragEnd = (sourceIndex: number, destinationIndex: number) => void

export type OnUserUpdated = (
  k: keyof AdminUser,
  v: User | Client[] | Feature[] | Portfolio[] | Resume | undefined | null,
) => void

export interface CVData {
  avatar: string
  userName: string
  profileUrl: any
  slogan: string | undefined | null
  title: string
  bio: string
  phone: string | undefined | null
  email: string
  address: string | undefined | null
  linkedin: string | undefined | null
  interests: string[] | undefined
  education: (Education & { duration: string })[] | undefined
  experience: (Experience & { duration: string })[] | undefined
  skills: { category: SkillCategory; data: Skill[] }[] | undefined
}

export interface IVisit {
  userSeen: string
  from: ExternalLink
  createdAt: string
}

export interface ISelectOption {
  label: string;
  value: string | number
}

export type IButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-dark' | 'outline-light' | string