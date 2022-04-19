import { Model, Types } from 'mongoose'
import {
  Inject,
  Injectable,
  forwardRef,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { omit } from 'lodash'

import { ClientService } from '@modules/client/client.service'
import { FeatureService } from '@modules/feature/feature.service'
import { PortfolioService } from '@modules/portfolio/portfolio.service'
import { ResumeService } from '@modules/resume/resume.service'
import { ContactService } from '@modules/contact/contact.service'
import { Admin } from '@modules/admin/admin.dto'
import { AdminType } from '@modules/admin/admin.enum'
import { Uploads, Image } from '@modules/shared/types'
import DropboxApi from '@modules/shared/uploadFiles'

import { UserInput } from './user.input'
import { User, UserDocument } from './user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly model: Model<UserDocument>,
    @Inject(forwardRef(() => ClientService))
    private readonly clientService: ClientService,
    private readonly featureService: FeatureService,
    private readonly portfolioService: PortfolioService,
    private readonly resumeService: ResumeService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
    private dropboxApi: DropboxApi,
  ) {}

  async create(input: UserInput, admin: Admin): Promise<User> {
    const existingUser = await this.model.findOne({ email: input.email }).exec()
    if (existingUser) {
      throw new BadRequestException('User already exists with this email.')
    }

    const data = {
      ...input,
      backgroundImages: [],
      createdBy: admin.email,
      createdById: admin.id,
    }

    return await new this.model(data).save()
  }

  async all(createdById?: string): Promise<User[] | undefined> {
    const filter = createdById ? { createdById } : {}
    return await this.model
      .find(filter, null, {
        sort: { [createdById ? 'firstName' : 'createdBy']: 1 },
      })
      .exec()
  }

  async find(id: string): Promise<User | undefined> {
    if (!Types.ObjectId.isValid(id)) {
      return
    }
    return await this.model.findById(new Types.ObjectId(id)).exec()
  }

  async findByIdOrSlug(idOrSlug: string): Promise<User | undefined> {
    let filter: any = { slug: idOrSlug }
    if (Types.ObjectId.isValid(idOrSlug)) {
      filter = { _id: new Types.ObjectId(idOrSlug) }
    }
    return await this.model.findOne(filter).exec()
  }

  async update(
    id: string,
    input: UserInput,
    admin: Admin,
  ): Promise<User | undefined> {
    const user = await this.model.findById(new Types.ObjectId(id)).exec()
    if (user?.createdById !== admin.id && admin.type !== AdminType.SuperAdmin) {
      throw new BadRequestException("You can't update other admin's user.")
    }
    return await this.model
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        { $set: input },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async updateAvatar(id: string, upload: Uploads): Promise<User> {
    const user: User = await this.model.findById(new Types.ObjectId(id)).exec()
    if (!user) {
      throw new NotFoundException('This user does not exist.')
    }

    if (!upload.file) return user

    const { createReadStream, filename, mimetype } = await upload.file

    const path = `/user/avatar/${id}.${filename.split('.').pop()}`
    const { success, url } = await this.dropboxApi.update(
      user.avatar?.path,
      path,
      mimetype,
      createReadStream(),
    )

    if (!success || !url) {
      throw new InternalServerErrorException(
        'Something went wrong while uploading file.',
      )
    }

    return await this.model
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $set: {
            avatar: {
              id: user.avatar?.id || new Types.ObjectId().toString(),
              index: 0,
              path,
              url,
            },
          },
        },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async updateBackgroundImages(id: string, uploads: Uploads[]): Promise<User> {
    const user: User = await this.model.findById(new Types.ObjectId(id)).exec()
    if (!user) {
      throw new NotFoundException('This user does not exist.')
    }

    const res: Image[] = []
    const oldImages: string[] = uploads
      .map(u => u.prevPath)
      .filter(path => !!path) //images to be removed

    await this.dropboxApi.delete(oldImages)

    await Promise.all(
      uploads
        .filter(u => !!u.file)
        .map(async (upload: Uploads) => {
          const { createReadStream, filename, mimetype } = await upload.file
          const path = `/user/background/${id}/bg_${
            upload.index
          }_${new Date().getTime()}.${filename.split('.').pop()}`

          if (mimetype.includes('image')) {
            const { success, url } = await this.dropboxApi.upload(
              path,
              createReadStream(),
            )

            if (success && url) {
              res.push({
                id: upload.id || new Types.ObjectId().toString(),
                index: upload.index,
                path,
                url,
              })
            }
          }
        }),
    )

    return await this.model
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $set: { backgroundImages: [...user.backgroundImages, ...res] },
        },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async updateAdminInfo(adminId: string, newEmail: string): Promise<void> {
    await this.model
      .updateMany(
        { createdById: adminId },
        { $set: { createdBy: newEmail } },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async duplicate(id: string, admin: Admin): Promise<User | undefined> {
    const user = await this.model.findById(new Types.ObjectId(id)).exec()
    if (user?.createdById !== admin.id && admin.type !== AdminType.SuperAdmin) {
      throw new BadRequestException("You can't duplicate other admin's user.")
    }

    const _user: User = await new this.model({
      ...omit(user, ['_id', 'createdAt', 'updatedAt']),
      lastName: `${user?.lastName}-dup`,
      slug: `${user?.slug}-dup`,
      createdBy: admin.email,
      createdById: admin.id,
    }).save()

    await this.clientService.duplicate(id, _user.id)
    await this.featureService.duplicate(id, _user.id)
    await this.portfolioService.duplicate(id, _user.id)
    await this.resumeService.duplicate(id, _user.id)

    return _user
  }

  async revokeAdmin(adminId: string): Promise<void> {
    await this.model
      .updateMany(
        { createdById: adminId },
        { $set: { createdBy: null, createdById: null } },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async delete(id: string, admin: Admin): Promise<{ deletedCount?: number }> {
    const user = await this.model.findById(new Types.ObjectId(id)).exec()
    if (user?.createdById !== admin.id && admin.type !== AdminType.SuperAdmin) {
      throw new BadRequestException("You can't delete other admin's user.")
    }

    const res: { deletedCount?: number } = await this.model.deleteOne({
      _id: id,
    })

    if (res.deletedCount) {
      await this.clientService.deleteMany([id])
      await this.featureService.deleteMany([id])
      await this.portfolioService.deleteMany([id])
      await this.resumeService.deleteMany([id])
      await this.contactService.deleteMany([id])
    }

    return res
  }

  async deleteFree(): Promise<{ deletedCount?: number }> {
    const users: User[] = await this.model.find({ createdById: null }).exec()

    const ids: string[] = users.map((user: User) => user.id)

    const res: { deletedCount?: number } = await this.model.deleteMany({
      createdById: null,
    })

    if (res.deletedCount) {
      await this.clientService.deleteMany(ids)
      await this.featureService.deleteMany(ids)
      await this.portfolioService.deleteMany(ids)
      await this.resumeService.deleteMany(ids)
      await this.contactService.deleteMany(ids)
    }

    return res
  }
}
