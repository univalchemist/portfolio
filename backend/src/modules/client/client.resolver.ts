import { Resolver, Mutation, Query, Args } from '@nestjs/graphql'
import { InternalServerErrorException, UseGuards } from '@nestjs/common'

import { ClientsResponse, ClientResponse } from '@modules/shared/response'
import { GqlAuth } from '@modules/auth/decorators/gql-auth.decorator'
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard'
import { AdminType } from '@modules/admin/admin.enum'

import { ClientInput } from './client.input'
import { ClientService } from './client.service'
import { Client } from './client.dto'

@Resolver()
export class ClientResolver {
  constructor(private readonly service: ClientService) {}

  @Mutation(() => ClientResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async createClient(@Args('input', { nullable: false }) input: ClientInput) {
    const res = await this.service.create(input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => ClientResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async updateClient(
    @Args('id', { nullable: false }) id: string,
    @Args('input', { nullable: false }) input: ClientInput,
  ) {
    const res = await this.service.update(id, input)
    if (!res) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => ClientsResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async upsertClients(
    @Args('input', { type: () => [ClientInput], nullable: false })
    input: ClientInput[],
  ) {
    const data: Client[] = await this.service.upsert(input)
    if (!data) {
      throw new InternalServerErrorException()
    }

    return { status: true, message: 'success', data }
  }

  @Mutation(() => ClientResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async deleteClient(@Args('id', { nullable: false }) id: string) {
    const res = await this.service.delete(id)

    return {
      status: res.deletedCount > 0,
      message: res.deletedCount > 0 ? 'success' : 'failure',
      data: null,
    }
  }

  @Query(() => ClientsResponse)
  async clients(
    @Args('userIdOrSlug', { nullable: false }) userIdOrSlug: string,
    @Args('visible', { nullable: true }) visible: boolean,
  ) {
    const data: Client[] = await this.service.all(userIdOrSlug, visible)

    return { status: true, message: 'success', data }
  }
}
