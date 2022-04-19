/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null | undefined
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export interface Admin {
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  id: Scalars['ID']
  tgChatId?: Maybe<Scalars['String']>
  type?: Maybe<AdminType>
  updatedAt: Scalars['DateTime']
}

export interface AdminInput {
  email?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
  type?: InputMaybe<AdminType>
}

export interface AdminResponse {
  data?: Maybe<Admin>
  message: Scalars['String']
  status: Scalars['Boolean']
}

export enum AdminType {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
}

export interface AdminsResponse {
  data: Admin[]
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface Client {
  clientInfo?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  feedback?: Maybe<Scalars['String']>
  id: Scalars['ID']
  index: Scalars['Float']
  logo?: Maybe<Image>
  name: Scalars['String']
  updatedAt: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
  userId: Scalars['String']
  visible: Scalars['Boolean']
}

export interface ClientInput {
  clientInfo?: InputMaybe<Scalars['String']>
  feedback?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  index?: InputMaybe<Scalars['Float']>
  logo?: InputMaybe<ImageInput>
  name: Scalars['String']
  newLogo?: InputMaybe<Uploads>
  url?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
  visible?: InputMaybe<Scalars['Boolean']>
}

export interface ClientResponse {
  data?: Maybe<Client>
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface ClientsResponse {
  data: Client[]
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface Config {
  dropBoxToken: Scalars['String']
  telegramToken?: Maybe<Scalars['String']>
}

export interface ConfigInput {
  dropBoxToken: Scalars['String']
  telegramToken?: InputMaybe<Scalars['String']>
}

export interface Contact {
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  id: Scalars['ID']
  message?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  ref?: Maybe<ExternalLink>
  seen: Scalars['Boolean']
  updatedAt: Scalars['DateTime']
  user?: Maybe<User>
  userId: Scalars['String']
}

export interface ContactInput {
  email: Scalars['String']
  message?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  ref?: InputMaybe<ExternalLink>
  userId: Scalars['String']
}

export interface ContactResponse {
  data?: Maybe<Contact>
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface ContactsResponse {
  data: Contact[]
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface Education {
  at: Scalars['String']
  degree?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  endedAt?: Maybe<Scalars['String']>
  index: Scalars['Float']
  startedFrom: Scalars['String']
  title?: Maybe<Scalars['String']>
  visible: Scalars['Boolean']
}

export interface EducationInput {
  at: Scalars['String']
  degree?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  endedAt?: InputMaybe<Scalars['String']>
  index: Scalars['Float']
  startedFrom: Scalars['String']
  title?: InputMaybe<Scalars['String']>
  visible?: InputMaybe<Scalars['Boolean']>
}

export interface Experience {
  at: Scalars['String']
  description?: Maybe<Scalars['String']>
  endedAt?: Maybe<Scalars['String']>
  index: Scalars['Float']
  startedFrom: Scalars['String']
  title?: Maybe<Scalars['String']>
  visible: Scalars['Boolean']
}

export interface ExperienceInput {
  at: Scalars['String']
  description?: InputMaybe<Scalars['String']>
  endedAt?: InputMaybe<Scalars['String']>
  index: Scalars['Float']
  startedFrom: Scalars['String']
  title?: InputMaybe<Scalars['String']>
  visible?: InputMaybe<Scalars['Boolean']>
}

export enum ExternalLink {
  Angel = 'Angel',
  Facebook = 'Facebook',
  Fiverr = 'Fiverr',
  Freelancer = 'Freelancer',
  Github = 'Github',
  Gun = 'Gun',
  Guru = 'Guru',
  Indeed = 'Indeed',
  LinkedIn = 'LinkedIn',
  Other = 'Other',
  PeoplePerHour = 'PeoplePerHour',
  TopCoder = 'TopCoder',
  Twitter = 'Twitter',
  Upwork = 'Upwork',
}

export interface Feature {
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  id: Scalars['ID']
  index: Scalars['Float']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
  userId: Scalars['String']
}

export interface FeatureInput {
  description?: InputMaybe<Scalars['String']>
  icon?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  index?: InputMaybe<Scalars['Float']>
  title: Scalars['String']
  userId?: InputMaybe<Scalars['String']>
}

export interface FeatureResponse {
  data?: Maybe<Feature>
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface FeaturesResponse {
  data: Feature[]
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface Image {
  id: Scalars['String']
  index?: Maybe<Scalars['Float']>
  path: Scalars['String']
  url: Scalars['String']
}

export interface ImageInput {
  id: Scalars['String']
  index?: InputMaybe<Scalars['Float']>
  path: Scalars['String']
  url: Scalars['String']
}

export interface Interest {
  description?: Maybe<Scalars['String']>
  index: Scalars['Float']
  title: Scalars['String']
}

export interface InterestInput {
  description?: InputMaybe<Scalars['String']>
  index: Scalars['Float']
  title: Scalars['String']
}

export interface Mutation {
  createAdmin: AdminResponse
  createClient: ClientResponse
  createContact: ContactResponse
  createFeature: FeatureResponse
  createPortfolio: PortfolioResponse
  createResume: ResumeResponse
  createSetting: SettingResponse
  createUser: UserResponse
  createVisit: VisitResponse
  deleteAdmin: AdminResponse
  deleteClient: ClientResponse
  deleteContact: ContactResponse
  deleteFeature: FeatureResponse
  /** Delete users who does not belong to any admin. */
  deleteFreeUsers: UserResponse
  deletePortfolio: PortfolioResponse
  deleteResume: ResumeResponse
  deleteSetting: SettingResponse
  deleteUser: UserResponse
  /** Delete users who does not belong to any admin. */
  deleteVisits: VisitResponse
  duplicateUser: UserResponse
  increasePortfolioLikes: PortfolioResponse
  increasePortfolioViews: PortfolioResponse
  makeContactSeen: ContactResponse
  setTGChatId: AdminResponse
  signIn: SignInResponse
  updateAdmin: AdminResponse
  updateAvatar: UserResponse
  updateClient: ClientResponse
  updateContact: ContactResponse
  updateFeature: FeatureResponse
  updatePortfolio: PortfolioResponse
  updateResume: ResumeResponse
  updateSetting: SettingResponse
  updateUser: UserResponse
  upsertAdmin: AdminResponse
  upsertClients: ClientsResponse
  upsertFeatures: FeaturesResponse
  upsertPortfolios: PortfoliosResponse
  upsertResume: ResumeResponse
  upsertSetting: SettingResponse
}

export interface MutationCreateAdminArgs {
  input: AdminInput
}

export interface MutationCreateClientArgs {
  input: ClientInput
}

export interface MutationCreateContactArgs {
  input: ContactInput
}

export interface MutationCreateFeatureArgs {
  input: FeatureInput
}

export interface MutationCreatePortfolioArgs {
  input: PortfolioInput
}

export interface MutationCreateResumeArgs {
  input: ResumeInput
}

export interface MutationCreateSettingArgs {
  input: SettingInput
}

export interface MutationCreateUserArgs {
  avatar?: InputMaybe<Uploads>
  backgroundImages?: InputMaybe<Uploads[]>
  input: UserInput
}

export interface MutationCreateVisitArgs {
  input: VisitInput
}

export interface MutationDeleteAdminArgs {
  id: Scalars['String']
}

export interface MutationDeleteClientArgs {
  id: Scalars['String']
}

export interface MutationDeleteContactArgs {
  id: Scalars['String']
}

export interface MutationDeleteFeatureArgs {
  id: Scalars['String']
}

export interface MutationDeletePortfolioArgs {
  id: Scalars['String']
}

export interface MutationDeleteResumeArgs {
  id: Scalars['String']
}

export interface MutationDeleteSettingArgs {
  id: Scalars['String']
}

export interface MutationDeleteUserArgs {
  id: Scalars['String']
}

export interface MutationDeleteVisitsArgs {
  ids?: InputMaybe<Scalars['String'][]>
}

export interface MutationDuplicateUserArgs {
  id: Scalars['String']
}

export interface MutationIncreasePortfolioLikesArgs {
  id: Scalars['String']
}

export interface MutationIncreasePortfolioViewsArgs {
  id: Scalars['String']
}

export interface MutationMakeContactSeenArgs {
  id: Scalars['String']
}

export interface MutationSetTgChatIdArgs {
  chatId?: InputMaybe<Scalars['String']>
  id: Scalars['String']
}

export interface MutationSignInArgs {
  accessToken?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
}

export interface MutationUpdateAdminArgs {
  id: Scalars['String']
  input: AdminInput
}

export interface MutationUpdateAvatarArgs {
  avatar: Uploads
  id: Scalars['String']
}

export interface MutationUpdateClientArgs {
  id: Scalars['String']
  input: ClientInput
}

export interface MutationUpdateContactArgs {
  id: Scalars['String']
  input: ContactInput
}

export interface MutationUpdateFeatureArgs {
  id: Scalars['String']
  input: FeatureInput
}

export interface MutationUpdatePortfolioArgs {
  id: Scalars['String']
  input: PortfolioInput
}

export interface MutationUpdateResumeArgs {
  id: Scalars['String']
  input: ResumeInput
}

export interface MutationUpdateSettingArgs {
  id: Scalars['String']
  input: SettingInput
}

export interface MutationUpdateUserArgs {
  avatar?: InputMaybe<Uploads>
  backgroundImages?: InputMaybe<Uploads[]>
  id: Scalars['String']
  input: UserInput
}

export interface MutationUpsertAdminArgs {
  input: AdminInput
}

export interface MutationUpsertClientsArgs {
  input: ClientInput[]
}

export interface MutationUpsertFeaturesArgs {
  input: FeatureInput[]
}

export interface MutationUpsertPortfoliosArgs {
  input: PortfolioInput[]
}

export interface MutationUpsertResumeArgs {
  input: ResumeInput
}

export interface MutationUpsertSettingArgs {
  input: SettingInput
}

export interface Other {
  key: Scalars['String']
  value: Scalars['Float']
}

export interface OtherInput {
  key: Scalars['String']
  value: Scalars['Float']
}

export interface Portfolio {
  category: PortfolioCategory
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  id: Scalars['ID']
  images: Image[]
  index: Scalars['Float']
  like: Scalars['Float']
  techStacks: Scalars['String'][]
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
  userId: Scalars['String']
  view: Scalars['Float']
}

export enum PortfolioCategory {
  Mobile = 'Mobile',
  Web = 'Web',
}

export interface PortfolioInput {
  category: PortfolioCategory
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  images?: InputMaybe<ImageInput[]>
  index: Scalars['Float']
  like?: InputMaybe<Scalars['Float']>
  newImages?: InputMaybe<Uploads[]>
  techStacks?: InputMaybe<Scalars['String'][]>
  title: Scalars['String']
  userId: Scalars['String']
  view?: InputMaybe<Scalars['Float']>
}

export interface PortfolioResponse {
  data?: Maybe<Portfolio>
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface PortfoliosResponse {
  data: Portfolio[]
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface Query {
  admin: AdminResponse
  admins: AdminsResponse
  clients: ClientsResponse
  contacts: ContactsResponse
  features: FeaturesResponse
  portfolios: PortfoliosResponse
  resume: ResumeResponse
  setting: SettingResponse
  user: UserResponse
  users: UsersResponse
  visits: VisitsResponse
}

export interface QueryAdminArgs {
  id: Scalars['String']
}

export interface QueryClientsArgs {
  userIdOrSlug: Scalars['String']
  visible?: InputMaybe<Scalars['Boolean']>
}

export interface QueryContactsArgs {
  onlyNew?: InputMaybe<Scalars['Boolean']>
}

export interface QueryFeaturesArgs {
  userIdOrSlug: Scalars['String']
}

export interface QueryPortfoliosArgs {
  userIdOrSlug: Scalars['String']
}

export interface QueryResumeArgs {
  userIdOrSlug: Scalars['String']
  visible?: InputMaybe<Scalars['Boolean']>
}

export interface QueryUserArgs {
  idOrSlug: Scalars['String']
}

export interface QueryUsersArgs {
  createdBy?: InputMaybe<Scalars['String']>
}

export interface QueryVisitsArgs {
  createdBy?: InputMaybe<Scalars['String']>
  dateRange?: InputMaybe<Scalars['String'][]>
  userId?: InputMaybe<Scalars['String']>
}

export interface Resume {
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  education: Education[]
  experience: Experience[]
  id: Scalars['ID']
  interests: Interest[]
  skills: Skill[]
  updatedAt: Scalars['DateTime']
  userId: Scalars['String']
}

export interface ResumeInput {
  description?: InputMaybe<Scalars['String']>
  education?: InputMaybe<EducationInput[]>
  experience?: InputMaybe<ExperienceInput[]>
  id?: InputMaybe<Scalars['String']>
  interests?: InputMaybe<InterestInput[]>
  skills?: InputMaybe<SkillInput[]>
  userId: Scalars['String']
}

export interface ResumeResponse {
  data?: Maybe<Resume>
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface Setting {
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  links?: Maybe<SettingLink[]>
  other?: Maybe<Other[]>
  updatedAt: Scalars['DateTime']
}

export interface SettingConfig {
  config?: Maybe<Config>
  setting?: Maybe<Setting>
}

export interface SettingInput {
  config?: InputMaybe<ConfigInput>
  id?: InputMaybe<Scalars['String']>
  links?: InputMaybe<SettingLinkInput[]>
  other?: InputMaybe<OtherInput[]>
}

export interface SettingLink {
  key: ExternalLink
  value: Scalars['Float']
}

export interface SettingLinkInput {
  key: ExternalLink
  value: Scalars['Float']
}

export interface SettingResponse {
  data?: Maybe<SettingConfig>
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface SignIn {
  accessToken: Scalars['String']
  admin: Admin
}

export interface SignInResponse {
  data?: Maybe<SignIn>
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface Skill {
  category: SkillCategory
  index: Scalars['Float']
  name: Scalars['String']
  rate: Scalars['Float']
  visible: Scalars['Boolean']
}

export enum SkillCategory {
  Backend = 'Backend',
  Frontend = 'Frontend',
  Mobile = 'Mobile',
  Other = 'Other',
}

export interface SkillInput {
  category: SkillCategory
  index: Scalars['Float']
  name: Scalars['String']
  rate: Scalars['Float']
  visible?: InputMaybe<Scalars['Boolean']>
}

export interface Subscription {
  contactAdded?: Maybe<Contact>
  tgChatIdUpdated?: Maybe<Admin>
}

export interface Uploads {
  file?: InputMaybe<Scalars['Upload']>
  id?: InputMaybe<Scalars['String']>
  index?: InputMaybe<Scalars['Float']>
  prevPath?: InputMaybe<Scalars['String']>
}

export interface User {
  active: Scalars['Boolean']
  address?: Maybe<Scalars['String']>
  availability?: Maybe<Scalars['String']>
  avatar?: Maybe<Image>
  backgroundImages: Image[]
  bio: Scalars['String']
  createdAt: Scalars['DateTime']
  createdBy: Scalars['String']
  email: Scalars['String']
  firstName: Scalars['String']
  id: Scalars['ID']
  lastName: Scalars['String']
  links: UserLink[]
  middleName?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  slogan?: Maybe<Scalars['String']>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export interface UserInput {
  active?: InputMaybe<Scalars['Boolean']>
  address?: InputMaybe<Scalars['String']>
  availability?: InputMaybe<Scalars['String']>
  backgroundImages?: InputMaybe<ImageInput[]>
  bio: Scalars['String']
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  links?: InputMaybe<UserLinkInput[]>
  middleName?: InputMaybe<Scalars['String']>
  phone?: InputMaybe<Scalars['String']>
  slogan?: InputMaybe<Scalars['String']>
  slug: Scalars['String']
  title: Scalars['String']
}

export interface UserLink {
  index: Scalars['Float']
  name: ExternalLink
  url: Scalars['String']
  visible: Scalars['Boolean']
}

export interface UserLinkInput {
  index: Scalars['Float']
  name: ExternalLink
  url: Scalars['String']
  visible: Scalars['Boolean']
}

export interface UserResponse {
  data?: Maybe<User>
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface UsersResponse {
  data: User[]
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface Visit {
  adminCreatedEmail: Scalars['String']
  createdAt: Scalars['DateTime']
  from: ExternalLink
  id: Scalars['ID']
  updatedAt: Scalars['DateTime']
  userAgent: Scalars['String']
  userId: Scalars['String']
  userSeen: Scalars['String']
}

export interface VisitInput {
  from: ExternalLink
  userAgent: Scalars['String']
  userId: Scalars['String']
}

export interface VisitResponse {
  data?: Maybe<Visit>
  message: Scalars['String']
  status: Scalars['Boolean']
}

export interface VisitsResponse {
  data: Visit[]
  message: Scalars['String']
  status: Scalars['Boolean']
}

export type ImageFragment = {
  __typename: 'Image'
  id: string
  index?: number | null | undefined
  path: string
  url: string
}

export type PortfolioFragment = {
  __typename: 'Portfolio'
  id: string
  userId: string
  index: number
  category: PortfolioCategory
  title: string
  description: string
  view: number
  like: number
  techStacks: string[]
  createdAt: any
  updatedAt: any
  images: {
    __typename: 'Image'
    id: string
    index?: number | null | undefined
    path: string
    url: string
  }[]
}

export type UserLinkFragment = {
  __typename: 'UserLink'
  index: number
  name: ExternalLink
  url: string
  visible: boolean
}

export type EducationFragment = {
  __typename: 'Education'
  index: number
  startedFrom: string
  endedAt?: string | null | undefined
  title?: string | null | undefined
  at: string
  description?: string | null | undefined
  degree?: string | null | undefined
  visible: boolean
}

export type SkillFragment = {
  __typename: 'Skill'
  index: number
  name: string
  category: SkillCategory
  rate: number
  visible: boolean
}

export type ExperienceFragment = {
  __typename: 'Experience'
  index: number
  startedFrom: string
  endedAt?: string | null | undefined
  title?: string | null | undefined
  at: string
  description?: string | null | undefined
  visible: boolean
}

export type InterestFragment = {
  __typename: 'Interest'
  index: number
  title: string
  description?: string | null | undefined
}

export type FeatureFragment = {
  __typename: 'Feature'
  id: string
  userId: string
  index: number
  title: string
  description?: string | null | undefined
  icon?: string | null | undefined
  createdAt: any
  updatedAt: any
}

export type ResumeFragment = {
  __typename: 'Resume'
  id: string
  userId: string
  description?: string | null | undefined
  createdAt: any
  updatedAt: any
  education: {
    __typename: 'Education'
    index: number
    startedFrom: string
    endedAt?: string | null | undefined
    title?: string | null | undefined
    at: string
    description?: string | null | undefined
    degree?: string | null | undefined
    visible: boolean
  }[]
  skills: {
    __typename: 'Skill'
    index: number
    name: string
    category: SkillCategory
    rate: number
    visible: boolean
  }[]
  experience: {
    __typename: 'Experience'
    index: number
    startedFrom: string
    endedAt?: string | null | undefined
    title?: string | null | undefined
    at: string
    description?: string | null | undefined
    visible: boolean
  }[]
  interests: {
    __typename: 'Interest'
    index: number
    title: string
    description?: string | null | undefined
  }[]
}

export type ClientFragment = {
  __typename: 'Client'
  id: string
  userId: string
  index: number
  name: string
  clientInfo?: string | null | undefined
  url?: string | null | undefined
  feedback?: string | null | undefined
  visible: boolean
  createdAt: any
  updatedAt: any
  logo?:
    | {
        __typename: 'Image'
        id: string
        index?: number | null | undefined
        path: string
        url: string
      }
    | null
    | undefined
}

export type UserFragment = {
  __typename: 'User'
  id: string
  slug: string
  firstName: string
  middleName?: string | null | undefined
  lastName: string
  email: string
  phone?: string | null | undefined
  address?: string | null | undefined
  title: string
  slogan?: string | null | undefined
  availability?: string | null | undefined
  bio: string
  active: boolean
  createdAt: any
  updatedAt: any
  avatar?:
    | {
        __typename: 'Image'
        id: string
        index?: number | null | undefined
        path: string
        url: string
      }
    | null
    | undefined
  backgroundImages: {
    __typename: 'Image'
    id: string
    index?: number | null | undefined
    path: string
    url: string
  }[]
  links: {
    __typename: 'UserLink'
    index: number
    name: ExternalLink
    url: string
    visible: boolean
  }[]
}

export type ContactFragment = {
  __typename: 'Contact'
  id: string
  userId: string
  name?: string | null | undefined
  email: string
  message?: string | null | undefined
  seen: boolean
  ref?: ExternalLink | null | undefined
  createdAt: any
  updatedAt: any
  user?:
    | {
        __typename: 'User'
        email: string
        firstName: string
        middleName?: string | null | undefined
        lastName: string
      }
    | null
    | undefined
}

export type VisitFragment = {
  __typename: 'Visit'
  id: string
  from: ExternalLink
  userId: string
  userSeen: string
  userAgent: string
  adminCreatedEmail: string
  createdAt: any
  updatedAt: any
}

export type AdminFragment = {
  __typename: 'Admin'
  id: string
  email: string
  type?: AdminType | null | undefined
  tgChatId?: string | null | undefined
  createdAt: any
  updatedAt: any
}

export type SettingConfigFragment = {
  __typename: 'SettingConfig'
  setting?:
    | {
        __typename: 'Setting'
        id: string
        createdAt: any
        updatedAt: any
        links?:
          | {
              __typename: 'SettingLink'
              key: ExternalLink
              value: number
            }[]
          | null
          | undefined
        other?:
          | { __typename: 'Other'; key: string; value: number }[]
          | null
          | undefined
      }
    | null
    | undefined
  config?:
    | {
        __typename: 'Config'
        dropBoxToken: string
        telegramToken?: string | null | undefined
      }
    | null
    | undefined
}

export type SignInMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
  accessToken?: InputMaybe<Scalars['String']>
}>

export type SignInMutation = {
  __typename: 'Mutation'
  signIn: {
    __typename: 'SignInResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'SignIn'
          accessToken: string
          admin: {
            __typename: 'Admin'
            id: string
            email: string
            type?: AdminType | null | undefined
            tgChatId?: string | null | undefined
            createdAt: any
            updatedAt: any
          }
        }
      | null
      | undefined
  }
}

export type CreateAdminMutationVariables = Exact<{
  input: AdminInput
}>

export type CreateAdminMutation = {
  __typename: 'Mutation'
  createAdmin: {
    __typename: 'AdminResponse'
    message: string
    status: boolean
    data?:
      | {
          __typename: 'Admin'
          id: string
          email: string
          type?: AdminType | null | undefined
          tgChatId?: string | null | undefined
          createdAt: any
          updatedAt: any
        }
      | null
      | undefined
  }
}

export type UpdateAdminMutationVariables = Exact<{
  id: Scalars['String']
  input: AdminInput
}>

export type UpdateAdminMutation = {
  __typename: 'Mutation'
  updateAdmin: {
    __typename: 'AdminResponse'
    message: string
    status: boolean
    data?:
      | {
          __typename: 'Admin'
          id: string
          email: string
          type?: AdminType | null | undefined
          tgChatId?: string | null | undefined
          createdAt: any
          updatedAt: any
        }
      | null
      | undefined
  }
}

export type UpsertAdminMutationVariables = Exact<{
  input: AdminInput
}>

export type UpsertAdminMutation = {
  __typename: 'Mutation'
  upsertAdmin: {
    __typename: 'AdminResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Admin'
          id: string
          email: string
          type?: AdminType | null | undefined
          tgChatId?: string | null | undefined
          createdAt: any
          updatedAt: any
        }
      | null
      | undefined
  }
}

export type DeleteAdminMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteAdminMutation = {
  __typename: 'Mutation'
  deleteAdmin: { __typename: 'AdminResponse'; status: boolean; message: string }
}

export type SetTgChatIdMutationVariables = Exact<{
  id: Scalars['String']
  chatId?: InputMaybe<Scalars['String']>
}>

export type SetTgChatIdMutation = {
  __typename: 'Mutation'
  setTGChatId: { __typename: 'AdminResponse'; message: string; status: boolean }
}

export type CreateUserMutationVariables = Exact<{
  input: UserInput
  avatar?: InputMaybe<Uploads>
  backgroundImages?: InputMaybe<Uploads[] | Uploads>
}>

export type CreateUserMutation = {
  __typename: 'Mutation'
  createUser: {
    __typename: 'UserResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'User'
          createdBy: string
          id: string
          slug: string
          firstName: string
          middleName?: string | null | undefined
          lastName: string
          email: string
          phone?: string | null | undefined
          address?: string | null | undefined
          title: string
          slogan?: string | null | undefined
          availability?: string | null | undefined
          bio: string
          active: boolean
          createdAt: any
          updatedAt: any
          avatar?:
            | {
                __typename: 'Image'
                id: string
                index?: number | null | undefined
                path: string
                url: string
              }
            | null
            | undefined
          backgroundImages: {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }[]
          links: {
            __typename: 'UserLink'
            index: number
            name: ExternalLink
            url: string
            visible: boolean
          }[]
        }
      | null
      | undefined
  }
}

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']
  input: UserInput
  avatar?: InputMaybe<Uploads>
  backgroundImages?: InputMaybe<Uploads[] | Uploads>
}>

export type UpdateUserMutation = {
  __typename: 'Mutation'
  updateUser: {
    __typename: 'UserResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'User'
          createdBy: string
          id: string
          slug: string
          firstName: string
          middleName?: string | null | undefined
          lastName: string
          email: string
          phone?: string | null | undefined
          address?: string | null | undefined
          title: string
          slogan?: string | null | undefined
          availability?: string | null | undefined
          bio: string
          active: boolean
          createdAt: any
          updatedAt: any
          avatar?:
            | {
                __typename: 'Image'
                id: string
                index?: number | null | undefined
                path: string
                url: string
              }
            | null
            | undefined
          backgroundImages: {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }[]
          links: {
            __typename: 'UserLink'
            index: number
            name: ExternalLink
            url: string
            visible: boolean
          }[]
        }
      | null
      | undefined
  }
}

export type DuplicateUserMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DuplicateUserMutation = {
  __typename: 'Mutation'
  duplicateUser: {
    __typename: 'UserResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'User'
          createdBy: string
          id: string
          slug: string
          firstName: string
          middleName?: string | null | undefined
          lastName: string
          email: string
          phone?: string | null | undefined
          address?: string | null | undefined
          title: string
          slogan?: string | null | undefined
          availability?: string | null | undefined
          bio: string
          active: boolean
          createdAt: any
          updatedAt: any
          avatar?:
            | {
                __typename: 'Image'
                id: string
                index?: number | null | undefined
                path: string
                url: string
              }
            | null
            | undefined
          backgroundImages: {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }[]
          links: {
            __typename: 'UserLink'
            index: number
            name: ExternalLink
            url: string
            visible: boolean
          }[]
        }
      | null
      | undefined
  }
}

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteUserMutation = {
  __typename: 'Mutation'
  deleteUser: { __typename: 'UserResponse'; status: boolean; message: string }
}

export type DeleteFreeUsersMutationVariables = Exact<{ [key: string]: never }>

export type DeleteFreeUsersMutation = {
  __typename: 'Mutation'
  deleteFreeUsers: {
    __typename: 'UserResponse'
    status: boolean
    message: string
  }
}

export type CreateFeatureMutationVariables = Exact<{
  input: FeatureInput
}>

export type CreateFeatureMutation = {
  __typename: 'Mutation'
  createFeature: {
    __typename: 'FeatureResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Feature'
          id: string
          userId: string
          index: number
          title: string
          description?: string | null | undefined
          icon?: string | null | undefined
          createdAt: any
          updatedAt: any
        }
      | null
      | undefined
  }
}

export type UpdateFeatureMutationVariables = Exact<{
  id: Scalars['String']
  input: FeatureInput
}>

export type UpdateFeatureMutation = {
  __typename: 'Mutation'
  updateFeature: {
    __typename: 'FeatureResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Feature'
          id: string
          userId: string
          index: number
          title: string
          description?: string | null | undefined
          icon?: string | null | undefined
          createdAt: any
          updatedAt: any
        }
      | null
      | undefined
  }
}

export type UpsertFeaturesMutationVariables = Exact<{
  input: FeatureInput[] | FeatureInput
}>

export type UpsertFeaturesMutation = {
  __typename: 'Mutation'
  upsertFeatures: {
    __typename: 'FeaturesResponse'
    status: boolean
    message: string
    data: {
      __typename: 'Feature'
      id: string
      userId: string
      index: number
      title: string
      description?: string | null | undefined
      icon?: string | null | undefined
      createdAt: any
      updatedAt: any
    }[]
  }
}

export type DeleteFeatureMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteFeatureMutation = {
  __typename: 'Mutation'
  deleteFeature: {
    __typename: 'FeatureResponse'
    status: boolean
    message: string
  }
}

export type CreatePortfolioMutationVariables = Exact<{
  input: PortfolioInput
}>

export type CreatePortfolioMutation = {
  __typename: 'Mutation'
  createPortfolio: {
    __typename: 'PortfolioResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Portfolio'
          id: string
          userId: string
          index: number
          category: PortfolioCategory
          title: string
          description: string
          view: number
          like: number
          techStacks: string[]
          createdAt: any
          updatedAt: any
          images: {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }[]
        }
      | null
      | undefined
  }
}

export type UpdatePortfolioMutationVariables = Exact<{
  id: Scalars['String']
  input: PortfolioInput
}>

export type UpdatePortfolioMutation = {
  __typename: 'Mutation'
  updatePortfolio: {
    __typename: 'PortfolioResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Portfolio'
          id: string
          userId: string
          index: number
          category: PortfolioCategory
          title: string
          description: string
          view: number
          like: number
          techStacks: string[]
          createdAt: any
          updatedAt: any
          images: {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }[]
        }
      | null
      | undefined
  }
}

export type UpsertPortfoliosMutationVariables = Exact<{
  input: PortfolioInput[] | PortfolioInput
}>

export type UpsertPortfoliosMutation = {
  __typename: 'Mutation'
  upsertPortfolios: {
    __typename: 'PortfoliosResponse'
    status: boolean
    message: string
    data: {
      __typename: 'Portfolio'
      id: string
      userId: string
      index: number
      category: PortfolioCategory
      title: string
      description: string
      view: number
      like: number
      techStacks: string[]
      createdAt: any
      updatedAt: any
      images: {
        __typename: 'Image'
        id: string
        index?: number | null | undefined
        path: string
        url: string
      }[]
    }[]
  }
}

export type IncreasePortfolioViewsMutationVariables = Exact<{
  id: Scalars['String']
}>

export type IncreasePortfolioViewsMutation = {
  __typename: 'Mutation'
  increasePortfolioViews: {
    __typename: 'PortfolioResponse'
    status: boolean
    message: string
    data?:
      | { __typename: 'Portfolio'; index: number; like: number; view: number }
      | null
      | undefined
  }
}

export type IncreasePortfolioLikesMutationVariables = Exact<{
  id: Scalars['String']
}>

export type IncreasePortfolioLikesMutation = {
  __typename: 'Mutation'
  increasePortfolioLikes: {
    __typename: 'PortfolioResponse'
    status: boolean
    message: string
    data?:
      | { __typename: 'Portfolio'; index: number; like: number; view: number }
      | null
      | undefined
  }
}

export type DeletePortfolioMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeletePortfolioMutation = {
  __typename: 'Mutation'
  deletePortfolio: {
    __typename: 'PortfolioResponse'
    status: boolean
    message: string
  }
}

export type CreateResumeMutationVariables = Exact<{
  input: ResumeInput
}>

export type CreateResumeMutation = {
  __typename: 'Mutation'
  createResume: {
    __typename: 'ResumeResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Resume'
          id: string
          userId: string
          description?: string | null | undefined
          createdAt: any
          updatedAt: any
          education: {
            __typename: 'Education'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            degree?: string | null | undefined
            visible: boolean
          }[]
          skills: {
            __typename: 'Skill'
            index: number
            name: string
            category: SkillCategory
            rate: number
            visible: boolean
          }[]
          experience: {
            __typename: 'Experience'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            visible: boolean
          }[]
          interests: {
            __typename: 'Interest'
            index: number
            title: string
            description?: string | null | undefined
          }[]
        }
      | null
      | undefined
  }
}

export type UpdateResumeMutationVariables = Exact<{
  id: Scalars['String']
  input: ResumeInput
}>

export type UpdateResumeMutation = {
  __typename: 'Mutation'
  updateResume: {
    __typename: 'ResumeResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Resume'
          id: string
          userId: string
          description?: string | null | undefined
          createdAt: any
          updatedAt: any
          education: {
            __typename: 'Education'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            degree?: string | null | undefined
            visible: boolean
          }[]
          skills: {
            __typename: 'Skill'
            index: number
            name: string
            category: SkillCategory
            rate: number
            visible: boolean
          }[]
          experience: {
            __typename: 'Experience'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            visible: boolean
          }[]
          interests: {
            __typename: 'Interest'
            index: number
            title: string
            description?: string | null | undefined
          }[]
        }
      | null
      | undefined
  }
}

export type UpsertResumeMutationVariables = Exact<{
  input: ResumeInput
}>

export type UpsertResumeMutation = {
  __typename: 'Mutation'
  upsertResume: {
    __typename: 'ResumeResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Resume'
          id: string
          userId: string
          description?: string | null | undefined
          createdAt: any
          updatedAt: any
          education: {
            __typename: 'Education'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            degree?: string | null | undefined
            visible: boolean
          }[]
          skills: {
            __typename: 'Skill'
            index: number
            name: string
            category: SkillCategory
            rate: number
            visible: boolean
          }[]
          experience: {
            __typename: 'Experience'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            visible: boolean
          }[]
          interests: {
            __typename: 'Interest'
            index: number
            title: string
            description?: string | null | undefined
          }[]
        }
      | null
      | undefined
  }
}

export type DeleteResumeMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteResumeMutation = {
  __typename: 'Mutation'
  deleteResume: {
    __typename: 'ResumeResponse'
    status: boolean
    message: string
  }
}

export type CreateClientMutationVariables = Exact<{
  input: ClientInput
}>

export type CreateClientMutation = {
  __typename: 'Mutation'
  createClient: {
    __typename: 'ClientResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Client'
          id: string
          userId: string
          index: number
          name: string
          clientInfo?: string | null | undefined
          url?: string | null | undefined
          feedback?: string | null | undefined
          visible: boolean
          createdAt: any
          updatedAt: any
          logo?:
            | {
                __typename: 'Image'
                id: string
                index?: number | null | undefined
                path: string
                url: string
              }
            | null
            | undefined
        }
      | null
      | undefined
  }
}

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['String']
  input: ClientInput
}>

export type UpdateClientMutation = {
  __typename: 'Mutation'
  updateClient: {
    __typename: 'ClientResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Client'
          id: string
          userId: string
          index: number
          name: string
          clientInfo?: string | null | undefined
          url?: string | null | undefined
          feedback?: string | null | undefined
          visible: boolean
          createdAt: any
          updatedAt: any
          logo?:
            | {
                __typename: 'Image'
                id: string
                index?: number | null | undefined
                path: string
                url: string
              }
            | null
            | undefined
        }
      | null
      | undefined
  }
}

export type UpsertClientsMutationVariables = Exact<{
  input: ClientInput[] | ClientInput
}>

export type UpsertClientsMutation = {
  __typename: 'Mutation'
  upsertClients: {
    __typename: 'ClientsResponse'
    status: boolean
    message: string
    data: {
      __typename: 'Client'
      id: string
      userId: string
      index: number
      name: string
      clientInfo?: string | null | undefined
      url?: string | null | undefined
      feedback?: string | null | undefined
      visible: boolean
      createdAt: any
      updatedAt: any
      logo?:
        | {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }
        | null
        | undefined
    }[]
  }
}

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteClientMutation = {
  __typename: 'Mutation'
  deleteClient: {
    __typename: 'ClientResponse'
    status: boolean
    message: string
  }
}

export type CreateSettingMutationVariables = Exact<{
  input: SettingInput
}>

export type CreateSettingMutation = {
  __typename: 'Mutation'
  createSetting: {
    __typename: 'SettingResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'SettingConfig'
          setting?:
            | {
                __typename: 'Setting'
                id: string
                createdAt: any
                updatedAt: any
                links?:
                  | {
                      __typename: 'SettingLink'
                      key: ExternalLink
                      value: number
                    }[]
                  | null
                  | undefined
                other?:
                  | { __typename: 'Other'; key: string; value: number }[]
                  | null
                  | undefined
              }
            | null
            | undefined
          config?:
            | {
                __typename: 'Config'
                dropBoxToken: string
                telegramToken?: string | null | undefined
              }
            | null
            | undefined
        }
      | null
      | undefined
  }
}

export type UpdateSettingMutationVariables = Exact<{
  id: Scalars['String']
  input: SettingInput
}>

export type UpdateSettingMutation = {
  __typename: 'Mutation'
  updateSetting: {
    __typename: 'SettingResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'SettingConfig'
          setting?:
            | {
                __typename: 'Setting'
                id: string
                createdAt: any
                updatedAt: any
                links?:
                  | {
                      __typename: 'SettingLink'
                      key: ExternalLink
                      value: number
                    }[]
                  | null
                  | undefined
                other?:
                  | { __typename: 'Other'; key: string; value: number }[]
                  | null
                  | undefined
              }
            | null
            | undefined
          config?:
            | {
                __typename: 'Config'
                dropBoxToken: string
                telegramToken?: string | null | undefined
              }
            | null
            | undefined
        }
      | null
      | undefined
  }
}

export type UpsertSettingMutationVariables = Exact<{
  input: SettingInput
}>

export type UpsertSettingMutation = {
  __typename: 'Mutation'
  upsertSetting: {
    __typename: 'SettingResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'SettingConfig'
          setting?:
            | {
                __typename: 'Setting'
                id: string
                createdAt: any
                updatedAt: any
                links?:
                  | {
                      __typename: 'SettingLink'
                      key: ExternalLink
                      value: number
                    }[]
                  | null
                  | undefined
                other?:
                  | { __typename: 'Other'; key: string; value: number }[]
                  | null
                  | undefined
              }
            | null
            | undefined
          config?:
            | {
                __typename: 'Config'
                dropBoxToken: string
                telegramToken?: string | null | undefined
              }
            | null
            | undefined
        }
      | null
      | undefined
  }
}

export type DeleteSettingMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteSettingMutation = {
  __typename: 'Mutation'
  deleteSetting: {
    __typename: 'SettingResponse'
    status: boolean
    message: string
  }
}

export type CreateContactMutationVariables = Exact<{
  input: ContactInput
}>

export type CreateContactMutation = {
  __typename: 'Mutation'
  createContact: {
    __typename: 'ContactResponse'
    status: boolean
    message: string
  }
}

export type UpdateContactMutationVariables = Exact<{
  id: Scalars['String']
  input: ContactInput
}>

export type UpdateContactMutation = {
  __typename: 'Mutation'
  updateContact: {
    __typename: 'ContactResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Contact'
          id: string
          userId: string
          name?: string | null | undefined
          email: string
          message?: string | null | undefined
          seen: boolean
          ref?: ExternalLink | null | undefined
          createdAt: any
          updatedAt: any
          user?:
            | {
                __typename: 'User'
                email: string
                firstName: string
                middleName?: string | null | undefined
                lastName: string
              }
            | null
            | undefined
        }
      | null
      | undefined
  }
}

export type DeleteContactMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteContactMutation = {
  __typename: 'Mutation'
  deleteContact: {
    __typename: 'ContactResponse'
    status: boolean
    message: string
  }
}

export type MakeContactSeenMutationVariables = Exact<{
  id: Scalars['String']
}>

export type MakeContactSeenMutation = {
  __typename: 'Mutation'
  makeContactSeen: {
    __typename: 'ContactResponse'
    status: boolean
    message: string
    data?:
      | {
          __typename: 'Contact'
          id: string
          userId: string
          name?: string | null | undefined
          email: string
          message?: string | null | undefined
          seen: boolean
          ref?: ExternalLink | null | undefined
          createdAt: any
          updatedAt: any
          user?:
            | {
                __typename: 'User'
                email: string
                firstName: string
                middleName?: string | null | undefined
                lastName: string
              }
            | null
            | undefined
        }
      | null
      | undefined
  }
}

export type CreateVisitMutationVariables = Exact<{
  input: VisitInput
}>

export type CreateVisitMutation = {
  __typename: 'Mutation'
  createVisit: { __typename: 'VisitResponse'; status: boolean; message: string }
}

export type DeleteVisitsMutationVariables = Exact<{
  ids?: InputMaybe<Scalars['String'][] | Scalars['String']>
}>

export type DeleteVisitsMutation = {
  __typename: 'Mutation'
  deleteVisits: {
    __typename: 'VisitResponse'
    status: boolean
    message: string
  }
}

export type UserQueryVariables = Exact<{
  idOrSlug: Scalars['String']
}>

export type UserQuery = {
  __typename: 'Query'
  user: {
    __typename: 'UserResponse'
    message: string
    data?:
      | {
          __typename: 'User'
          createdBy: string
          id: string
          slug: string
          firstName: string
          middleName?: string | null | undefined
          lastName: string
          email: string
          phone?: string | null | undefined
          address?: string | null | undefined
          title: string
          slogan?: string | null | undefined
          availability?: string | null | undefined
          bio: string
          active: boolean
          createdAt: any
          updatedAt: any
          avatar?:
            | {
                __typename: 'Image'
                id: string
                index?: number | null | undefined
                path: string
                url: string
              }
            | null
            | undefined
          backgroundImages: {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }[]
          links: {
            __typename: 'UserLink'
            index: number
            name: ExternalLink
            url: string
            visible: boolean
          }[]
        }
      | null
      | undefined
  }
}

export type ClientsQueryVariables = Exact<{
  userIdOrSlug: Scalars['String']
}>

export type ClientsQuery = {
  __typename: 'Query'
  clients: {
    __typename: 'ClientsResponse'
    message: string
    status: boolean
    data: {
      __typename: 'Client'
      id: string
      userId: string
      index: number
      name: string
      clientInfo?: string | null | undefined
      url?: string | null | undefined
      feedback?: string | null | undefined
      visible: boolean
      createdAt: any
      updatedAt: any
      logo?:
        | {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }
        | null
        | undefined
    }[]
  }
}

export type FeaturesQueryVariables = Exact<{
  userIdOrSlug: Scalars['String']
}>

export type FeaturesQuery = {
  __typename: 'Query'
  features: {
    __typename: 'FeaturesResponse'
    message: string
    status: boolean
    data: {
      __typename: 'Feature'
      id: string
      userId: string
      index: number
      title: string
      description?: string | null | undefined
      icon?: string | null | undefined
      createdAt: any
      updatedAt: any
    }[]
  }
}

export type PortfoliosQueryVariables = Exact<{
  userIdOrSlug: Scalars['String']
}>

export type PortfoliosQuery = {
  __typename: 'Query'
  portfolios: {
    __typename: 'PortfoliosResponse'
    message: string
    status: boolean
    data: {
      __typename: 'Portfolio'
      id: string
      userId: string
      index: number
      category: PortfolioCategory
      title: string
      description: string
      view: number
      like: number
      techStacks: string[]
      createdAt: any
      updatedAt: any
      images: {
        __typename: 'Image'
        id: string
        index?: number | null | undefined
        path: string
        url: string
      }[]
    }[]
  }
}

export type ResumeQueryVariables = Exact<{
  userIdOrSlug: Scalars['String']
}>

export type ResumeQuery = {
  __typename: 'Query'
  resume: {
    __typename: 'ResumeResponse'
    message: string
    status: boolean
    data?:
      | {
          __typename: 'Resume'
          id: string
          userId: string
          description?: string | null | undefined
          createdAt: any
          updatedAt: any
          education: {
            __typename: 'Education'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            degree?: string | null | undefined
            visible: boolean
          }[]
          skills: {
            __typename: 'Skill'
            index: number
            name: string
            category: SkillCategory
            rate: number
            visible: boolean
          }[]
          experience: {
            __typename: 'Experience'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            visible: boolean
          }[]
          interests: {
            __typename: 'Interest'
            index: number
            title: string
            description?: string | null | undefined
          }[]
        }
      | null
      | undefined
  }
}

export type AdminUserQueryVariables = Exact<{
  idOrSlug: Scalars['String']
}>

export type AdminUserQuery = {
  __typename: 'Query'
  profile: {
    __typename: 'UserResponse'
    data?:
      | {
          __typename: 'User'
          createdBy: string
          id: string
          slug: string
          firstName: string
          middleName?: string | null | undefined
          lastName: string
          email: string
          phone?: string | null | undefined
          address?: string | null | undefined
          title: string
          slogan?: string | null | undefined
          availability?: string | null | undefined
          bio: string
          active: boolean
          createdAt: any
          updatedAt: any
          avatar?:
            | {
                __typename: 'Image'
                id: string
                index?: number | null | undefined
                path: string
                url: string
              }
            | null
            | undefined
          backgroundImages: {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }[]
          links: {
            __typename: 'UserLink'
            index: number
            name: ExternalLink
            url: string
            visible: boolean
          }[]
        }
      | null
      | undefined
  }
  clients: {
    __typename: 'ClientsResponse'
    data: {
      __typename: 'Client'
      id: string
      userId: string
      index: number
      name: string
      clientInfo?: string | null | undefined
      url?: string | null | undefined
      feedback?: string | null | undefined
      visible: boolean
      createdAt: any
      updatedAt: any
      logo?:
        | {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }
        | null
        | undefined
    }[]
  }
  features: {
    __typename: 'FeaturesResponse'
    data: {
      __typename: 'Feature'
      id: string
      userId: string
      index: number
      title: string
      description?: string | null | undefined
      icon?: string | null | undefined
      createdAt: any
      updatedAt: any
    }[]
  }
  portfolios: {
    __typename: 'PortfoliosResponse'
    data: {
      __typename: 'Portfolio'
      id: string
      userId: string
      index: number
      category: PortfolioCategory
      title: string
      description: string
      view: number
      like: number
      techStacks: string[]
      createdAt: any
      updatedAt: any
      images: {
        __typename: 'Image'
        id: string
        index?: number | null | undefined
        path: string
        url: string
      }[]
    }[]
  }
  resume: {
    __typename: 'ResumeResponse'
    data?:
      | {
          __typename: 'Resume'
          id: string
          userId: string
          description?: string | null | undefined
          createdAt: any
          updatedAt: any
          education: {
            __typename: 'Education'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            degree?: string | null | undefined
            visible: boolean
          }[]
          skills: {
            __typename: 'Skill'
            index: number
            name: string
            category: SkillCategory
            rate: number
            visible: boolean
          }[]
          experience: {
            __typename: 'Experience'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            visible: boolean
          }[]
          interests: {
            __typename: 'Interest'
            index: number
            title: string
            description?: string | null | undefined
          }[]
        }
      | null
      | undefined
  }
}

export type UserDataQueryVariables = Exact<{
  idOrSlug: Scalars['String']
}>

export type UserDataQuery = {
  __typename: 'Query'
  profile: {
    __typename: 'UserResponse'
    data?:
      | {
          __typename: 'User'
          id: string
          slug: string
          firstName: string
          middleName?: string | null | undefined
          lastName: string
          email: string
          phone?: string | null | undefined
          address?: string | null | undefined
          title: string
          slogan?: string | null | undefined
          availability?: string | null | undefined
          bio: string
          active: boolean
          createdAt: any
          updatedAt: any
          avatar?:
            | {
                __typename: 'Image'
                id: string
                index?: number | null | undefined
                path: string
                url: string
              }
            | null
            | undefined
          backgroundImages: {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }[]
          links: {
            __typename: 'UserLink'
            index: number
            name: ExternalLink
            url: string
            visible: boolean
          }[]
        }
      | null
      | undefined
  }
  clients: {
    __typename: 'ClientsResponse'
    data: {
      __typename: 'Client'
      id: string
      userId: string
      index: number
      name: string
      clientInfo?: string | null | undefined
      url?: string | null | undefined
      feedback?: string | null | undefined
      visible: boolean
      createdAt: any
      updatedAt: any
      logo?:
        | {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }
        | null
        | undefined
    }[]
  }
  features: {
    __typename: 'FeaturesResponse'
    data: {
      __typename: 'Feature'
      id: string
      userId: string
      index: number
      title: string
      description?: string | null | undefined
      icon?: string | null | undefined
      createdAt: any
      updatedAt: any
    }[]
  }
  portfolios: {
    __typename: 'PortfoliosResponse'
    data: {
      __typename: 'Portfolio'
      id: string
      userId: string
      index: number
      category: PortfolioCategory
      title: string
      description: string
      view: number
      like: number
      techStacks: string[]
      createdAt: any
      updatedAt: any
      images: {
        __typename: 'Image'
        id: string
        index?: number | null | undefined
        path: string
        url: string
      }[]
    }[]
  }
  resume: {
    __typename: 'ResumeResponse'
    data?:
      | {
          __typename: 'Resume'
          id: string
          userId: string
          description?: string | null | undefined
          createdAt: any
          updatedAt: any
          education: {
            __typename: 'Education'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            degree?: string | null | undefined
            visible: boolean
          }[]
          skills: {
            __typename: 'Skill'
            index: number
            name: string
            category: SkillCategory
            rate: number
            visible: boolean
          }[]
          experience: {
            __typename: 'Experience'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            visible: boolean
          }[]
          interests: {
            __typename: 'Interest'
            index: number
            title: string
            description?: string | null | undefined
          }[]
        }
      | null
      | undefined
  }
}

export type AdminUsersQueryVariables = Exact<{
  createdBy?: InputMaybe<Scalars['String']>
}>

export type AdminUsersQuery = {
  __typename: 'Query'
  users: {
    __typename: 'UsersResponse'
    data: {
      __typename: 'User'
      id: string
      slug: string
      firstName: string
      middleName?: string | null | undefined
      lastName: string
      email: string
      phone?: string | null | undefined
      address?: string | null | undefined
      title: string
      active: boolean
      createdBy: string
      createdAt: any
      updatedAt: any
      avatar?:
        | {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }
        | null
        | undefined
    }[]
  }
}

export type AdminClientsQueryVariables = Exact<{
  userIdOrSlug: Scalars['String']
}>

export type AdminClientsQuery = {
  __typename: 'Query'
  clients: {
    __typename: 'ClientsResponse'
    message: string
    status: boolean
    data: {
      __typename: 'Client'
      id: string
      userId: string
      index: number
      name: string
      clientInfo?: string | null | undefined
      url?: string | null | undefined
      feedback?: string | null | undefined
      visible: boolean
      createdAt: any
      updatedAt: any
      logo?:
        | {
            __typename: 'Image'
            id: string
            index?: number | null | undefined
            path: string
            url: string
          }
        | null
        | undefined
    }[]
  }
}

export type AdminFeaturesQueryVariables = Exact<{
  userIdOrSlug: Scalars['String']
}>

export type AdminFeaturesQuery = {
  __typename: 'Query'
  features: {
    __typename: 'FeaturesResponse'
    message: string
    status: boolean
    data: {
      __typename: 'Feature'
      id: string
      userId: string
      index: number
      title: string
      description?: string | null | undefined
      icon?: string | null | undefined
      createdAt: any
      updatedAt: any
    }[]
  }
}

export type AdminPortfoliosQueryVariables = Exact<{
  userIdOrSlug: Scalars['String']
}>

export type AdminPortfoliosQuery = {
  __typename: 'Query'
  portfolios: {
    __typename: 'PortfoliosResponse'
    message: string
    status: boolean
    data: {
      __typename: 'Portfolio'
      id: string
      userId: string
      index: number
      category: PortfolioCategory
      title: string
      description: string
      view: number
      like: number
      techStacks: string[]
      createdAt: any
      updatedAt: any
      images: {
        __typename: 'Image'
        id: string
        index?: number | null | undefined
        path: string
        url: string
      }[]
    }[]
  }
}

export type AdminResumeQueryVariables = Exact<{
  userIdOrSlug: Scalars['String']
}>

export type AdminResumeQuery = {
  __typename: 'Query'
  resume: {
    __typename: 'ResumeResponse'
    message: string
    status: boolean
    data?:
      | {
          __typename: 'Resume'
          id: string
          userId: string
          description?: string | null | undefined
          createdAt: any
          updatedAt: any
          education: {
            __typename: 'Education'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            degree?: string | null | undefined
            visible: boolean
          }[]
          skills: {
            __typename: 'Skill'
            index: number
            name: string
            category: SkillCategory
            rate: number
            visible: boolean
          }[]
          experience: {
            __typename: 'Experience'
            index: number
            startedFrom: string
            endedAt?: string | null | undefined
            title?: string | null | undefined
            at: string
            description?: string | null | undefined
            visible: boolean
          }[]
          interests: {
            __typename: 'Interest'
            index: number
            title: string
            description?: string | null | undefined
          }[]
        }
      | null
      | undefined
  }
}

export type AdminsQueryVariables = Exact<{ [key: string]: never }>

export type AdminsQuery = {
  __typename: 'Query'
  admins: {
    __typename: 'AdminsResponse'
    message: string
    status: boolean
    data: {
      __typename: 'Admin'
      id: string
      email: string
      type?: AdminType | null | undefined
      tgChatId?: string | null | undefined
      createdAt: any
      updatedAt: any
    }[]
  }
}

export type AdminContactsQueryVariables = Exact<{ [key: string]: never }>

export type AdminContactsQuery = {
  __typename: 'Query'
  contacts: {
    __typename: 'ContactsResponse'
    message: string
    status: boolean
    data: {
      __typename: 'Contact'
      id: string
      userId: string
      name?: string | null | undefined
      email: string
      message?: string | null | undefined
      seen: boolean
      ref?: ExternalLink | null | undefined
      createdAt: any
      updatedAt: any
      user?:
        | {
            __typename: 'User'
            email: string
            firstName: string
            middleName?: string | null | undefined
            lastName: string
          }
        | null
        | undefined
    }[]
  }
}

export type VisitsQueryVariables = Exact<{
  dateRange?: InputMaybe<Scalars['String'][] | Scalars['String']>
  createdBy?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
}>

export type VisitsQuery = {
  __typename: 'Query'
  visits: {
    __typename: 'VisitsResponse'
    message: string
    status: boolean
    data: {
      __typename: 'Visit'
      id: string
      from: ExternalLink
      userId: string
      userSeen: string
      userAgent: string
      adminCreatedEmail: string
      createdAt: any
      updatedAt: any
    }[]
  }
}

export type DashboardDataQueryVariables = Exact<{
  currentAdmin: Scalars['String']
  dateRange?: InputMaybe<Scalars['String'][] | Scalars['String']>
}>

export type DashboardDataQuery = {
  __typename: 'Query'
  admins: {
    __typename: 'AdminsResponse'
    data: { __typename: 'Admin'; id: string }[]
  }
  users: {
    __typename: 'UsersResponse'
    data: { __typename: 'User'; createdBy: string }[]
  }
  contacts: {
    __typename: 'ContactsResponse'
    data: { __typename: 'Contact'; id: string }[]
  }
  visits: {
    __typename: 'VisitsResponse'
    data: {
      __typename: 'Visit'
      userSeen: string
      from: ExternalLink
      createdAt: any
    }[]
  }
}

export type VisitFilterUserDataQueryVariables = Exact<{
  createdBy: Scalars['String']
}>

export type VisitFilterUserDataQuery = {
  __typename: 'Query'
  users: {
    __typename: 'UsersResponse'
    data: {
      __typename: 'User'
      id: string
      firstName: string
      middleName?: string | null | undefined
      lastName: string
    }[]
  }
}

export type AdminSettingQueryVariables = Exact<{ [key: string]: never }>

export type AdminSettingQuery = {
  __typename: 'Query'
  setting: {
    __typename: 'SettingResponse'
    message: string
    status: boolean
    data?:
      | {
          __typename: 'SettingConfig'
          setting?:
            | {
                __typename: 'Setting'
                id: string
                createdAt: any
                updatedAt: any
                links?:
                  | {
                      __typename: 'SettingLink'
                      key: ExternalLink
                      value: number
                    }[]
                  | null
                  | undefined
                other?:
                  | { __typename: 'Other'; key: string; value: number }[]
                  | null
                  | undefined
              }
            | null
            | undefined
          config?:
            | {
                __typename: 'Config'
                dropBoxToken: string
                telegramToken?: string | null | undefined
              }
            | null
            | undefined
        }
      | null
      | undefined
  }
}

export type ContactAddedSubscriptionVariables = Exact<{ [key: string]: never }>

export type ContactAddedSubscription = {
  __typename: 'Subscription'
  contactAdded?:
    | {
        __typename: 'Contact'
        id: string
        userId: string
        name?: string | null | undefined
        email: string
        message?: string | null | undefined
        seen: boolean
        ref?: ExternalLink | null | undefined
        createdAt: any
        updatedAt: any
        user?:
          | {
              __typename: 'User'
              email: string
              firstName: string
              middleName?: string | null | undefined
              lastName: string
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type TgChatIdUpdatedSubscriptionVariables = Exact<{
  [key: string]: never
}>

export type TgChatIdUpdatedSubscription = {
  __typename: 'Subscription'
  tgChatIdUpdated?:
    | {
        __typename: 'Admin'
        id: string
        email: string
        type?: AdminType | null | undefined
        tgChatId?: string | null | undefined
        createdAt: any
        updatedAt: any
      }
    | null
    | undefined
}

export const ImageFragmentDoc = gql`
  fragment Image on Image {
    id
    index
    path
    url
  }
`
export const PortfolioFragmentDoc = gql`
  fragment Portfolio on Portfolio {
    id
    userId
    index
    category
    title
    description
    view
    like
    images {
      ...Image
    }
    techStacks
    createdAt
    updatedAt
  }
  ${ImageFragmentDoc}
`
export const UserLinkFragmentDoc = gql`
  fragment UserLink on UserLink {
    index
    name
    url
    visible
  }
`
export const FeatureFragmentDoc = gql`
  fragment Feature on Feature {
    id
    userId
    index
    title
    description
    icon
    createdAt
    updatedAt
  }
`
export const EducationFragmentDoc = gql`
  fragment Education on Education {
    index
    startedFrom
    endedAt
    title
    at
    description
    degree
    visible
  }
`
export const SkillFragmentDoc = gql`
  fragment Skill on Skill {
    index
    name
    category
    rate
    visible
  }
`
export const ExperienceFragmentDoc = gql`
  fragment Experience on Experience {
    index
    startedFrom
    endedAt
    title
    at
    description
    visible
  }
`
export const InterestFragmentDoc = gql`
  fragment Interest on Interest {
    index
    title
    description
  }
`
export const ResumeFragmentDoc = gql`
  fragment Resume on Resume {
    id
    userId
    description
    education {
      ...Education
    }
    skills {
      ...Skill
    }
    experience {
      ...Experience
    }
    interests {
      ...Interest
    }
    createdAt
    updatedAt
  }
  ${EducationFragmentDoc}
  ${SkillFragmentDoc}
  ${ExperienceFragmentDoc}
  ${InterestFragmentDoc}
`
export const ClientFragmentDoc = gql`
  fragment Client on Client {
    id
    userId
    index
    name
    clientInfo
    logo {
      ...Image
    }
    url
    feedback
    visible
    createdAt
    updatedAt
  }
  ${ImageFragmentDoc}
`
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    slug
    firstName
    middleName
    lastName
    email
    phone
    address
    title
    slogan
    avatar {
      ...Image
    }
    availability
    bio
    backgroundImages {
      ...Image
    }
    links {
      index
      name
      url
      visible
    }
    active
    createdAt
    updatedAt
  }
  ${ImageFragmentDoc}
`
export const ContactFragmentDoc = gql`
  fragment Contact on Contact {
    id
    userId
    user {
      email
      firstName
      middleName
      lastName
    }
    name
    email
    message
    seen
    ref
    createdAt
    updatedAt
  }
`
export const VisitFragmentDoc = gql`
  fragment Visit on Visit {
    id
    from
    userId
    userSeen
    userAgent
    adminCreatedEmail
    createdAt
    updatedAt
  }
`
export const AdminFragmentDoc = gql`
  fragment Admin on Admin {
    id
    email
    type
    tgChatId
    createdAt
    updatedAt
  }
`
export const SettingConfigFragmentDoc = gql`
  fragment SettingConfig on SettingConfig {
    setting {
      id
      links {
        key
        value
      }
      other {
        key
        value
      }
      createdAt
      updatedAt
    }
    config {
      dropBoxToken
      telegramToken
    }
  }
`
export const SignInDocument = gql`
  mutation SignIn($email: String, $password: String, $accessToken: String) {
    signIn(email: $email, password: $password, accessToken: $accessToken) {
      status
      message
      data {
        accessToken
        admin {
          ...Admin
        }
      }
    }
  }
  ${AdminFragmentDoc}
`
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options,
  )
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>
export const CreateAdminDocument = gql`
  mutation CreateAdmin($input: AdminInput!) {
    createAdmin(input: $input) {
      message
      status
      data {
        ...Admin
      }
    }
  }
  ${AdminFragmentDoc}
`
export type CreateAdminMutationFn = Apollo.MutationFunction<
  CreateAdminMutation,
  CreateAdminMutationVariables
>

/**
 * __useCreateAdminMutation__
 *
 * To run a mutation, you first call `useCreateAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdminMutation, { data, loading, error }] = useCreateAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAdminMutation,
    CreateAdminMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateAdminMutation, CreateAdminMutationVariables>(
    CreateAdminDocument,
    options,
  )
}
export type CreateAdminMutationHookResult = ReturnType<
  typeof useCreateAdminMutation
>
export type CreateAdminMutationResult =
  Apollo.MutationResult<CreateAdminMutation>
export type CreateAdminMutationOptions = Apollo.BaseMutationOptions<
  CreateAdminMutation,
  CreateAdminMutationVariables
>
export const UpdateAdminDocument = gql`
  mutation UpdateAdmin($id: String!, $input: AdminInput!) {
    updateAdmin(id: $id, input: $input) {
      message
      status
      data {
        ...Admin
      }
    }
  }
  ${AdminFragmentDoc}
`
export type UpdateAdminMutationFn = Apollo.MutationFunction<
  UpdateAdminMutation,
  UpdateAdminMutationVariables
>

/**
 * __useUpdateAdminMutation__
 *
 * To run a mutation, you first call `useUpdateAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdminMutation, { data, loading, error }] = useUpdateAdminMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAdminMutation,
    UpdateAdminMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateAdminMutation, UpdateAdminMutationVariables>(
    UpdateAdminDocument,
    options,
  )
}
export type UpdateAdminMutationHookResult = ReturnType<
  typeof useUpdateAdminMutation
>
export type UpdateAdminMutationResult =
  Apollo.MutationResult<UpdateAdminMutation>
export type UpdateAdminMutationOptions = Apollo.BaseMutationOptions<
  UpdateAdminMutation,
  UpdateAdminMutationVariables
>
export const UpsertAdminDocument = gql`
  mutation UpsertAdmin($input: AdminInput!) {
    upsertAdmin(input: $input) {
      status
      message
      data {
        ...Admin
      }
    }
  }
  ${AdminFragmentDoc}
`
export type UpsertAdminMutationFn = Apollo.MutationFunction<
  UpsertAdminMutation,
  UpsertAdminMutationVariables
>

/**
 * __useUpsertAdminMutation__
 *
 * To run a mutation, you first call `useUpsertAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertAdminMutation, { data, loading, error }] = useUpsertAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertAdminMutation,
    UpsertAdminMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpsertAdminMutation, UpsertAdminMutationVariables>(
    UpsertAdminDocument,
    options,
  )
}
export type UpsertAdminMutationHookResult = ReturnType<
  typeof useUpsertAdminMutation
>
export type UpsertAdminMutationResult =
  Apollo.MutationResult<UpsertAdminMutation>
export type UpsertAdminMutationOptions = Apollo.BaseMutationOptions<
  UpsertAdminMutation,
  UpsertAdminMutationVariables
>
export const DeleteAdminDocument = gql`
  mutation DeleteAdmin($id: String!) {
    deleteAdmin(id: $id) {
      status
      message
    }
  }
`
export type DeleteAdminMutationFn = Apollo.MutationFunction<
  DeleteAdminMutation,
  DeleteAdminMutationVariables
>

/**
 * __useDeleteAdminMutation__
 *
 * To run a mutation, you first call `useDeleteAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdminMutation, { data, loading, error }] = useDeleteAdminMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAdminMutation,
    DeleteAdminMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAdminMutation, DeleteAdminMutationVariables>(
    DeleteAdminDocument,
    options,
  )
}
export type DeleteAdminMutationHookResult = ReturnType<
  typeof useDeleteAdminMutation
>
export type DeleteAdminMutationResult =
  Apollo.MutationResult<DeleteAdminMutation>
export type DeleteAdminMutationOptions = Apollo.BaseMutationOptions<
  DeleteAdminMutation,
  DeleteAdminMutationVariables
>
export const SetTgChatIdDocument = gql`
  mutation SetTGChatId($id: String!, $chatId: String) {
    setTGChatId(id: $id, chatId: $chatId) {
      message
      status
    }
  }
`
export type SetTgChatIdMutationFn = Apollo.MutationFunction<
  SetTgChatIdMutation,
  SetTgChatIdMutationVariables
>

/**
 * __useSetTgChatIdMutation__
 *
 * To run a mutation, you first call `useSetTgChatIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTgChatIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTgChatIdMutation, { data, loading, error }] = useSetTgChatIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useSetTgChatIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetTgChatIdMutation,
    SetTgChatIdMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SetTgChatIdMutation, SetTgChatIdMutationVariables>(
    SetTgChatIdDocument,
    options,
  )
}
export type SetTgChatIdMutationHookResult = ReturnType<
  typeof useSetTgChatIdMutation
>
export type SetTgChatIdMutationResult =
  Apollo.MutationResult<SetTgChatIdMutation>
export type SetTgChatIdMutationOptions = Apollo.BaseMutationOptions<
  SetTgChatIdMutation,
  SetTgChatIdMutationVariables
>
export const CreateUserDocument = gql`
  mutation CreateUser(
    $input: UserInput!
    $avatar: Uploads
    $backgroundImages: [Uploads!]
  ) {
    createUser(
      input: $input
      avatar: $avatar
      backgroundImages: $backgroundImages
    ) {
      status
      message
      data {
        ...User
        createdBy
      }
    }
  }
  ${UserFragmentDoc}
`
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *      avatar: // value for 'avatar'
 *      backgroundImages: // value for 'backgroundImages'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  )
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser(
    $id: String!
    $input: UserInput!
    $avatar: Uploads
    $backgroundImages: [Uploads!]
  ) {
    updateUser(
      id: $id
      input: $input
      avatar: $avatar
      backgroundImages: $backgroundImages
    ) {
      status
      message
      data {
        ...User
        createdBy
      }
    }
  }
  ${UserFragmentDoc}
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      avatar: // value for 'avatar'
 *      backgroundImages: // value for 'backgroundImages'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  )
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const DuplicateUserDocument = gql`
  mutation DuplicateUser($id: String!) {
    duplicateUser(id: $id) {
      status
      message
      data {
        ...User
        createdBy
      }
    }
  }
  ${UserFragmentDoc}
`
export type DuplicateUserMutationFn = Apollo.MutationFunction<
  DuplicateUserMutation,
  DuplicateUserMutationVariables
>

/**
 * __useDuplicateUserMutation__
 *
 * To run a mutation, you first call `useDuplicateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateUserMutation, { data, loading, error }] = useDuplicateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDuplicateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DuplicateUserMutation,
    DuplicateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DuplicateUserMutation,
    DuplicateUserMutationVariables
  >(DuplicateUserDocument, options)
}
export type DuplicateUserMutationHookResult = ReturnType<
  typeof useDuplicateUserMutation
>
export type DuplicateUserMutationResult =
  Apollo.MutationResult<DuplicateUserMutation>
export type DuplicateUserMutationOptions = Apollo.BaseMutationOptions<
  DuplicateUserMutation,
  DuplicateUserMutationVariables
>
export const DeleteUserDocument = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      status
      message
    }
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options,
  )
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>
export const DeleteFreeUsersDocument = gql`
  mutation DeleteFreeUsers {
    deleteFreeUsers {
      status
      message
    }
  }
`
export type DeleteFreeUsersMutationFn = Apollo.MutationFunction<
  DeleteFreeUsersMutation,
  DeleteFreeUsersMutationVariables
>

/**
 * __useDeleteFreeUsersMutation__
 *
 * To run a mutation, you first call `useDeleteFreeUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFreeUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFreeUsersMutation, { data, loading, error }] = useDeleteFreeUsersMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteFreeUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFreeUsersMutation,
    DeleteFreeUsersMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteFreeUsersMutation,
    DeleteFreeUsersMutationVariables
  >(DeleteFreeUsersDocument, options)
}
export type DeleteFreeUsersMutationHookResult = ReturnType<
  typeof useDeleteFreeUsersMutation
>
export type DeleteFreeUsersMutationResult =
  Apollo.MutationResult<DeleteFreeUsersMutation>
export type DeleteFreeUsersMutationOptions = Apollo.BaseMutationOptions<
  DeleteFreeUsersMutation,
  DeleteFreeUsersMutationVariables
>
export const CreateFeatureDocument = gql`
  mutation CreateFeature($input: FeatureInput!) {
    createFeature(input: $input) {
      status
      message
      data {
        ...Feature
      }
    }
  }
  ${FeatureFragmentDoc}
`
export type CreateFeatureMutationFn = Apollo.MutationFunction<
  CreateFeatureMutation,
  CreateFeatureMutationVariables
>

/**
 * __useCreateFeatureMutation__
 *
 * To run a mutation, you first call `useCreateFeatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeatureMutation, { data, loading, error }] = useCreateFeatureMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFeatureMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFeatureMutation,
    CreateFeatureMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateFeatureMutation,
    CreateFeatureMutationVariables
  >(CreateFeatureDocument, options)
}
export type CreateFeatureMutationHookResult = ReturnType<
  typeof useCreateFeatureMutation
>
export type CreateFeatureMutationResult =
  Apollo.MutationResult<CreateFeatureMutation>
export type CreateFeatureMutationOptions = Apollo.BaseMutationOptions<
  CreateFeatureMutation,
  CreateFeatureMutationVariables
>
export const UpdateFeatureDocument = gql`
  mutation UpdateFeature($id: String!, $input: FeatureInput!) {
    updateFeature(id: $id, input: $input) {
      status
      message
      data {
        ...Feature
      }
    }
  }
  ${FeatureFragmentDoc}
`
export type UpdateFeatureMutationFn = Apollo.MutationFunction<
  UpdateFeatureMutation,
  UpdateFeatureMutationVariables
>

/**
 * __useUpdateFeatureMutation__
 *
 * To run a mutation, you first call `useUpdateFeatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeatureMutation, { data, loading, error }] = useUpdateFeatureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFeatureMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFeatureMutation,
    UpdateFeatureMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateFeatureMutation,
    UpdateFeatureMutationVariables
  >(UpdateFeatureDocument, options)
}
export type UpdateFeatureMutationHookResult = ReturnType<
  typeof useUpdateFeatureMutation
>
export type UpdateFeatureMutationResult =
  Apollo.MutationResult<UpdateFeatureMutation>
export type UpdateFeatureMutationOptions = Apollo.BaseMutationOptions<
  UpdateFeatureMutation,
  UpdateFeatureMutationVariables
>
export const UpsertFeaturesDocument = gql`
  mutation UpsertFeatures($input: [FeatureInput!]!) {
    upsertFeatures(input: $input) {
      status
      message
      data {
        ...Feature
      }
    }
  }
  ${FeatureFragmentDoc}
`
export type UpsertFeaturesMutationFn = Apollo.MutationFunction<
  UpsertFeaturesMutation,
  UpsertFeaturesMutationVariables
>

/**
 * __useUpsertFeaturesMutation__
 *
 * To run a mutation, you first call `useUpsertFeaturesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertFeaturesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertFeaturesMutation, { data, loading, error }] = useUpsertFeaturesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertFeaturesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertFeaturesMutation,
    UpsertFeaturesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpsertFeaturesMutation,
    UpsertFeaturesMutationVariables
  >(UpsertFeaturesDocument, options)
}
export type UpsertFeaturesMutationHookResult = ReturnType<
  typeof useUpsertFeaturesMutation
>
export type UpsertFeaturesMutationResult =
  Apollo.MutationResult<UpsertFeaturesMutation>
export type UpsertFeaturesMutationOptions = Apollo.BaseMutationOptions<
  UpsertFeaturesMutation,
  UpsertFeaturesMutationVariables
>
export const DeleteFeatureDocument = gql`
  mutation DeleteFeature($id: String!) {
    deleteFeature(id: $id) {
      status
      message
    }
  }
`
export type DeleteFeatureMutationFn = Apollo.MutationFunction<
  DeleteFeatureMutation,
  DeleteFeatureMutationVariables
>

/**
 * __useDeleteFeatureMutation__
 *
 * To run a mutation, you first call `useDeleteFeatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFeatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFeatureMutation, { data, loading, error }] = useDeleteFeatureMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFeatureMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFeatureMutation,
    DeleteFeatureMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteFeatureMutation,
    DeleteFeatureMutationVariables
  >(DeleteFeatureDocument, options)
}
export type DeleteFeatureMutationHookResult = ReturnType<
  typeof useDeleteFeatureMutation
>
export type DeleteFeatureMutationResult =
  Apollo.MutationResult<DeleteFeatureMutation>
export type DeleteFeatureMutationOptions = Apollo.BaseMutationOptions<
  DeleteFeatureMutation,
  DeleteFeatureMutationVariables
>
export const CreatePortfolioDocument = gql`
  mutation CreatePortfolio($input: PortfolioInput!) {
    createPortfolio(input: $input) {
      status
      message
      data {
        ...Portfolio
      }
    }
  }
  ${PortfolioFragmentDoc}
`
export type CreatePortfolioMutationFn = Apollo.MutationFunction<
  CreatePortfolioMutation,
  CreatePortfolioMutationVariables
>

/**
 * __useCreatePortfolioMutation__
 *
 * To run a mutation, you first call `useCreatePortfolioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePortfolioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPortfolioMutation, { data, loading, error }] = useCreatePortfolioMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePortfolioMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePortfolioMutation,
    CreatePortfolioMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreatePortfolioMutation,
    CreatePortfolioMutationVariables
  >(CreatePortfolioDocument, options)
}
export type CreatePortfolioMutationHookResult = ReturnType<
  typeof useCreatePortfolioMutation
>
export type CreatePortfolioMutationResult =
  Apollo.MutationResult<CreatePortfolioMutation>
export type CreatePortfolioMutationOptions = Apollo.BaseMutationOptions<
  CreatePortfolioMutation,
  CreatePortfolioMutationVariables
>
export const UpdatePortfolioDocument = gql`
  mutation UpdatePortfolio($id: String!, $input: PortfolioInput!) {
    updatePortfolio(id: $id, input: $input) {
      status
      message
      data {
        ...Portfolio
      }
    }
  }
  ${PortfolioFragmentDoc}
`
export type UpdatePortfolioMutationFn = Apollo.MutationFunction<
  UpdatePortfolioMutation,
  UpdatePortfolioMutationVariables
>

/**
 * __useUpdatePortfolioMutation__
 *
 * To run a mutation, you first call `useUpdatePortfolioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePortfolioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePortfolioMutation, { data, loading, error }] = useUpdatePortfolioMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePortfolioMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePortfolioMutation,
    UpdatePortfolioMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdatePortfolioMutation,
    UpdatePortfolioMutationVariables
  >(UpdatePortfolioDocument, options)
}
export type UpdatePortfolioMutationHookResult = ReturnType<
  typeof useUpdatePortfolioMutation
>
export type UpdatePortfolioMutationResult =
  Apollo.MutationResult<UpdatePortfolioMutation>
export type UpdatePortfolioMutationOptions = Apollo.BaseMutationOptions<
  UpdatePortfolioMutation,
  UpdatePortfolioMutationVariables
>
export const UpsertPortfoliosDocument = gql`
  mutation UpsertPortfolios($input: [PortfolioInput!]!) {
    upsertPortfolios(input: $input) {
      status
      message
      data {
        ...Portfolio
      }
    }
  }
  ${PortfolioFragmentDoc}
`
export type UpsertPortfoliosMutationFn = Apollo.MutationFunction<
  UpsertPortfoliosMutation,
  UpsertPortfoliosMutationVariables
>

/**
 * __useUpsertPortfoliosMutation__
 *
 * To run a mutation, you first call `useUpsertPortfoliosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertPortfoliosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertPortfoliosMutation, { data, loading, error }] = useUpsertPortfoliosMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertPortfoliosMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertPortfoliosMutation,
    UpsertPortfoliosMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpsertPortfoliosMutation,
    UpsertPortfoliosMutationVariables
  >(UpsertPortfoliosDocument, options)
}
export type UpsertPortfoliosMutationHookResult = ReturnType<
  typeof useUpsertPortfoliosMutation
>
export type UpsertPortfoliosMutationResult =
  Apollo.MutationResult<UpsertPortfoliosMutation>
export type UpsertPortfoliosMutationOptions = Apollo.BaseMutationOptions<
  UpsertPortfoliosMutation,
  UpsertPortfoliosMutationVariables
>
export const IncreasePortfolioViewsDocument = gql`
  mutation IncreasePortfolioViews($id: String!) {
    increasePortfolioViews(id: $id) {
      status
      message
      data {
        index
        like
        view
      }
    }
  }
`
export type IncreasePortfolioViewsMutationFn = Apollo.MutationFunction<
  IncreasePortfolioViewsMutation,
  IncreasePortfolioViewsMutationVariables
>

/**
 * __useIncreasePortfolioViewsMutation__
 *
 * To run a mutation, you first call `useIncreasePortfolioViewsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncreasePortfolioViewsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [increasePortfolioViewsMutation, { data, loading, error }] = useIncreasePortfolioViewsMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIncreasePortfolioViewsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IncreasePortfolioViewsMutation,
    IncreasePortfolioViewsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    IncreasePortfolioViewsMutation,
    IncreasePortfolioViewsMutationVariables
  >(IncreasePortfolioViewsDocument, options)
}
export type IncreasePortfolioViewsMutationHookResult = ReturnType<
  typeof useIncreasePortfolioViewsMutation
>
export type IncreasePortfolioViewsMutationResult =
  Apollo.MutationResult<IncreasePortfolioViewsMutation>
export type IncreasePortfolioViewsMutationOptions = Apollo.BaseMutationOptions<
  IncreasePortfolioViewsMutation,
  IncreasePortfolioViewsMutationVariables
>
export const IncreasePortfolioLikesDocument = gql`
  mutation IncreasePortfolioLikes($id: String!) {
    increasePortfolioLikes(id: $id) {
      status
      message
      data {
        index
        like
        view
      }
    }
  }
`
export type IncreasePortfolioLikesMutationFn = Apollo.MutationFunction<
  IncreasePortfolioLikesMutation,
  IncreasePortfolioLikesMutationVariables
>

/**
 * __useIncreasePortfolioLikesMutation__
 *
 * To run a mutation, you first call `useIncreasePortfolioLikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncreasePortfolioLikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [increasePortfolioLikesMutation, { data, loading, error }] = useIncreasePortfolioLikesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIncreasePortfolioLikesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IncreasePortfolioLikesMutation,
    IncreasePortfolioLikesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    IncreasePortfolioLikesMutation,
    IncreasePortfolioLikesMutationVariables
  >(IncreasePortfolioLikesDocument, options)
}
export type IncreasePortfolioLikesMutationHookResult = ReturnType<
  typeof useIncreasePortfolioLikesMutation
>
export type IncreasePortfolioLikesMutationResult =
  Apollo.MutationResult<IncreasePortfolioLikesMutation>
export type IncreasePortfolioLikesMutationOptions = Apollo.BaseMutationOptions<
  IncreasePortfolioLikesMutation,
  IncreasePortfolioLikesMutationVariables
>
export const DeletePortfolioDocument = gql`
  mutation DeletePortfolio($id: String!) {
    deletePortfolio(id: $id) {
      status
      message
    }
  }
`
export type DeletePortfolioMutationFn = Apollo.MutationFunction<
  DeletePortfolioMutation,
  DeletePortfolioMutationVariables
>

/**
 * __useDeletePortfolioMutation__
 *
 * To run a mutation, you first call `useDeletePortfolioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePortfolioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePortfolioMutation, { data, loading, error }] = useDeletePortfolioMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePortfolioMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePortfolioMutation,
    DeletePortfolioMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeletePortfolioMutation,
    DeletePortfolioMutationVariables
  >(DeletePortfolioDocument, options)
}
export type DeletePortfolioMutationHookResult = ReturnType<
  typeof useDeletePortfolioMutation
>
export type DeletePortfolioMutationResult =
  Apollo.MutationResult<DeletePortfolioMutation>
export type DeletePortfolioMutationOptions = Apollo.BaseMutationOptions<
  DeletePortfolioMutation,
  DeletePortfolioMutationVariables
>
export const CreateResumeDocument = gql`
  mutation CreateResume($input: ResumeInput!) {
    createResume(input: $input) {
      status
      message
      data {
        ...Resume
      }
    }
  }
  ${ResumeFragmentDoc}
`
export type CreateResumeMutationFn = Apollo.MutationFunction<
  CreateResumeMutation,
  CreateResumeMutationVariables
>

/**
 * __useCreateResumeMutation__
 *
 * To run a mutation, you first call `useCreateResumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResumeMutation, { data, loading, error }] = useCreateResumeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateResumeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateResumeMutation,
    CreateResumeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateResumeMutation,
    CreateResumeMutationVariables
  >(CreateResumeDocument, options)
}
export type CreateResumeMutationHookResult = ReturnType<
  typeof useCreateResumeMutation
>
export type CreateResumeMutationResult =
  Apollo.MutationResult<CreateResumeMutation>
export type CreateResumeMutationOptions = Apollo.BaseMutationOptions<
  CreateResumeMutation,
  CreateResumeMutationVariables
>
export const UpdateResumeDocument = gql`
  mutation updateResume($id: String!, $input: ResumeInput!) {
    updateResume(id: $id, input: $input) {
      status
      message
      data {
        ...Resume
      }
    }
  }
  ${ResumeFragmentDoc}
`
export type UpdateResumeMutationFn = Apollo.MutationFunction<
  UpdateResumeMutation,
  UpdateResumeMutationVariables
>

/**
 * __useUpdateResumeMutation__
 *
 * To run a mutation, you first call `useUpdateResumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateResumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateResumeMutation, { data, loading, error }] = useUpdateResumeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateResumeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateResumeMutation,
    UpdateResumeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateResumeMutation,
    UpdateResumeMutationVariables
  >(UpdateResumeDocument, options)
}
export type UpdateResumeMutationHookResult = ReturnType<
  typeof useUpdateResumeMutation
>
export type UpdateResumeMutationResult =
  Apollo.MutationResult<UpdateResumeMutation>
export type UpdateResumeMutationOptions = Apollo.BaseMutationOptions<
  UpdateResumeMutation,
  UpdateResumeMutationVariables
>
export const UpsertResumeDocument = gql`
  mutation upsertResume($input: ResumeInput!) {
    upsertResume(input: $input) {
      status
      message
      data {
        ...Resume
      }
    }
  }
  ${ResumeFragmentDoc}
`
export type UpsertResumeMutationFn = Apollo.MutationFunction<
  UpsertResumeMutation,
  UpsertResumeMutationVariables
>

/**
 * __useUpsertResumeMutation__
 *
 * To run a mutation, you first call `useUpsertResumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertResumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertResumeMutation, { data, loading, error }] = useUpsertResumeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertResumeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertResumeMutation,
    UpsertResumeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpsertResumeMutation,
    UpsertResumeMutationVariables
  >(UpsertResumeDocument, options)
}
export type UpsertResumeMutationHookResult = ReturnType<
  typeof useUpsertResumeMutation
>
export type UpsertResumeMutationResult =
  Apollo.MutationResult<UpsertResumeMutation>
export type UpsertResumeMutationOptions = Apollo.BaseMutationOptions<
  UpsertResumeMutation,
  UpsertResumeMutationVariables
>
export const DeleteResumeDocument = gql`
  mutation DeleteResume($id: String!) {
    deleteResume(id: $id) {
      status
      message
    }
  }
`
export type DeleteResumeMutationFn = Apollo.MutationFunction<
  DeleteResumeMutation,
  DeleteResumeMutationVariables
>

/**
 * __useDeleteResumeMutation__
 *
 * To run a mutation, you first call `useDeleteResumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteResumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteResumeMutation, { data, loading, error }] = useDeleteResumeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteResumeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteResumeMutation,
    DeleteResumeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteResumeMutation,
    DeleteResumeMutationVariables
  >(DeleteResumeDocument, options)
}
export type DeleteResumeMutationHookResult = ReturnType<
  typeof useDeleteResumeMutation
>
export type DeleteResumeMutationResult =
  Apollo.MutationResult<DeleteResumeMutation>
export type DeleteResumeMutationOptions = Apollo.BaseMutationOptions<
  DeleteResumeMutation,
  DeleteResumeMutationVariables
>
export const CreateClientDocument = gql`
  mutation CreateClient($input: ClientInput!) {
    createClient(input: $input) {
      status
      message
      data {
        ...Client
      }
    }
  }
  ${ClientFragmentDoc}
`
export type CreateClientMutationFn = Apollo.MutationFunction<
  CreateClientMutation,
  CreateClientMutationVariables
>

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateClientMutation,
    CreateClientMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateClientMutation,
    CreateClientMutationVariables
  >(CreateClientDocument, options)
}
export type CreateClientMutationHookResult = ReturnType<
  typeof useCreateClientMutation
>
export type CreateClientMutationResult =
  Apollo.MutationResult<CreateClientMutation>
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<
  CreateClientMutation,
  CreateClientMutationVariables
>
export const UpdateClientDocument = gql`
  mutation UpdateClient($id: String!, $input: ClientInput!) {
    updateClient(id: $id, input: $input) {
      status
      message
      data {
        ...Client
      }
    }
  }
  ${ClientFragmentDoc}
`
export type UpdateClientMutationFn = Apollo.MutationFunction<
  UpdateClientMutation,
  UpdateClientMutationVariables
>

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClientMutation,
    UpdateClientMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateClientMutation,
    UpdateClientMutationVariables
  >(UpdateClientDocument, options)
}
export type UpdateClientMutationHookResult = ReturnType<
  typeof useUpdateClientMutation
>
export type UpdateClientMutationResult =
  Apollo.MutationResult<UpdateClientMutation>
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<
  UpdateClientMutation,
  UpdateClientMutationVariables
>
export const UpsertClientsDocument = gql`
  mutation UpsertClients($input: [ClientInput!]!) {
    upsertClients(input: $input) {
      status
      message
      data {
        ...Client
      }
    }
  }
  ${ClientFragmentDoc}
`
export type UpsertClientsMutationFn = Apollo.MutationFunction<
  UpsertClientsMutation,
  UpsertClientsMutationVariables
>

/**
 * __useUpsertClientsMutation__
 *
 * To run a mutation, you first call `useUpsertClientsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertClientsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertClientsMutation, { data, loading, error }] = useUpsertClientsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertClientsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertClientsMutation,
    UpsertClientsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpsertClientsMutation,
    UpsertClientsMutationVariables
  >(UpsertClientsDocument, options)
}
export type UpsertClientsMutationHookResult = ReturnType<
  typeof useUpsertClientsMutation
>
export type UpsertClientsMutationResult =
  Apollo.MutationResult<UpsertClientsMutation>
export type UpsertClientsMutationOptions = Apollo.BaseMutationOptions<
  UpsertClientsMutation,
  UpsertClientsMutationVariables
>
export const DeleteClientDocument = gql`
  mutation DeleteClient($id: String!) {
    deleteClient(id: $id) {
      status
      message
    }
  }
`
export type DeleteClientMutationFn = Apollo.MutationFunction<
  DeleteClientMutation,
  DeleteClientMutationVariables
>

/**
 * __useDeleteClientMutation__
 *
 * To run a mutation, you first call `useDeleteClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClientMutation, { data, loading, error }] = useDeleteClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteClientMutation,
    DeleteClientMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteClientMutation,
    DeleteClientMutationVariables
  >(DeleteClientDocument, options)
}
export type DeleteClientMutationHookResult = ReturnType<
  typeof useDeleteClientMutation
>
export type DeleteClientMutationResult =
  Apollo.MutationResult<DeleteClientMutation>
export type DeleteClientMutationOptions = Apollo.BaseMutationOptions<
  DeleteClientMutation,
  DeleteClientMutationVariables
>
export const CreateSettingDocument = gql`
  mutation CreateSetting($input: SettingInput!) {
    createSetting(input: $input) {
      status
      message
      data {
        ...SettingConfig
      }
    }
  }
  ${SettingConfigFragmentDoc}
`
export type CreateSettingMutationFn = Apollo.MutationFunction<
  CreateSettingMutation,
  CreateSettingMutationVariables
>

/**
 * __useCreateSettingMutation__
 *
 * To run a mutation, you first call `useCreateSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSettingMutation, { data, loading, error }] = useCreateSettingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSettingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSettingMutation,
    CreateSettingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateSettingMutation,
    CreateSettingMutationVariables
  >(CreateSettingDocument, options)
}
export type CreateSettingMutationHookResult = ReturnType<
  typeof useCreateSettingMutation
>
export type CreateSettingMutationResult =
  Apollo.MutationResult<CreateSettingMutation>
export type CreateSettingMutationOptions = Apollo.BaseMutationOptions<
  CreateSettingMutation,
  CreateSettingMutationVariables
>
export const UpdateSettingDocument = gql`
  mutation UpdateSetting($id: String!, $input: SettingInput!) {
    updateSetting(id: $id, input: $input) {
      status
      message
      data {
        ...SettingConfig
      }
    }
  }
  ${SettingConfigFragmentDoc}
`
export type UpdateSettingMutationFn = Apollo.MutationFunction<
  UpdateSettingMutation,
  UpdateSettingMutationVariables
>

/**
 * __useUpdateSettingMutation__
 *
 * To run a mutation, you first call `useUpdateSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingMutation, { data, loading, error }] = useUpdateSettingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSettingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSettingMutation,
    UpdateSettingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateSettingMutation,
    UpdateSettingMutationVariables
  >(UpdateSettingDocument, options)
}
export type UpdateSettingMutationHookResult = ReturnType<
  typeof useUpdateSettingMutation
>
export type UpdateSettingMutationResult =
  Apollo.MutationResult<UpdateSettingMutation>
export type UpdateSettingMutationOptions = Apollo.BaseMutationOptions<
  UpdateSettingMutation,
  UpdateSettingMutationVariables
>
export const UpsertSettingDocument = gql`
  mutation UpsertSetting($input: SettingInput!) {
    upsertSetting(input: $input) {
      status
      message
      data {
        ...SettingConfig
      }
    }
  }
  ${SettingConfigFragmentDoc}
`
export type UpsertSettingMutationFn = Apollo.MutationFunction<
  UpsertSettingMutation,
  UpsertSettingMutationVariables
>

/**
 * __useUpsertSettingMutation__
 *
 * To run a mutation, you first call `useUpsertSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertSettingMutation, { data, loading, error }] = useUpsertSettingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertSettingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertSettingMutation,
    UpsertSettingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpsertSettingMutation,
    UpsertSettingMutationVariables
  >(UpsertSettingDocument, options)
}
export type UpsertSettingMutationHookResult = ReturnType<
  typeof useUpsertSettingMutation
>
export type UpsertSettingMutationResult =
  Apollo.MutationResult<UpsertSettingMutation>
export type UpsertSettingMutationOptions = Apollo.BaseMutationOptions<
  UpsertSettingMutation,
  UpsertSettingMutationVariables
>
export const DeleteSettingDocument = gql`
  mutation DeleteSetting($id: String!) {
    deleteSetting(id: $id) {
      status
      message
    }
  }
`
export type DeleteSettingMutationFn = Apollo.MutationFunction<
  DeleteSettingMutation,
  DeleteSettingMutationVariables
>

/**
 * __useDeleteSettingMutation__
 *
 * To run a mutation, you first call `useDeleteSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSettingMutation, { data, loading, error }] = useDeleteSettingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSettingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSettingMutation,
    DeleteSettingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteSettingMutation,
    DeleteSettingMutationVariables
  >(DeleteSettingDocument, options)
}
export type DeleteSettingMutationHookResult = ReturnType<
  typeof useDeleteSettingMutation
>
export type DeleteSettingMutationResult =
  Apollo.MutationResult<DeleteSettingMutation>
export type DeleteSettingMutationOptions = Apollo.BaseMutationOptions<
  DeleteSettingMutation,
  DeleteSettingMutationVariables
>
export const CreateContactDocument = gql`
  mutation CreateContact($input: ContactInput!) {
    createContact(input: $input) {
      status
      message
    }
  }
`
export type CreateContactMutationFn = Apollo.MutationFunction<
  CreateContactMutation,
  CreateContactMutationVariables
>

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContactMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateContactMutation,
    CreateContactMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CreateContactDocument, options)
}
export type CreateContactMutationHookResult = ReturnType<
  typeof useCreateContactMutation
>
export type CreateContactMutationResult =
  Apollo.MutationResult<CreateContactMutation>
export type CreateContactMutationOptions = Apollo.BaseMutationOptions<
  CreateContactMutation,
  CreateContactMutationVariables
>
export const UpdateContactDocument = gql`
  mutation UpdateContact($id: String!, $input: ContactInput!) {
    updateContact(id: $id, input: $input) {
      status
      message
      data {
        ...Contact
      }
    }
  }
  ${ContactFragmentDoc}
`
export type UpdateContactMutationFn = Apollo.MutationFunction<
  UpdateContactMutation,
  UpdateContactMutationVariables
>

/**
 * __useUpdateContactMutation__
 *
 * To run a mutation, you first call `useUpdateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactMutation, { data, loading, error }] = useUpdateContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateContactMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContactMutation,
    UpdateContactMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateContactMutation,
    UpdateContactMutationVariables
  >(UpdateContactDocument, options)
}
export type UpdateContactMutationHookResult = ReturnType<
  typeof useUpdateContactMutation
>
export type UpdateContactMutationResult =
  Apollo.MutationResult<UpdateContactMutation>
export type UpdateContactMutationOptions = Apollo.BaseMutationOptions<
  UpdateContactMutation,
  UpdateContactMutationVariables
>
export const DeleteContactDocument = gql`
  mutation DeleteContact($id: String!) {
    deleteContact(id: $id) {
      status
      message
    }
  }
`
export type DeleteContactMutationFn = Apollo.MutationFunction<
  DeleteContactMutation,
  DeleteContactMutationVariables
>

/**
 * __useDeleteContactMutation__
 *
 * To run a mutation, you first call `useDeleteContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContactMutation, { data, loading, error }] = useDeleteContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContactMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteContactMutation,
    DeleteContactMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteContactMutation,
    DeleteContactMutationVariables
  >(DeleteContactDocument, options)
}
export type DeleteContactMutationHookResult = ReturnType<
  typeof useDeleteContactMutation
>
export type DeleteContactMutationResult =
  Apollo.MutationResult<DeleteContactMutation>
export type DeleteContactMutationOptions = Apollo.BaseMutationOptions<
  DeleteContactMutation,
  DeleteContactMutationVariables
>
export const MakeContactSeenDocument = gql`
  mutation MakeContactSeen($id: String!) {
    makeContactSeen(id: $id) {
      status
      message
      data {
        ...Contact
      }
    }
  }
  ${ContactFragmentDoc}
`
export type MakeContactSeenMutationFn = Apollo.MutationFunction<
  MakeContactSeenMutation,
  MakeContactSeenMutationVariables
>

/**
 * __useMakeContactSeenMutation__
 *
 * To run a mutation, you first call `useMakeContactSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeContactSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeContactSeenMutation, { data, loading, error }] = useMakeContactSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMakeContactSeenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MakeContactSeenMutation,
    MakeContactSeenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    MakeContactSeenMutation,
    MakeContactSeenMutationVariables
  >(MakeContactSeenDocument, options)
}
export type MakeContactSeenMutationHookResult = ReturnType<
  typeof useMakeContactSeenMutation
>
export type MakeContactSeenMutationResult =
  Apollo.MutationResult<MakeContactSeenMutation>
export type MakeContactSeenMutationOptions = Apollo.BaseMutationOptions<
  MakeContactSeenMutation,
  MakeContactSeenMutationVariables
>
export const CreateVisitDocument = gql`
  mutation CreateVisit($input: VisitInput!) {
    createVisit(input: $input) {
      status
      message
    }
  }
`
export type CreateVisitMutationFn = Apollo.MutationFunction<
  CreateVisitMutation,
  CreateVisitMutationVariables
>

/**
 * __useCreateVisitMutation__
 *
 * To run a mutation, you first call `useCreateVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitMutation, { data, loading, error }] = useCreateVisitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVisitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateVisitMutation,
    CreateVisitMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateVisitMutation, CreateVisitMutationVariables>(
    CreateVisitDocument,
    options,
  )
}
export type CreateVisitMutationHookResult = ReturnType<
  typeof useCreateVisitMutation
>
export type CreateVisitMutationResult =
  Apollo.MutationResult<CreateVisitMutation>
export type CreateVisitMutationOptions = Apollo.BaseMutationOptions<
  CreateVisitMutation,
  CreateVisitMutationVariables
>
export const DeleteVisitsDocument = gql`
  mutation DeleteVisits($ids: [String!]) {
    deleteVisits(ids: $ids) {
      status
      message
    }
  }
`
export type DeleteVisitsMutationFn = Apollo.MutationFunction<
  DeleteVisitsMutation,
  DeleteVisitsMutationVariables
>

/**
 * __useDeleteVisitsMutation__
 *
 * To run a mutation, you first call `useDeleteVisitsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVisitsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVisitsMutation, { data, loading, error }] = useDeleteVisitsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteVisitsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteVisitsMutation,
    DeleteVisitsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteVisitsMutation,
    DeleteVisitsMutationVariables
  >(DeleteVisitsDocument, options)
}
export type DeleteVisitsMutationHookResult = ReturnType<
  typeof useDeleteVisitsMutation
>
export type DeleteVisitsMutationResult =
  Apollo.MutationResult<DeleteVisitsMutation>
export type DeleteVisitsMutationOptions = Apollo.BaseMutationOptions<
  DeleteVisitsMutation,
  DeleteVisitsMutationVariables
>
export const UserDocument = gql`
  query User($idOrSlug: String!) {
    user(idOrSlug: $idOrSlug) {
      message
      data {
        ...User
        createdBy
      }
    }
  }
  ${UserFragmentDoc}
`

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      idOrSlug: // value for 'idOrSlug'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options)
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options,
  )
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>
export const ClientsDocument = gql`
  query Clients($userIdOrSlug: String!) {
    clients(userIdOrSlug: $userIdOrSlug) {
      message
      status
      data {
        ...Client
      }
    }
  }
  ${ClientFragmentDoc}
`

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *      userIdOrSlug: // value for 'userIdOrSlug'
 *   },
 * });
 */
export function useClientsQuery(
  baseOptions: Apollo.QueryHookOptions<ClientsQuery, ClientsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ClientsQuery, ClientsQueryVariables>(
    ClientsDocument,
    options,
  )
}
export function useClientsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ClientsQuery,
    ClientsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ClientsQuery, ClientsQueryVariables>(
    ClientsDocument,
    options,
  )
}
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>
export type ClientsQueryResult = Apollo.QueryResult<
  ClientsQuery,
  ClientsQueryVariables
>
export const FeaturesDocument = gql`
  query Features($userIdOrSlug: String!) {
    features(userIdOrSlug: $userIdOrSlug) {
      message
      status
      data {
        ...Feature
      }
    }
  }
  ${FeatureFragmentDoc}
`

/**
 * __useFeaturesQuery__
 *
 * To run a query within a React component, call `useFeaturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturesQuery({
 *   variables: {
 *      userIdOrSlug: // value for 'userIdOrSlug'
 *   },
 * });
 */
export function useFeaturesQuery(
  baseOptions: Apollo.QueryHookOptions<FeaturesQuery, FeaturesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FeaturesQuery, FeaturesQueryVariables>(
    FeaturesDocument,
    options,
  )
}
export function useFeaturesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FeaturesQuery,
    FeaturesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FeaturesQuery, FeaturesQueryVariables>(
    FeaturesDocument,
    options,
  )
}
export type FeaturesQueryHookResult = ReturnType<typeof useFeaturesQuery>
export type FeaturesLazyQueryHookResult = ReturnType<
  typeof useFeaturesLazyQuery
>
export type FeaturesQueryResult = Apollo.QueryResult<
  FeaturesQuery,
  FeaturesQueryVariables
>
export const PortfoliosDocument = gql`
  query Portfolios($userIdOrSlug: String!) {
    portfolios(userIdOrSlug: $userIdOrSlug) {
      message
      status
      data {
        ...Portfolio
      }
    }
  }
  ${PortfolioFragmentDoc}
`

/**
 * __usePortfoliosQuery__
 *
 * To run a query within a React component, call `usePortfoliosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfoliosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfoliosQuery({
 *   variables: {
 *      userIdOrSlug: // value for 'userIdOrSlug'
 *   },
 * });
 */
export function usePortfoliosQuery(
  baseOptions: Apollo.QueryHookOptions<
    PortfoliosQuery,
    PortfoliosQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PortfoliosQuery, PortfoliosQueryVariables>(
    PortfoliosDocument,
    options,
  )
}
export function usePortfoliosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PortfoliosQuery,
    PortfoliosQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PortfoliosQuery, PortfoliosQueryVariables>(
    PortfoliosDocument,
    options,
  )
}
export type PortfoliosQueryHookResult = ReturnType<typeof usePortfoliosQuery>
export type PortfoliosLazyQueryHookResult = ReturnType<
  typeof usePortfoliosLazyQuery
>
export type PortfoliosQueryResult = Apollo.QueryResult<
  PortfoliosQuery,
  PortfoliosQueryVariables
>
export const ResumeDocument = gql`
  query Resume($userIdOrSlug: String!) {
    resume(userIdOrSlug: $userIdOrSlug) {
      message
      status
      data {
        ...Resume
      }
    }
  }
  ${ResumeFragmentDoc}
`

/**
 * __useResumeQuery__
 *
 * To run a query within a React component, call `useResumeQuery` and pass it any options that fit your needs.
 * When your component renders, `useResumeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResumeQuery({
 *   variables: {
 *      userIdOrSlug: // value for 'userIdOrSlug'
 *   },
 * });
 */
export function useResumeQuery(
  baseOptions: Apollo.QueryHookOptions<ResumeQuery, ResumeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ResumeQuery, ResumeQueryVariables>(
    ResumeDocument,
    options,
  )
}
export function useResumeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ResumeQuery, ResumeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ResumeQuery, ResumeQueryVariables>(
    ResumeDocument,
    options,
  )
}
export type ResumeQueryHookResult = ReturnType<typeof useResumeQuery>
export type ResumeLazyQueryHookResult = ReturnType<typeof useResumeLazyQuery>
export type ResumeQueryResult = Apollo.QueryResult<
  ResumeQuery,
  ResumeQueryVariables
>
export const AdminUserDocument = gql`
  query AdminUser($idOrSlug: String!) {
    profile: user(idOrSlug: $idOrSlug) {
      data {
        ...User
        createdBy
      }
    }
    clients: clients(userIdOrSlug: $idOrSlug) {
      data {
        ...Client
      }
    }
    features: features(userIdOrSlug: $idOrSlug) {
      data {
        ...Feature
      }
    }
    portfolios: portfolios(userIdOrSlug: $idOrSlug) {
      data {
        ...Portfolio
      }
    }
    resume: resume(userIdOrSlug: $idOrSlug) {
      data {
        ...Resume
      }
    }
  }
  ${UserFragmentDoc}
  ${ClientFragmentDoc}
  ${FeatureFragmentDoc}
  ${PortfolioFragmentDoc}
  ${ResumeFragmentDoc}
`

/**
 * __useAdminUserQuery__
 *
 * To run a query within a React component, call `useAdminUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUserQuery({
 *   variables: {
 *      idOrSlug: // value for 'idOrSlug'
 *   },
 * });
 */
export function useAdminUserQuery(
  baseOptions: Apollo.QueryHookOptions<AdminUserQuery, AdminUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminUserQuery, AdminUserQueryVariables>(
    AdminUserDocument,
    options,
  )
}
export function useAdminUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminUserQuery,
    AdminUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AdminUserQuery, AdminUserQueryVariables>(
    AdminUserDocument,
    options,
  )
}
export type AdminUserQueryHookResult = ReturnType<typeof useAdminUserQuery>
export type AdminUserLazyQueryHookResult = ReturnType<
  typeof useAdminUserLazyQuery
>
export type AdminUserQueryResult = Apollo.QueryResult<
  AdminUserQuery,
  AdminUserQueryVariables
>
export const UserDataDocument = gql`
  query UserData($idOrSlug: String!) {
    profile: user(idOrSlug: $idOrSlug) {
      data {
        ...User
      }
    }
    clients: clients(userIdOrSlug: $idOrSlug, visible: true) {
      data {
        ...Client
      }
    }
    features: features(userIdOrSlug: $idOrSlug) {
      data {
        ...Feature
      }
    }
    portfolios: portfolios(userIdOrSlug: $idOrSlug) {
      data {
        ...Portfolio
      }
    }
    resume: resume(userIdOrSlug: $idOrSlug, visible: true) {
      data {
        ...Resume
      }
    }
  }
  ${UserFragmentDoc}
  ${ClientFragmentDoc}
  ${FeatureFragmentDoc}
  ${PortfolioFragmentDoc}
  ${ResumeFragmentDoc}
`

/**
 * __useUserDataQuery__
 *
 * To run a query within a React component, call `useUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDataQuery({
 *   variables: {
 *      idOrSlug: // value for 'idOrSlug'
 *   },
 * });
 */
export function useUserDataQuery(
  baseOptions: Apollo.QueryHookOptions<UserDataQuery, UserDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserDataQuery, UserDataQueryVariables>(
    UserDataDocument,
    options,
  )
}
export function useUserDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserDataQuery,
    UserDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserDataQuery, UserDataQueryVariables>(
    UserDataDocument,
    options,
  )
}
export type UserDataQueryHookResult = ReturnType<typeof useUserDataQuery>
export type UserDataLazyQueryHookResult = ReturnType<
  typeof useUserDataLazyQuery
>
export type UserDataQueryResult = Apollo.QueryResult<
  UserDataQuery,
  UserDataQueryVariables
>
export const AdminUsersDocument = gql`
  query AdminUsers($createdBy: String) {
    users(createdBy: $createdBy) {
      data {
        id
        slug
        firstName
        middleName
        lastName
        email
        phone
        address
        title
        avatar {
          ...Image
        }
        active
        createdBy
        createdAt
        updatedAt
      }
    }
  }
  ${ImageFragmentDoc}
`

/**
 * __useAdminUsersQuery__
 *
 * To run a query within a React component, call `useAdminUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUsersQuery({
 *   variables: {
 *      createdBy: // value for 'createdBy'
 *   },
 * });
 */
export function useAdminUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AdminUsersQuery,
    AdminUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminUsersQuery, AdminUsersQueryVariables>(
    AdminUsersDocument,
    options,
  )
}
export function useAdminUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminUsersQuery,
    AdminUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AdminUsersQuery, AdminUsersQueryVariables>(
    AdminUsersDocument,
    options,
  )
}
export type AdminUsersQueryHookResult = ReturnType<typeof useAdminUsersQuery>
export type AdminUsersLazyQueryHookResult = ReturnType<
  typeof useAdminUsersLazyQuery
>
export type AdminUsersQueryResult = Apollo.QueryResult<
  AdminUsersQuery,
  AdminUsersQueryVariables
>
export const AdminClientsDocument = gql`
  query AdminClients($userIdOrSlug: String!) {
    clients(userIdOrSlug: $userIdOrSlug) {
      message
      status
      data {
        ...Client
      }
    }
  }
  ${ClientFragmentDoc}
`

/**
 * __useAdminClientsQuery__
 *
 * To run a query within a React component, call `useAdminClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminClientsQuery({
 *   variables: {
 *      userIdOrSlug: // value for 'userIdOrSlug'
 *   },
 * });
 */
export function useAdminClientsQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdminClientsQuery,
    AdminClientsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminClientsQuery, AdminClientsQueryVariables>(
    AdminClientsDocument,
    options,
  )
}
export function useAdminClientsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminClientsQuery,
    AdminClientsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AdminClientsQuery, AdminClientsQueryVariables>(
    AdminClientsDocument,
    options,
  )
}
export type AdminClientsQueryHookResult = ReturnType<
  typeof useAdminClientsQuery
>
export type AdminClientsLazyQueryHookResult = ReturnType<
  typeof useAdminClientsLazyQuery
>
export type AdminClientsQueryResult = Apollo.QueryResult<
  AdminClientsQuery,
  AdminClientsQueryVariables
>
export const AdminFeaturesDocument = gql`
  query AdminFeatures($userIdOrSlug: String!) {
    features(userIdOrSlug: $userIdOrSlug) {
      message
      status
      data {
        ...Feature
      }
    }
  }
  ${FeatureFragmentDoc}
`

/**
 * __useAdminFeaturesQuery__
 *
 * To run a query within a React component, call `useAdminFeaturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminFeaturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminFeaturesQuery({
 *   variables: {
 *      userIdOrSlug: // value for 'userIdOrSlug'
 *   },
 * });
 */
export function useAdminFeaturesQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdminFeaturesQuery,
    AdminFeaturesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminFeaturesQuery, AdminFeaturesQueryVariables>(
    AdminFeaturesDocument,
    options,
  )
}
export function useAdminFeaturesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminFeaturesQuery,
    AdminFeaturesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AdminFeaturesQuery, AdminFeaturesQueryVariables>(
    AdminFeaturesDocument,
    options,
  )
}
export type AdminFeaturesQueryHookResult = ReturnType<
  typeof useAdminFeaturesQuery
>
export type AdminFeaturesLazyQueryHookResult = ReturnType<
  typeof useAdminFeaturesLazyQuery
>
export type AdminFeaturesQueryResult = Apollo.QueryResult<
  AdminFeaturesQuery,
  AdminFeaturesQueryVariables
>
export const AdminPortfoliosDocument = gql`
  query AdminPortfolios($userIdOrSlug: String!) {
    portfolios(userIdOrSlug: $userIdOrSlug) {
      message
      status
      data {
        ...Portfolio
      }
    }
  }
  ${PortfolioFragmentDoc}
`

/**
 * __useAdminPortfoliosQuery__
 *
 * To run a query within a React component, call `useAdminPortfoliosQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminPortfoliosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminPortfoliosQuery({
 *   variables: {
 *      userIdOrSlug: // value for 'userIdOrSlug'
 *   },
 * });
 */
export function useAdminPortfoliosQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdminPortfoliosQuery,
    AdminPortfoliosQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminPortfoliosQuery, AdminPortfoliosQueryVariables>(
    AdminPortfoliosDocument,
    options,
  )
}
export function useAdminPortfoliosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminPortfoliosQuery,
    AdminPortfoliosQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    AdminPortfoliosQuery,
    AdminPortfoliosQueryVariables
  >(AdminPortfoliosDocument, options)
}
export type AdminPortfoliosQueryHookResult = ReturnType<
  typeof useAdminPortfoliosQuery
>
export type AdminPortfoliosLazyQueryHookResult = ReturnType<
  typeof useAdminPortfoliosLazyQuery
>
export type AdminPortfoliosQueryResult = Apollo.QueryResult<
  AdminPortfoliosQuery,
  AdminPortfoliosQueryVariables
>
export const AdminResumeDocument = gql`
  query AdminResume($userIdOrSlug: String!) {
    resume(userIdOrSlug: $userIdOrSlug) {
      message
      status
      data {
        ...Resume
      }
    }
  }
  ${ResumeFragmentDoc}
`

/**
 * __useAdminResumeQuery__
 *
 * To run a query within a React component, call `useAdminResumeQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminResumeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminResumeQuery({
 *   variables: {
 *      userIdOrSlug: // value for 'userIdOrSlug'
 *   },
 * });
 */
export function useAdminResumeQuery(
  baseOptions: Apollo.QueryHookOptions<
    AdminResumeQuery,
    AdminResumeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminResumeQuery, AdminResumeQueryVariables>(
    AdminResumeDocument,
    options,
  )
}
export function useAdminResumeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminResumeQuery,
    AdminResumeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AdminResumeQuery, AdminResumeQueryVariables>(
    AdminResumeDocument,
    options,
  )
}
export type AdminResumeQueryHookResult = ReturnType<typeof useAdminResumeQuery>
export type AdminResumeLazyQueryHookResult = ReturnType<
  typeof useAdminResumeLazyQuery
>
export type AdminResumeQueryResult = Apollo.QueryResult<
  AdminResumeQuery,
  AdminResumeQueryVariables
>
export const AdminsDocument = gql`
  query Admins {
    admins {
      message
      status
      data {
        ...Admin
      }
    }
  }
  ${AdminFragmentDoc}
`

/**
 * __useAdminsQuery__
 *
 * To run a query within a React component, call `useAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminsQuery(
  baseOptions?: Apollo.QueryHookOptions<AdminsQuery, AdminsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminsQuery, AdminsQueryVariables>(
    AdminsDocument,
    options,
  )
}
export function useAdminsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AdminsQuery, AdminsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AdminsQuery, AdminsQueryVariables>(
    AdminsDocument,
    options,
  )
}
export type AdminsQueryHookResult = ReturnType<typeof useAdminsQuery>
export type AdminsLazyQueryHookResult = ReturnType<typeof useAdminsLazyQuery>
export type AdminsQueryResult = Apollo.QueryResult<
  AdminsQuery,
  AdminsQueryVariables
>
export const AdminContactsDocument = gql`
  query AdminContacts {
    contacts {
      message
      status
      data {
        ...Contact
      }
    }
  }
  ${ContactFragmentDoc}
`

/**
 * __useAdminContactsQuery__
 *
 * To run a query within a React component, call `useAdminContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminContactsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AdminContactsQuery,
    AdminContactsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminContactsQuery, AdminContactsQueryVariables>(
    AdminContactsDocument,
    options,
  )
}
export function useAdminContactsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminContactsQuery,
    AdminContactsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AdminContactsQuery, AdminContactsQueryVariables>(
    AdminContactsDocument,
    options,
  )
}
export type AdminContactsQueryHookResult = ReturnType<
  typeof useAdminContactsQuery
>
export type AdminContactsLazyQueryHookResult = ReturnType<
  typeof useAdminContactsLazyQuery
>
export type AdminContactsQueryResult = Apollo.QueryResult<
  AdminContactsQuery,
  AdminContactsQueryVariables
>
export const VisitsDocument = gql`
  query Visits($dateRange: [String!], $createdBy: String, $userId: String) {
    visits(dateRange: $dateRange, createdBy: $createdBy, userId: $userId) {
      message
      status
      data {
        ...Visit
      }
    }
  }
  ${VisitFragmentDoc}
`

/**
 * __useVisitsQuery__
 *
 * To run a query within a React component, call `useVisitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitsQuery({
 *   variables: {
 *      dateRange: // value for 'dateRange'
 *      createdBy: // value for 'createdBy'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useVisitsQuery(
  baseOptions?: Apollo.QueryHookOptions<VisitsQuery, VisitsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<VisitsQuery, VisitsQueryVariables>(
    VisitsDocument,
    options,
  )
}
export function useVisitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VisitsQuery, VisitsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<VisitsQuery, VisitsQueryVariables>(
    VisitsDocument,
    options,
  )
}
export type VisitsQueryHookResult = ReturnType<typeof useVisitsQuery>
export type VisitsLazyQueryHookResult = ReturnType<typeof useVisitsLazyQuery>
export type VisitsQueryResult = Apollo.QueryResult<
  VisitsQuery,
  VisitsQueryVariables
>
export const DashboardDataDocument = gql`
  query DashboardData($currentAdmin: String!, $dateRange: [String!]) {
    admins {
      data {
        id
      }
    }
    users {
      data {
        createdBy
      }
    }
    contacts(onlyNew: true) {
      data {
        id
      }
    }
    visits(dateRange: $dateRange, createdBy: $currentAdmin) {
      data {
        userSeen
        from
        createdAt
      }
    }
  }
`

/**
 * __useDashboardDataQuery__
 *
 * To run a query within a React component, call `useDashboardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardDataQuery({
 *   variables: {
 *      currentAdmin: // value for 'currentAdmin'
 *      dateRange: // value for 'dateRange'
 *   },
 * });
 */
export function useDashboardDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    DashboardDataQuery,
    DashboardDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<DashboardDataQuery, DashboardDataQueryVariables>(
    DashboardDataDocument,
    options,
  )
}
export function useDashboardDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DashboardDataQuery,
    DashboardDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<DashboardDataQuery, DashboardDataQueryVariables>(
    DashboardDataDocument,
    options,
  )
}
export type DashboardDataQueryHookResult = ReturnType<
  typeof useDashboardDataQuery
>
export type DashboardDataLazyQueryHookResult = ReturnType<
  typeof useDashboardDataLazyQuery
>
export type DashboardDataQueryResult = Apollo.QueryResult<
  DashboardDataQuery,
  DashboardDataQueryVariables
>
export const VisitFilterUserDataDocument = gql`
  query VisitFilterUserData($createdBy: String!) {
    users(createdBy: $createdBy) {
      data {
        id
        firstName
        middleName
        lastName
      }
    }
  }
`

/**
 * __useVisitFilterUserDataQuery__
 *
 * To run a query within a React component, call `useVisitFilterUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitFilterUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitFilterUserDataQuery({
 *   variables: {
 *      createdBy: // value for 'createdBy'
 *   },
 * });
 */
export function useVisitFilterUserDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    VisitFilterUserDataQuery,
    VisitFilterUserDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    VisitFilterUserDataQuery,
    VisitFilterUserDataQueryVariables
  >(VisitFilterUserDataDocument, options)
}
export function useVisitFilterUserDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VisitFilterUserDataQuery,
    VisitFilterUserDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    VisitFilterUserDataQuery,
    VisitFilterUserDataQueryVariables
  >(VisitFilterUserDataDocument, options)
}
export type VisitFilterUserDataQueryHookResult = ReturnType<
  typeof useVisitFilterUserDataQuery
>
export type VisitFilterUserDataLazyQueryHookResult = ReturnType<
  typeof useVisitFilterUserDataLazyQuery
>
export type VisitFilterUserDataQueryResult = Apollo.QueryResult<
  VisitFilterUserDataQuery,
  VisitFilterUserDataQueryVariables
>
export const AdminSettingDocument = gql`
  query AdminSetting {
    setting {
      message
      status
      data {
        ...SettingConfig
      }
    }
  }
  ${SettingConfigFragmentDoc}
`

/**
 * __useAdminSettingQuery__
 *
 * To run a query within a React component, call `useAdminSettingQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminSettingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminSettingQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminSettingQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AdminSettingQuery,
    AdminSettingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminSettingQuery, AdminSettingQueryVariables>(
    AdminSettingDocument,
    options,
  )
}
export function useAdminSettingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminSettingQuery,
    AdminSettingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AdminSettingQuery, AdminSettingQueryVariables>(
    AdminSettingDocument,
    options,
  )
}
export type AdminSettingQueryHookResult = ReturnType<
  typeof useAdminSettingQuery
>
export type AdminSettingLazyQueryHookResult = ReturnType<
  typeof useAdminSettingLazyQuery
>
export type AdminSettingQueryResult = Apollo.QueryResult<
  AdminSettingQuery,
  AdminSettingQueryVariables
>
export const ContactAddedDocument = gql`
  subscription ContactAdded {
    contactAdded {
      ...Contact
    }
  }
  ${ContactFragmentDoc}
`

/**
 * __useContactAddedSubscription__
 *
 * To run a query within a React component, call `useContactAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useContactAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useContactAddedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    ContactAddedSubscription,
    ContactAddedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    ContactAddedSubscription,
    ContactAddedSubscriptionVariables
  >(ContactAddedDocument, options)
}
export type ContactAddedSubscriptionHookResult = ReturnType<
  typeof useContactAddedSubscription
>
export type ContactAddedSubscriptionResult =
  Apollo.SubscriptionResult<ContactAddedSubscription>
export const TgChatIdUpdatedDocument = gql`
  subscription TgChatIdUpdated {
    tgChatIdUpdated {
      ...Admin
    }
  }
  ${AdminFragmentDoc}
`

/**
 * __useTgChatIdUpdatedSubscription__
 *
 * To run a query within a React component, call `useTgChatIdUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTgChatIdUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTgChatIdUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTgChatIdUpdatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    TgChatIdUpdatedSubscription,
    TgChatIdUpdatedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    TgChatIdUpdatedSubscription,
    TgChatIdUpdatedSubscriptionVariables
  >(TgChatIdUpdatedDocument, options)
}
export type TgChatIdUpdatedSubscriptionHookResult = ReturnType<
  typeof useTgChatIdUpdatedSubscription
>
export type TgChatIdUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<TgChatIdUpdatedSubscription>
