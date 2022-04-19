import { Resolver, Mutation, Query, Args } from '@nestjs/graphql'
import { InternalServerErrorException, UseGuards } from '@nestjs/common'

import { ResumeResponse } from '@modules/shared/response'
import { GqlAuth } from '@modules/auth/decorators/gql-auth.decorator'
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard'
import { AdminType } from '@modules/admin/admin.enum'

import { ResumeInput } from './resume.input'
import { ResumeService } from './resume.service'
import { Resume } from './resume.dto'

@Resolver()
export class ResumeResolver {
  constructor(private readonly service: ResumeService) {}

  @Mutation(() => ResumeResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async createResume(@Args('input', { nullable: false }) input: ResumeInput) {
    const res = await this.service.create(input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => ResumeResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async updateResume(
    @Args('id', { nullable: false }) id: string,
    @Args('input', { nullable: false }) input: ResumeInput,
  ) {
    const res = await this.service.update(id, input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => ResumeResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async upsertResume(@Args('input', { nullable: false }) input: ResumeInput) {
    const res = await this.service.upsert(input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => ResumeResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async deleteResume(@Args('id', { nullable: false }) id: string) {
    const res = await this.service.delete(id)

    return {
      status: res.deletedCount > 0,
      message: res.deletedCount > 0 ? 'success' : 'failure',
      data: null,
    }
  }

  @Query(() => ResumeResponse)
  async resume(
    @Args('userIdOrSlug', { nullable: false }) userIdOrSlug: string,
    @Args('visible', { nullable: true }) visible: boolean,
  ) {
    const data: Resume = await this.service.find(userIdOrSlug, visible)

    return { status: true, message: 'success', data }
  }
}
