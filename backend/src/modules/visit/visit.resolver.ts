import { Resolver, Mutation, Query, Args } from '@nestjs/graphql'
import { InternalServerErrorException, UseGuards } from '@nestjs/common'
import { AdminType } from '@modules/admin/admin.enum'
import { VisitResponse, VisitsResponse } from '@modules/shared/response'
import { GqlAuth } from '@modules/auth/decorators/gql-auth.decorator'
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard'

import { VisitInput } from './visit.input'
import { VisitService } from './visit.service'
import { Visit } from './visit.dto'

@Resolver()
export class VisitResolver {
  constructor(private readonly service: VisitService) {}

  @Mutation(() => VisitResponse)
  async createVisit(@Args('input', { nullable: false }) input: VisitInput) {
    const data = await this.service.create(input)
    if (!data) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data }
  }

  @Mutation(() => VisitResponse, {
    description: 'Delete users who does not belong to any admin.',
  })
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async deleteVisits(
    @Args('ids', { type: () => [String], nullable: true }) ids?: string[],
  ) {
    const res = await this.service.delete(ids)

    return {
      status: res.deletedCount > 0,
      message: res.deletedCount > 0 ? 'success' : 'failure',
      data: null,
    }
  }

  @Query(() => VisitsResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async visits(
    @Args('createdBy', { nullable: true }) createdBy?: string,
    @Args('userId', { nullable: true }) userId?: string,
    @Args('dateRange', { type: () => [String], nullable: true })
    dateRange?: string[],
  ) {
    const data: Visit[] = await this.service.all(createdBy, userId, dateRange)

    return { status: true, message: 'success', data }
  }
}
