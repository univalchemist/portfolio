import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import TelegramBot from 'node-telegram-bot-api'

import { Contact } from '@modules/contact/contact.dto'
import { Admin } from '@modules/admin/admin.dto'
import { AdminService } from '@modules/admin/admin.service'
import { ContactService } from '@modules/contact/contact.service'
import config from '@root/config.json'
import { telegramHtml, getEnvironment } from '@modules/shared/utils'

import { TelegramKeyWords } from './telegramBot.dto'

@Injectable()
export class BotService implements OnModuleInit {
  private readonly environment: string
  private readonly bot: any

  constructor(
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
    @Inject(forwardRef(() => AdminService))
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) {
    this.environment = getEnvironment(this.configService.get<string>('ENV'))
    if (!this.bot && config[this.environment].telegramToken) {
      this.bot = new TelegramBot(config[this.environment].telegramToken, {
        polling: true,
      })
    }
  }

  onModuleInit() {
    this.onMessage()
    this.onCallback()
  }

  onMessage() {
    this.bot.on('message', async (msg: any) => {
      let reply = ''
      const _msg = (msg.text || '').toString()
      if (_msg.indexOf(TelegramKeyWords.Start) > -1) {
        const [, adminId] = _msg.split(' ')
        if (adminId) {
          const admin: Admin = await this.adminService.setTGChatId(
            adminId,
            msg.chat.id,
          )
          if (admin) reply = "You've all set to use telegram."
        }
      } else {
        reply = 'We have no response for this message.'
      }
      this.sendMessage(msg.chat.id, reply)
    })
  }

  /**
   * Handles callback from clicking bot button
   */
  onCallback() {
    this.bot.on('callback_query', async callbackQuery => {
      const action = callbackQuery.data
      const msg = callbackQuery.message
      const chat_id = msg.chat.id
      const message_id = msg.message_id

      if (action.indexOf(TelegramKeyWords.Seen) > -1) {
        const markedContact = await this.markContact(action)
        if (markedContact) {
          const newText = telegramHtml(markedContact, true)
          this.bot.editMessageText(newText, {
            chat_id,
            message_id,
            parse_mode: 'html',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Delete',
                    callback_data: `${TelegramKeyWords.Delete}-${markedContact.key}`,
                  },
                ],
              ],
            },
          })
        }
      } else if (action.indexOf(TelegramKeyWords.Delete) > -1) {
        const deleted = await this.deleteContact(action)
        if (deleted) {
          this.bot.deleteMessage(chat_id, message_id)
        }
      }
    })
  }

  /**
   * Mark contact as read
   * @param msg string
   */
  async markContact(action: string) {
    const [, key] = action.split('-')
    if (key) {
      const contact: Contact = await this.contactService.makeSeenByhKey(key)
      return contact
    }
  }

  /**
   * Delete contact
   * @param msg string
   */
  async deleteContact(msg: string) {
    const [, key] = msg.split('-')
    if (key) {
      const { deletedCount } = await this.contactService.deleteByKey(key)
      return Boolean(deletedCount)
    }
  }

  sendMessage(chatId: string | null | undefined, message: string, opts?: any) {
    if (!chatId || !message) return
    this.bot.sendMessage(chatId, message, opts)
  }
}
