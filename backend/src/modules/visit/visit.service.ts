import { Model } from 'mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { User } from '@modules/user/user.dto'
import { UserService } from '@modules/user/user.service'
import { AdminService } from '@modules/admin/admin.service'
import { Admin } from '@modules/admin/admin.dto'
import { fullName } from '@modules/shared/utils'
import { VisitInput } from './visit.input'
import { Visit, VisitDocument } from './visit.dto'

@Injectable()
export class VisitService {
  constructor(
    @InjectModel('Visit') private readonly model: Model<VisitDocument>,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {}

  async create(input: VisitInput): Promise<Visit> {
    const user: User | undefined = await this.userService.find(input.userId)
    if (!user) {
      throw new NotFoundException('The user does not exist.')
    }
    const admin: Admin | undefined = await this.adminService.find(
      user.createdById,
    )

    if (!admin) {
      throw new NotFoundException('The admin does not exist.')
    }

    return await new this.model({
      ...input,
      userId: input.userId,
      userSeen: fullName(user),
      adminCreatedId: admin.id,
      adminCreatedEmail: admin.email,
    }).save()
  }

  async all(
    createdBy?: string,
    userId?: string,
    dateRange?: string[],
  ): Promise<Visit[] | undefined> {
    let filter: any = createdBy ? { adminCreatedId: createdBy } : {}
    filter = userId ? { ...filter, userId } : filter
    filter = dateRange?.length
      ? {
          ...filter,
          createdAt: {
            $gte: dateRange[0],
            $lte: dateRange[1],
          },
        }
      : filter

    return await this.model
      .find(filter, null, { sort: { createdAt: 1 } })
      .exec()
  }

  async delete(ids?: string[]): Promise<{ deletedCount?: number }> {
    if (ids?.length) {
      const { deletedCount } = await this.model.deleteMany({
        _id: { $in: ids },
      })

      return { deletedCount }
    }

    const { deletedCount } = await this.model.deleteMany({})

    return { deletedCount }
  }
}
