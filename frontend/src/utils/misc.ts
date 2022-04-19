import { capitalize } from 'lodash'
import moment from 'moment-timezone'

import {
  Maybe,
  User,
  Client,
  Feature,
  Education,
  Experience,
  Portfolio,
  Resume,
  Skill,
  UserLink,
  UserDataQuery,
  AdminUserQuery,
  ExternalLink,
} from '@graphql/graphql'
import {
  UserName,
  AppUser,
  AdminUser,
  ProfileUser,
  ProfileClient,
  ProfileFeature,
  ProfilePortfolio,
  ProfileResume,
  MenuType,
  IndexedDatum,
} from '@root/types'
import { TIME_ZONE } from '@root/constants'

export const formatTime = (
  timeStr?: string,
  format = 'YYYY-MM-DD HH:mm',
): string => {
  if (!timeStr) return ''

  return moment(timeStr).format(format)
}

export const UTCToLocalTime = (
  UTCTime: string,
  format = 'YYYY-MM-DD HH:mm:ss',
): string => {
  if (!UTCTime) return ''
  const _UTCTime = moment(UTCTime).format('YYYY-MM-DD HH:mm:ss')
  return moment.utc(_UTCTime).tz(TIME_ZONE).format(format)
}

export const localToUTCTime = (
  localTime: string | undefined = undefined,
  format = 'YYYY-MM-DD HH:mm:ss',
): string => {
  const _localTime = localTime === undefined ? moment() : moment(localTime)
  return moment.utc(_localTime).format(format)
}

export const fullName = (userName: UserName): string => {
  const { firstName, middleName, lastName } = userName

  return [firstName, middleName, lastName]
    .filter((n: Maybe<string>) => !!n)
    .join(' ')
}

export const normalizeProfile = (
  data: Maybe<ProfileUser | User>,
  filterVisible: boolean,
  availableLinks?: ExternalLink[],
): Maybe<ProfileUser | User> => {
  if (!data) return data
  let links = filterVisible
    ? (data.links || []).filter((link: UserLink) => link.visible)
    : data.links || []
  if (availableLinks) {
    links = links.filter((link: UserLink) => availableLinks.includes(link.name))
  }
  return {
    ...data,
    backgroundImages: (data.backgroundImages || []).sort((a, b) =>
      (a.index || 0) > (b.index || 0) ? 1 : -1,
    ),
    links: links.sort((a, b) => (a.index > b.index ? 1 : -1)),
  }
}

export const normalizePortfolio = (
  data: ProfilePortfolio[] | Portfolio[],
): ProfilePortfolio[] | Portfolio[] =>
  data.map(datum => ({
    ...datum,
    images: datum.images.sort((a, b) =>
      (a.index || 0) > (b.index || 0) ? 1 : -1,
    ),
  }))

export const updatePortfolioNum = (
  data: ProfilePortfolio[],
  updateField: { index: number; like: number; view: number },
): ProfilePortfolio[] =>
  data.map((datum: ProfilePortfolio) => {
    if (datum.index === updateField.index) {
      return { ...datum, ...updateField }
    }
    return datum
  })

export const normalizeResume = (
  data: Maybe<ProfileResume | Resume>,
  filterVisible?: boolean,
): Maybe<ProfileResume | Resume> => {
  if (!data) return data

  const education = filterVisible
    ? data.education.filter((education: Education) => education.visible)
    : data.education

  const skills = filterVisible
    ? data.skills.filter((skill: Skill) => skill.visible)
    : data.skills

  const experience = filterVisible
    ? data.experience.filter((experience: Experience) => experience.visible)
    : data.experience

  return {
    ...data,
    education: education.sort((a, b) => (a.index > b.index ? 1 : -1)),
    skills: skills.sort((a, b) => (a.index > b.index ? 1 : -1)),
    experience: experience.sort((a, b) => (a.index > b.index ? 1 : -1)),
    interests: data.interests.sort((a, b) => (a.index > b.index ? 1 : -1)),
  }
}

export const normalizeUserData = (
  data: Maybe<UserDataQuery>,
  availableLinks: ExternalLink[],
): AppUser => {
  return {
    profile: (normalizeProfile(data?.profile?.data, true, availableLinks) ||
      {}) as ProfileUser,
    clients: data?.clients?.data || ([] as ProfileClient[]),
    features: data?.features?.data || ([] as ProfileFeature[]),
    portfolios: normalizePortfolio(
      data?.portfolios?.data || ([] as ProfilePortfolio[]),
    ),
    resume: normalizeResume(data?.resume?.data, true) as ProfileResume,
  }
}

export const normalizeAdminUserData = (
  data: Maybe<AdminUserQuery>,
): AdminUser => {
  return {
    profile: (normalizeProfile(data?.profile?.data, false) || {}) as User,
    clients: data?.clients?.data || ([] as Client[]),
    features: data?.features?.data || ([] as Feature[]),
    portfolios: normalizePortfolio(
      data?.portfolios?.data || ([] as Portfolio[]),
    ) as Portfolio[],
    resume: normalizeResume(data?.resume?.data) as Resume,
  }
}

export const pascalCase = (str: string | undefined): string => {
  const arr: string[] = (str || '')
    .replace(/_/g, '-')
    .split('-')
    .map((s: string) => capitalize(s))

  return arr.join('')
}

export const getMenus = (user: AppUser, contactable?: boolean): MenuType[] => {
  const menus: MenuType[] = [
    {
      id: '1',
      text: 'Home',
      path: 'home',
      icon: 'home',
    },
  ]

  if (user.features?.length) {
    menus.push({
      id: '2',
      text: 'Features',
      path: 'features',
      icon: 'briefcase',
    })
  }
  if (user.portfolios?.length) {
    menus.push({
      id: '3',
      text: 'Portfolio',
      path: 'portfolio',
      icon: 'layers',
    })
  }
  menus.push({
    id: '4',
    text: 'Resume',
    path: 'resume',
    icon: 'user',
  })
  if (user.clients?.length) {
    menus.push({
      id: '5',
      text: 'Clients',
      path: 'clients',
      icon: 'users',
    })
  }
  if (contactable) {
    menus.push({
      id: '6',
      text: 'Contact',
      path: 'contacts',
      icon: 'message-circle',
    })
  }

  return menus
}

/**
 * Move element from sIndex to tIndex: Drag & Drop
 * @param data Array data
 * @param sIndex Number: Source index
 * @param tIndex Number: Destination index
 * @returns Reordered data
 */
export const moveElInArray = (
  data: IndexedDatum[],
  sIndex: number,
  dIndex: number,
): IndexedDatum[] => {
  const _dIndex = sIndex > dIndex ? dIndex : dIndex + 1
  const _data = [...data]
  const source: IndexedDatum = _data[sIndex]
  _data[sIndex] = { ...source, index: -1 }
  _data.splice(_dIndex, 0, source)

  return _data
    .filter(d => (d.index || 0) > -1)
    .map((datum, index) => ({ ...datum, index }))
    .sort((a, b) => ((a.index || 0) > (b.index || 0) ? 1 : -1))
}

export const getInitials = (text: string): string => {
  if (text === text.toUpperCase()) return text

  const reg = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

  // @ts-ignore
  const letters = [...text.matchAll(reg)] || []

  // @ts-ignore
  const initials = (
    (letters.shift()?.[1] || '') + (letters.pop()?.[1] || '')
  ).toUpperCase()

  return initials
}
