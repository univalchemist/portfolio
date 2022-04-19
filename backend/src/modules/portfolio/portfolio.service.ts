import { Model, Types } from 'mongoose'
import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { omit } from 'lodash'

import { UserService } from '@modules/user/user.service'
import DropboxApi from '@modules/shared/uploadFiles'
import { Image, Uploads } from '@modules/shared/types'

import { PortfolioInput } from './portfolio.input'
import { Portfolio, PortfolioDocument } from './portfolio.dto'

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel('Portfolio') private readonly model: Model<PortfolioDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private dropboxApi: DropboxApi,
  ) {}

  async create(input: PortfolioInput): Promise<Portfolio> {
    const id = new Types.ObjectId()

    const images: Image[] = await this.uploadImages(
      id.toString(),
      [],
      (input.newImages || []).filter(img => !!img.file),
    )

    return await new this.model({
      ...omit(input, ['id', 'images', 'newImages']),
      id,
      like: input.like || 0,
      view: input.view || 0,
      images,
    }).save()
  }

  async update(id: string, input: PortfolioInput): Promise<Portfolio> {
    const portfolio: Portfolio = await this.model
      .findById(new Types.ObjectId(id))
      .exec()
    if (!portfolio) {
      throw new NotFoundException('This portfolio does not exist.')
    }

    const images: Image[] = (input.images || []).filter(img => img.index >= 0)

    const _images: Image[] = await this.uploadImages(
      id,
      images,
      (input.newImages || []).filter(img => !!img.file),
    )

    return await this.model
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $set: {
            ...omit(input, ['id', 'images', 'newImages']),
            images: _images,
          },
        },
        { new: true, useFindAndModify: false },
      )
      .exec()
  }

  async upsert(input: PortfolioInput[]): Promise<Portfolio[]> {
    const removedPortfolios: string[] = input
      .filter(d => d.index < 0)
      .map(d => d.id)
      .filter(d => !!d)
    const removedImages: string[] = []

    input.forEach(d => {
      ;(d.newImages || []).forEach((img: Uploads) => {
        if (img.prevPath) {
          removedImages.push(img.prevPath)
        }
      })
    })

    const portfolios = await Promise.all(
      input
        .filter(d => d.index >= 0)
        .map(async (_input: PortfolioInput) => {
          if (_input.id) {
            return await this.update(_input.id, _input)
          }
          return await this.create(_input)
        }),
    )

    this.deletePortfolios(removedPortfolios)
    this.dropboxApi.delete(removedImages)

    return portfolios
  }

  async increaseViews(id: string): Promise<Portfolio> {
    let portfolio: Portfolio = await this.model
      .findById(new Types.ObjectId(id))
      .exec()

    if (portfolio) {
      portfolio = await this.model
        .findByIdAndUpdate(
          portfolio.id,
          {
            $set: { view: (portfolio.view || 0) + 1 },
          },
          { new: true, useFindAndModify: false },
        )
        .exec()
    }

    return portfolio
  }

  async increaseLikes(id: string): Promise<Portfolio> {
    let portfolio: Portfolio = await this.model
      .findById(new Types.ObjectId(id))
      .exec()

    if (portfolio) {
      portfolio = await this.model
        .findByIdAndUpdate(
          portfolio.id,
          {
            $set: { like: (portfolio.like || 0) + 1 },
          },
          { new: true, useFindAndModify: false },
        )
        .exec()
    }

    return portfolio
  }

  async duplicate(prevUserId: string, newUserId: string): Promise<Portfolio[]> {
    const portfolios: Portfolio[] = await this.model
      .find({ userId: prevUserId })
      .exec()

    if (!portfolios.length) return []

    const newPortfolios: Partial<Portfolio>[] = portfolios.map(
      (portfolio: Portfolio) => ({
        ...omit(portfolio, ['_id', 'createdAt', 'updatedAt']),
        images: [],
        userId: newUserId,
      }),
    )

    return await this.model.insertMany(newPortfolios)
  }

  async deletePortfolios(ids: string[]): Promise<{ deletedCount?: number }> {
    if (!ids.length) return { deletedCount: 0 }
    return this.model.deleteMany({ _id: { $in: ids } })
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    const portfolio: Portfolio = await this.model
      .findById(new Types.ObjectId(id))
      .exec()
    if (!portfolio) {
      throw new NotFoundException('This portfolio does not exist.')
    }
    const paths: string[] = portfolio.images.map((image: Image) => image.path)

    await this.dropboxApi.delete(paths)

    return this.model.deleteOne({ _id: id })
  }

  async deleteMany(userIds: string[]): Promise<{ deletedCount?: number }> {
    const portfolios: Portfolio[] = await this.model
      .find({ userId: { $in: userIds } })
      .exec()

    const paths: string[] = []

    portfolios.forEach((portfolio: Portfolio) => {
      portfolio.images.forEach((image: Image) => {
        paths.push(image.path)
      })
    })

    const { deletedCount } = await this.model.deleteMany({
      userId: { $in: userIds },
    })

    if (deletedCount) {
      await this.dropboxApi.delete(paths)
    }

    return { deletedCount }
  }

  async uploadImages(
    id: string,
    images: Image[],
    newImages?: Uploads[],
  ): Promise<Image[]> {
    if (!newImages?.length) return images
    const _newImages: Image[] = [...images]
    await Promise.all(
      newImages.map(async img => {
        const { createReadStream, filename, mimetype } = await img.file

        if (mimetype.includes('image')) {
          const path = `/portfolios/${id}/portfolio_${
            img.index
          }_${new Date().getTime()}.${filename.split('.').pop()}`
          const { success, url } = await this.dropboxApi.upload(
            path,
            createReadStream(),
          )

          if (success && url) {
            _newImages.push({
              id: img.id || new Types.ObjectId().toString(),
              index: img.index || 0,
              url,
              path,
            })
          }
        }
      }),
    )

    return _newImages
  }

  async all(userIdOrSlug: string): Promise<Portfolio[] | undefined> {
    const user = await this.userService.findByIdOrSlug(userIdOrSlug)
    return await this.model
      .find({ userId: user.id }, null, { sort: { index: 1 } })
      .exec()
  }
}
