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
import { ResumeInput } from './resume.input'
import { Resume, ResumeDocument } from './resume.dto'

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel('Resume') private readonly model: Model<ResumeDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(input: ResumeInput): Promise<Resume> {
    if (!input.userId) {
      throw new BadRequestException('userId is required for creation.')
    }

    return await new this.model({
      ...input,
      skills: input.skills || [],
      education: input.education || [],
      experience: input.experience || [],
      interests: input.interests || [],
    }).save()
  }

  async update(id: string, input: ResumeInput): Promise<Resume> {
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

  async upsert(input: ResumeInput): Promise<Resume> {
    if (input.id) {
      return await this.update(input.id, input)
    }
    return await this.create(input)
  }

  async duplicate(
    prevUserId: string,
    newUserId: string,
  ): Promise<Resume | undefined> {
    const resume = await this.model.findOne({ userId: prevUserId }).exec()

    if (!resume) return

    return await new this.model({
      ...omit(resume, ['_id', 'createdAt', 'updatedAt']),
      userId: newUserId,
    }).save()
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    return this.model.deleteOne({ _id: id })
  }

  async deleteMany(userIds: string[]): Promise<{ deletedCount?: number }> {
    return this.model.deleteMany({ userId: { $in: userIds } })
  }

  async find(
    userIdOrSlug: string,
    visible?: boolean,
  ): Promise<Resume | undefined> {
    const user = await this.userService.findByIdOrSlug(userIdOrSlug)
    const data: Resume = await this.model.findOne({ userId: user.id }).exec()
    if (visible) {
      if (data) {
        data.education = data.education
          ? data.education
              .filter(e => e.visible)
              .sort((a, b) => (a.index > b.index ? 1 : -1))
          : []
        data.skills = data.skills
          ? data.skills
              .filter(s => s.visible)
              .sort((a, b) => (a.index > b.index ? 1 : -1))
          : []
        data.experience = data.experience
          ? data.experience
              .filter(e => e.visible)
              .sort((a, b) => (a.index > b.index ? 1 : -1))
          : []
        data.interests = data.interests
          ? data.interests.sort((a, b) => (a.index > b.index ? 1 : -1))
          : []
      }
    }

    return data
  }
}
