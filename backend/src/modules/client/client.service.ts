import { Model, Types } from 'mongoose'
import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { omit } from 'lodash'

import { UserService } from '@modules/user/user.service'
import { Image, Uploads } from '@modules/shared/types'
import DropboxApi from '@modules/shared/uploadFiles'
import { ClientInput } from './client.input'
import { Client, ClientDocument } from './client.dto'

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Client') private readonly model: Model<ClientDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private dropboxApi: DropboxApi,
  ) {}

  async create(input: ClientInput): Promise<Client> {
    if (!input.userId) {
      throw new BadRequestException('userId is required for creation.')
    }

    const id = new Types.ObjectId()

    const logo = await this.uploadLogo(id.toString(), null, input.newLogo)

    return await new this.model({ ...input, id, logo }).save()
  }

  async update(id: string, input: ClientInput): Promise<Client> {
    const client: Client = await this.model
      .findById(new Types.ObjectId(id))
      .exec()
    if (!client) {
      throw new NotFoundException('This client does not exist.')
    }

    let logo = client.logo
    if (input.newLogo) {
      logo = await this.uploadLogo(id, client.logo, input.newLogo)
    } else if (input.logo && input.logo.index < 0) {
      await this.dropboxApi.delete([input.logo.path])
      logo = null
    }

    return await this.model
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $set: { ...omit(input, ['id']), logo },
        },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async upsert(input: ClientInput[]): Promise<Client[]> {
    const removedClients: string[] = input
      .filter(d => d.index < 0)
      .map(d => d.id)
      .filter(d => !!d)
    const removedImages: string[] = input
      .filter(d => d.index < 0)
      .map(d => d.logo?.path)
      .filter(d => !!d)

    const clients = await Promise.all(
      input
        .filter(d => d.index >= 0)
        .map(async (_input: ClientInput) => {
          if (_input.id) {
            return await this.update(_input.id, _input)
          }
          return await this.create(_input)
        }),
    )

    this.deleteClients(removedClients)
    this.dropboxApi.delete(removedImages)
    return clients
  }

  async duplicate(prevUserId: string, newUserId: string): Promise<Client[]> {
    const clients: Client[] = await this.model
      .find({ userId: prevUserId })
      .exec()

    if (!clients.length) return []

    const newClients: Partial<Client>[] = clients.map((client: Client) => ({
      ...omit(client, ['_id', 'createdAt', 'updatedAt']),
      userId: newUserId,
    }))

    return await this.model.insertMany(newClients)
  }

  async deleteClients(ids: string[]): Promise<{ deletedCount?: number }> {
    if (!ids.length) return { deletedCount: 0 }
    return this.model.deleteMany({ _id: { $in: ids } })
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    const client: Client = await this.model
      .findById(new Types.ObjectId(id))
      .exec()
    if (!client) {
      throw new NotFoundException('This client does not exist.')
    }
    const { deletedCount } = await this.model.deleteOne({ _id: id })

    if (deletedCount && client.logo?.path) {
      await this.dropboxApi.delete([client.logo.path])
    }
    return { deletedCount }
  }

  async deleteMany(userIds: string[]): Promise<{ deletedCount?: number }> {
    const clients: Client[] = await this.model
      .find({ userId: { $in: userIds } })
      .exec()

    const images = clients.map(client => client.logo?.path).filter(p => !!p)
    const { deletedCount } = await this.model.deleteMany({
      userId: { $in: userIds },
    })
    if (deletedCount) {
      await this.dropboxApi.delete(images)
    }

    return { deletedCount }
  }

  async all(
    userIdOrSlug: string,
    visible?: boolean,
  ): Promise<Client[] | undefined> {
    const user = await this.userService.findByIdOrSlug(userIdOrSlug)

    const filter: { userId: string; visible?: boolean } = { userId: user.id }
    if (visible !== undefined) {
      filter.visible = visible
    }
    return await this.model.find(filter, null, { sort: { index: 1 } }).exec()
  }

  async uploadLogo(
    id: string,
    logo?: Image,
    newLogo?: Uploads,
  ): Promise<Image> {
    if (!newLogo) return logo
    const { createReadStream, filename, mimetype } = await newLogo.file
    const path = `/clients/${id}/logo_${
      newLogo.index
    }_${new Date().getTime()}.${filename.split('.').pop()}`

    const { success, url } = await this.dropboxApi.update(
      newLogo.prevPath,
      path,
      mimetype,
      createReadStream(),
    )

    if (success && url) {
      const _logo: Image = {
        id: logo?.id || new Types.ObjectId().toString(),
        index: newLogo.index || 0,
        url,
        path,
      }

      return _logo
    }

    return logo
  }
}
