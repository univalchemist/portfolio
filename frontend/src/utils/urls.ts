import { ExternalLink } from '@graphql/graphql'
import { ADMIN_PREFIX, URL_PARAMS, URL_SPLITTER } from '@root/constants'
import { IThemes } from '@root/types'

export const userInitialPath = `/:${URL_PARAMS.SLUG}/:${URL_PARAMS.CONFIG}`
export const userPath = `/`
export const adminPath = `/${ADMIN_PREFIX}/*`
export const signInPath = `/${ADMIN_PREFIX}/sign-in`
export const dashboardPath = 'dashboard'
export const adminsPath = 'admins'
export const adminUsersPath = 'users'
export const adminUserCreatePath = `users/create`
export const adminUserEditPath = `users/:${URL_PARAMS.ID}/edit`
export const contactsPath = 'contacts'
export const settingsPath = 'settings'
export const visitsPath = 'visits'
export const notFoundPath = '/404'

export const isActiveLink = (locationPath: string, path: string): boolean => {
  const _path = locationPath.split('/')

  return _path.includes(path)
}

export const generateUrl = (config: string[]): string => {
  const patterns: string[] = config.map(c => `${c[0].toLowerCase()}${c.length}`)

  return patterns.join(URL_SPLITTER)
}

export const getAvailableLinks = (linkStr: string): ExternalLink[] => {
  const _links = linkStr.split(URL_SPLITTER)

  const links: ExternalLink[] = []

  _links.forEach(l => {
    const _linkName = l[0]
    const _linkLength = l.replace(_linkName, '')
    Object.entries(ExternalLink).some(([k, v]) => {
      if (v.toLowerCase().startsWith(_linkName) && v.length === +_linkLength) {
        links.push(k as ExternalLink)

        return true
      }

      return false
    })
  })

  return links
}

export const getAvailablePlatform = (platformStr: string): ExternalLink => {
  let platform = ExternalLink.Other

  const _platformName = platformStr[0]
  const _platformLength = platformStr.replace(_platformName, '')
  Object.entries(ExternalLink).some(([k, v]) => {
    if (
      v.toLowerCase().startsWith(_platformName) &&
      v.length === +_platformLength
    ) {
      platform = k as ExternalLink

      return true
    }

    return false
  })

  return platform
}

export const getTheme = (themeStr: string): IThemes => {
  let theme = IThemes.Default

  Object.entries(IThemes).some(([k, v]) => {
    if (v === themeStr) {
      theme = k as IThemes

      return true
    }

    return false
  })

  return theme
}

/**
 * idStr: [id]~[links]
 * @param idStr
 * @returns
 */
export const getIdNLinks = (
  slugStr: string,
): { userSlug: string; links: ExternalLink[] } => {
  const [userSlug, linksStr] = slugStr.split('~')
  const links: ExternalLink[] = getAvailableLinks(linksStr)

  return { userSlug, links }
}

export const getThemeNPlatform = (
  configStr: string,
): { platform: ExternalLink; theme: IThemes; contactable: boolean } => {
  const contactableStr = configStr[configStr.length - 1]
  const theme = configStr[configStr.length - 2] as IThemes
  const platformStr = configStr.replace(theme, '').replace(contactableStr, '')

  const platform: ExternalLink = getAvailablePlatform(platformStr)
  const contactable: boolean = contactableStr === 't'

  return { platform, theme, contactable }
}

/**
 * Reverse url
 * e.g. https://gallant-thompson-4f8746.netlify.app/61be10f7fb7355454259de9d~f8@f6@f10/o1dt
 * returns userId: 61be10f7fb7355454259de9d, links: [Facebook, Fiverr, Freelancer], platform: `Other`, theme: `Default`, contactable: `true`
 * @param url
 * @returns url patterns
 */
export const reverseUrl = (
  url: string,
): {
  userId: string
  links: ExternalLink[]
  platform: ExternalLink
  theme: IThemes
  contactable: boolean
} | null => {
  const _url = new URL(url).pathname
  const [_userId, temp0] = _url.split('~')

  const [linksStr, temp1] = temp0.split('/')
  const contactableStr = temp1[temp1.length - 1]
  const themeStr = temp1[temp1.length - 2]
  const platformStr = temp1.replace(themeStr, '').replace(contactableStr, '')

  const userId = _userId.replace(/\//g, '')
  const links: ExternalLink[] = getAvailableLinks(linksStr)
  const platform: ExternalLink = getAvailablePlatform(platformStr)
  const theme: IThemes = getTheme(themeStr)
  const contactable: boolean = contactableStr === 't'

  return { userId, links, platform, theme, contactable }
}
