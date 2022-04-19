import { Resolver, Mutation, Query, Args } from '@nestjs/graphql'
import { InternalServerErrorException, UseGuards } from '@nestjs/common'

import { FeaturesResponse, FeatureResponse } from '@modules/shared/response'
import { GqlAuth } from '@modules/auth/decorators/gql-auth.decorator'
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard'
import { AdminType } from '@modules/admin/admin.enum'

import { FeatureInput } from './feature.input'
import { FeatureService } from './feature.service'
import { Feature } from './feature.dto'

@Resolver()
export class FeatureResolver {
  constructor(private readonly service: FeatureService) {}

  @Mutation(() => FeatureResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async createFeature(@Args('input', { nullable: false }) input: FeatureInput) {
    const res = await this.service.create(input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => FeatureResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async updateFeature(
    @Args('id', { nullable: false }) id: string,
    @Args('input', { nullable: false }) input: FeatureInput,
  ) {
    const res = await this.service.update(id, input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => FeaturesResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async upsertFeatures(
    @Args('input', { type: () => [FeatureInput], nullable: false })
    input: FeatureInput[],
  ) {
    const data: Feature[] = await this.service.upsert(input)
    if (!data) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data }
  }

  @Mutation(() => FeatureResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async deleteFeature(@Args('id', { nullable: false }) id: string) {
    const res = await this.service.delete(id)

    return {
      status: res.deletedCount > 0,
      message: res.deletedCount > 0 ? 'success' : 'failure',
      data: null,
    }
  }

  @Query(() => FeaturesResponse)
  async features(
    @Args('userIdOrSlug', { nullable: false }) userIdOrSlug: string,
  ) {
    const data: Feature[] = await this.service.all(userIdOrSlug)

    return { status: true, message: 'success', data }
  }
}
