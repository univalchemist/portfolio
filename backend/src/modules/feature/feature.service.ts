import { Model, Types } from 'mongoose'
import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { omit } from 'lodash'

import { UserService } from '@modules/user/user.service'
import { FeatureInput } from './feature.input'
import { Feature, FeatureDocument } from './feature.dto'

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel('Feature') private readonly model: Model<FeatureDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(input: FeatureInput): Promise<Feature> {
    if (!input.userId) {
      throw new BadRequestException('userId is required for creation.')
    }

    return await new this.model(input).save()
  }

  async update(id: string, input: FeatureInput): Promise<Feature> {
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

  async upsert(input: FeatureInput[]): Promise<Feature[]> {
    const removedFeatures: string[] = input
      .filter(d => d.index < 0)
      .map(d => d.id)
      .filter(d => !!d)

    const features = await Promise.all(
      input
        .filter(d => d.index >= 0)
        .map(async (_input: FeatureInput) => {
          if (_input.id) {
            return await this.update(_input.id, _input)
          }
          return await this.create(_input)
        }),
    )

    this.deleteClients(removedFeatures)
    return features
  }

  async duplicate(prevUserId: string, newUserId: string): Promise<Feature[]> {
    const features: Feature[] = await this.model
      .find({ userId: prevUserId })
      .exec()

    if (!features.length) return []

    const newFeatures: Partial<Feature>[] = features.map(
      (feature: Feature) => ({
        ...omit(feature, ['_id', 'createdAt', 'updatedAt']),
        userId: newUserId,
      }),
    )

    return await this.model.insertMany(newFeatures)
  }

  async deleteClients(ids: string[]): Promise<{ deletedCount?: number }> {
    if (!ids.length) return { deletedCount: 0 }
    return this.model.deleteMany({ _id: { $in: ids } })
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    return this.model.deleteOne({ _id: id })
  }

  async deleteMany(userIds: string[]): Promise<{ deletedCount?: number }> {
    return this.model.deleteMany({ userId: { $in: userIds } })
  }

  async all(userIdOrSlug: string): Promise<Feature[] | undefined> {
    const user = await this.userService.findByIdOrSlug(userIdOrSlug)
    return await this.model
      .find({ userId: user.id }, null, { sort: { updatedAt: 1 } })
      .exec()
  }
}
