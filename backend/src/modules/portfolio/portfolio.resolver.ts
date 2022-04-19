import { Resolver, Mutation, Query, Args } from '@nestjs/graphql'
import { InternalServerErrorException, UseGuards } from '@nestjs/common'

import { PortfolioResponse, PortfoliosResponse } from '@modules/shared/response'
import { GqlAuth } from '@modules/auth/decorators/gql-auth.decorator'
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard'
import { AdminType } from '@modules/admin/admin.enum'

import { PortfolioInput } from './portfolio.input'
import { PortfolioService } from './portfolio.service'
import { Portfolio } from './portfolio.dto'

@Resolver()
export class PortfolioResolver {
  constructor(private readonly service: PortfolioService) {}

  @Mutation(() => PortfolioResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async createPortfolio(
    @Args('input', { nullable: false }) input: PortfolioInput,
  ) {
    const res = await this.service.create(input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => PortfolioResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async updatePortfolio(
    @Args('id', { nullable: false }) id: string,
    @Args('input', { nullable: false }) input: PortfolioInput,
  ) {
    const res = await this.service.update(id, input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => PortfoliosResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async upsertPortfolios(
    @Args('input', { type: () => [PortfolioInput], nullable: false })
    input: PortfolioInput[],
  ) {
    const data: Portfolio[] = await this.service.upsert(input)
    if (!data) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data }
  }

  @Mutation(() => PortfolioResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async deletePortfolio(@Args('id', { nullable: false }) id: string) {
    const res = await this.service.delete(id)

    return {
      status: res.deletedCount > 0,
      message: res.deletedCount > 0 ? 'success' : 'failure',
      data: null,
    }
  }

  @Mutation(() => PortfolioResponse)
  async increasePortfolioViews(@Args('id', { nullable: false }) id: string) {
    const res = await this.service.increaseViews(id)

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => PortfolioResponse)
  async increasePortfolioLikes(@Args('id', { nullable: false }) id: string) {
    const res = await this.service.increaseLikes(id)

    return { status: true, message: 'success', data: res }
  }

  @Query(() => PortfoliosResponse)
  async portfolios(
    @Args('userIdOrSlug', { nullable: false }) userIdOrSlug: string,
  ) {
    const data: Portfolio[] = await this.service.all(userIdOrSlug)

    return { status: true, message: 'success', data }
  }
}
