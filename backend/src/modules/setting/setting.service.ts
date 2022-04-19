/* eslint-disable @typescript-eslint/no-var-requires */
import { Model, Types } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { omit } from 'lodash'
import fs from 'fs'

import { getEnvironment } from '@modules/shared/utils'
import { SettingInput, ConfigInput } from './setting.input'
import { Setting, SettingDocument, SettingConfig } from './setting.dto'

@Injectable()
export class SettingService {
  private readonly environment: string
  constructor(
    @InjectModel('Setting') private readonly model: Model<SettingDocument>,
    private readonly configService: ConfigService,
  ) {
    this.environment = getEnvironment(this.configService.get<string>('ENV'))
  }

  async create(input: SettingInput): Promise<SettingConfig> {
    await this.model.deleteMany({})
    const setting: Setting = await new this.model({
      ...omit(input, ['config']),
    }).save()

    return { setting, config: input.config }
  }

  async update(id: string, input: SettingInput): Promise<SettingConfig> {
    const setting: Setting = await this.model
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $set: { ...omit(input, ['config']) },
        },
        { new: true, useFindAndModify: false },
      )
      .exec()

    return { setting, config: input.config }
  }

  async upsert(input: SettingInput): Promise<SettingConfig> {
    const configData: ConfigInput | undefined = input.config

    if (configData) {
      const config = require('../../config.json')
      fs.writeFileSync(
        'src/config.json',
        JSON.stringify(
          {
            ...config,
            [this.environment]: {
              ...config[this.environment],
              dropBoxToken: configData.dropBoxToken,
              telegramToken: configData.telegramToken,
            },
          },
          null,
          2,
        ),
      )
    }

    if (input.id) {
      return await this.update(input.id, input)
    }
    return await this.create(input)
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    return this.model.deleteOne({ _id: id })
  }

  async find(): Promise<SettingConfig> {
    const setting: Setting = await this.model.findOne().exec()
    const config = require('../../config.json')

    return { setting, config: config[this.environment] }
  }
}
