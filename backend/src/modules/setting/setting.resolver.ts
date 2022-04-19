import { Resolver, Mutation, Query, Args } from '@nestjs/graphql'
import { InternalServerErrorException, UseGuards } from '@nestjs/common'

import { SettingResponse } from '@modules/shared/response'
import { GqlAuth } from '@modules/auth/decorators/gql-auth.decorator'
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard'
import { AdminType } from '@modules/admin/admin.enum'

import { SettingInput } from './setting.input'
import { SettingService } from './setting.service'
import { SettingConfig } from './setting.dto'

@Resolver()
export class SettingResolver {
  constructor(private readonly service: SettingService) {}

  @Mutation(() => SettingResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async createSetting(@Args('input', { nullable: false }) input: SettingInput) {
    const res: SettingConfig = await this.service.create(input)
    if (!res) {
      throw new InternalServerErrorException()
    }
    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => SettingResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async updateSetting(
    @Args('id', { nullable: false }) id: string,
    @Args('input', { nullable: false }) input: SettingInput,
  ) {
    const res: SettingConfig = await this.service.update(id, input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => SettingResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async upsertSetting(@Args('input', { nullable: false }) input: SettingInput) {
    const res: SettingConfig = await this.service.upsert(input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => SettingResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async deleteSetting(@Args('id', { nullable: false }) id: string) {
    const res = await this.service.delete(id)

    return {
      status: res.deletedCount > 0,
      message: res.deletedCount > 0 ? 'success' : 'failure',
      data: null,
    }
  }

  @Query(() => SettingResponse)
  async setting() {
    const data: SettingConfig = await this.service.find()

    return { status: true, message: 'success', data }
  }
}
