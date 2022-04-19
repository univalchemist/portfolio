import { Contact } from '@modules/contact/contact.dto'
import { User } from '@modules/user/user.dto'

/**
 * Generate Telegram HTML message
 * https://telegram-bot-sdk.readme.io/reference/sendmessage
 * https://stackoverflow.com/questions/42786711/add-clickable-buttons-to-telegram-bot
 * https://rdrr.io/cran/telegram.bot/man/editMessageText.html
 * @param contact Contact
 * @param hasRead Boolean | undefined
 * @returns HTML string
 */
export const telegramHtml = (contact: Contact, hasRead?: boolean): string => {
  const who = contact.name
    ? `${contact.name} (${contact.email})`
    : contact.email

  return `<b>${who}</b> wants to contact ${
    contact.user?.email
  } and sent message from <b>${contact.ref}</b>.
  <pre>${contact.message}</pre>
  ${hasRead ? `- <b>READ</b>` : ''}
  `
}

export const getEnvironment = (nodeEnv: string): 'dev' | 'prod' => {
  return nodeEnv === 'local' ? 'dev' : 'prod'
}

export const fullName = (user: User): string => {
  const { firstName, middleName, lastName } = user

  return [firstName, middleName, lastName]
    .filter((n: string | undefined) => !!n)
    .join(' ')
}
