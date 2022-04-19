import { Model, Types } from 'mongoose'
import { Resolver, Subscription } from '@nestjs/graphql'
import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PubSubEngine } from 'graphql-subscriptions'
import { hash } from 'bcryptjs'
import { omit } from 'lodash'

import { UserService } from '@modules/user/user.service'
import { AdminInput } from './admin.input'
import { Admin, AdminDocument } from './admin.dto'
import { AdminType } from './admin.enum'

const subscriptionEvent = 'tgChatIdUpdated'

@Injectable()
@Resolver()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<AdminDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  async create(input: AdminInput): Promise<Admin> {
    const data = { ...input }
    data.password = await hash(input.password, 13)
    data.type = input.type || AdminType.Admin
    const _admin = new this.adminModel(data)

    return await _admin.save()
  }

  async update(id: string, input: AdminInput): Promise<Admin> {
    const data = { ...input }
    if (input.password) {
      data.password = await hash(input.password, 13)
    }
    data.type = input.type || AdminType.Admin

    await this.userService.updateAdminInfo(id, input.email)

    return await this.adminModel
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $set: { ...omit(input, ['id']) },
        },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async upsert(input: AdminInput): Promise<Admin> {
    if (input.id) {
      return await this.update(input.id, input)
    }
    return await this.create(input)
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    const admin: Admin = await this.adminModel
      .findById(new Types.ObjectId(id))
      .exec()
    if (admin?.type === AdminType.SuperAdmin) {
      throw new BadRequestException("You can't delete super admin.")
    }

    if (admin) {
      await this.userService.revokeAdmin(admin.id)
    }
    return this.adminModel.deleteOne({ _id: id })
  }

  async all(currentAdmin: Admin): Promise<Admin[] | undefined> {
    return await this.adminModel
      .find({ id: { $ne: new Types.ObjectId(currentAdmin.id) } })
      .exec()
  }

  async find(id: string): Promise<Admin | undefined> {
    if (!Types.ObjectId.isValid(id)) {
      return
    }
    return await this.adminModel.findById(new Types.ObjectId(id)).exec()
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    return await this.adminModel.findOne({ email }).exec()
  }

  async setTGChatId(adminId: string, chatId?: string): Promise<Admin> {
    const admin: Admin = await this.adminModel
      .findByIdAndUpdate(
        new Types.ObjectId(adminId),
        {
          $set: { tgChatId: chatId ?? null },
        },
        { new: true, useFindAndModify: false },
      )
      .exec()
    this.pubSub.publish(subscriptionEvent, { [subscriptionEvent]: admin })
    return admin
  }

  @Subscription(() => Admin, {
    name: subscriptionEvent,
    defaultValue: null,
    nullable: true,
    resolve: data => {
      return data.tgChatIdUpdated
    },
  })
  tgChatIdUpdated() {
    return this.pubSub.asyncIterator(subscriptionEvent)
  }
}
