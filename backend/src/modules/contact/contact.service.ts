import { Model, Types } from 'mongoose'
import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { AdminService } from '@modules/admin/admin.service'
import { UserService } from '@modules/user/user.service'
import { BotService } from '@modules/telegramBot/telegramBot.service'
import { User } from '@modules/user/user.dto'
import { Admin } from '@modules/admin/admin.dto'
import { TelegramKeyWords } from '@modules/telegramBot/telegramBot.dto'
import { telegramHtml } from '@modules/shared/utils'

import { ContactInput } from './contact.input'
import { Contact, ContactDocument } from './contact.dto'

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private readonly model: Model<ContactDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => AdminService))
    private readonly adminService: AdminService,
    @Inject(forwardRef(() => BotService))
    private readonly botService: BotService,
  ) {}

  async create(input: ContactInput): Promise<Contact> {
    const user: User | undefined = await this.userService.find(input.userId)
    const data: any = { ...input, seen: false }
    if (user) {
      data.user = {
        email: user.email,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.middleName,
        _id: user.id,
      }
    }

    const key = new Date().getTime()
    const contact: Contact = await this.model
      .findOneAndUpdate(
        { email: input.email, userId: input.userId },
        { $set: { ...data, userAdminId: user.createdById, key } },
        { upsert: true, new: true },
      )
      .exec()

    const admin: Admin | undefined = await this.adminService.find(
      user.createdById,
    )

    const html = telegramHtml(contact)
    this.botService.sendMessage(admin?.tgChatId, html, {
      parse_mode: 'html',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Mark as read',
              callback_data: `${TelegramKeyWords.Seen}-${key}`,
            },
            {
              text: 'Delete',
              callback_data: `${TelegramKeyWords.Delete}-${key}`,
            },
          ],
        ],
      },
    })

    return contact
  }

  async update(id: string, input: ContactInput): Promise<Contact> {
    return await this.model
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $set: input,
        },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    return this.model.deleteOne({ _id: id })
  }

  async deleteMany(userIds: string[]): Promise<{ deletedCount?: number }> {
    return this.model.deleteMany({ userId: { $in: userIds } })
  }

  async all(
    currentAdmin: Admin,
    onlyNew?: boolean,
  ): Promise<Contact[] | undefined> {
    const filter =
      onlyNew != undefined || onlyNew !== null
        ? { userAdminId: currentAdmin.id, seen: !onlyNew }
        : { userAdminId: currentAdmin.id }
    return await this.model
      .find(filter, null, { sort: { createdAt: 1 } })
      .exec()
  }

  async makeSeen(id: string): Promise<Contact> {
    return await this.model
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $set: { seen: true },
        },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async makeSeenByhKey(key: string): Promise<Contact> {
    return await this.model
      .findOneAndUpdate(
        { key },
        {
          $set: { seen: true },
        },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async deleteByKey(key: string): Promise<{ deletedCount?: number }> {
    return this.model.deleteOne({ key })
  }
}
