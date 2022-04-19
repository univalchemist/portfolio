import { Resolver, Mutation, Query, Args } from '@nestjs/graphql'
import {
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'

import { Admin } from '@modules/admin/admin.dto'
import { AdminType } from '@modules/admin/admin.enum'
import { UserResponse, UsersResponse } from '@modules/shared/response'
import { Uploads } from '@modules/shared/types'
import { GqlAuth } from '@modules/auth/decorators/gql-auth.decorator'
import { GqlCurrentAdminUser } from '@modules/auth/decorators/gql-current-admin-user.decorator'
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard'

import { UserInput } from './user.input'
import { UserService } from './user.service'
import { User } from './user.dto'

@Resolver()
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Mutation(() => UserResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async createUser(
    @GqlCurrentAdminUser() admin: Admin,
    @Args('input', { nullable: false }) input: UserInput,
    @Args('avatar', { type: () => Uploads, nullable: true })
    avatar?: Uploads,
    @Args('backgroundImages', { type: () => [Uploads], nullable: true })
    backgroundImages?: Uploads[],
  ) {
    let data = await this.service.create(input, admin)
    if (!data) {
      throw new InternalServerErrorException()
    }
    if (avatar) {
      data = await this.service.updateAvatar(data.id, avatar)
    }

    if (backgroundImages?.length) {
      data = await this.service.updateBackgroundImages(
        data.id,
        backgroundImages,
      )
    }

    return { status: true, message: 'success', data }
  }

  @Mutation(() => UserResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async updateUser(
    @GqlCurrentAdminUser() admin: Admin,
    @Args('id', { nullable: false }) id: string,
    @Args('input', { nullable: false }) input: UserInput,
    @Args('avatar', { type: () => Uploads, nullable: true })
    avatar?: Uploads,
    @Args('backgroundImages', { type: () => [Uploads], nullable: true })
    backgroundImages?: Uploads[],
  ) {
    let data = await this.service.update(id, input, admin)
    if (!data) {
      throw new InternalServerErrorException()
    }
    if (avatar) {
      data = await this.service.updateAvatar(id, avatar)
    }

    if (backgroundImages?.length) {
      data = await this.service.updateBackgroundImages(
        data.id,
        backgroundImages,
      )
    }

    return { status: true, message: 'success', data }
  }

  @Mutation(() => UserResponse)
  @UseGuards(GqlAuthGuard)
  async updateAvatar(
    @Args('id', { nullable: false }) id: string,
    @Args('avatar', { type: () => Uploads, nullable: false })
    avatar: Uploads,
  ) {
    const res = await this.service.updateAvatar(id, avatar)

    return { status: true, message: 'success', data: res }
  }

  @Mutation(() => UserResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async duplicateUser(
    @GqlCurrentAdminUser() admin: Admin,
    @Args('id', { nullable: false }) id: string,
  ) {
    const data = await this.service.duplicate(id, admin)

    return { status: true, message: 'success', data }
  }

  @Mutation(() => UserResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async deleteUser(
    @GqlCurrentAdminUser() admin: Admin,
    @Args('id', { nullable: false }) id: string,
  ) {
    const res = await this.service.delete(id, admin)

    return {
      status: res.deletedCount > 0,
      message: res.deletedCount > 0 ? 'success' : 'failure',
      data: null,
    }
  }

  @Mutation(() => UserResponse, {
    description: 'Delete users who does not belong to any admin.',
  })
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin)
  async deleteFreeUsers() {
    const res = await this.service.deleteFree()

    return {
      status: res.deletedCount > 0,
      message: res.deletedCount > 0 ? 'success' : 'failure',
      data: null,
    }
  }

  @Query(() => UsersResponse)
  @UseGuards(GqlAuthGuard)
  @GqlAuth(AdminType.SuperAdmin, AdminType.Admin)
  async users(@Args('createdBy', { nullable: true }) createdBy: string) {
    const data: User[] = await this.service.all(createdBy)

    return { status: true, message: 'success', data }
  }

  @Query(() => UserResponse)
  async user(@Args('idOrSlug', { type: () => String }) idOrSlug: string) {
    const data: User = await this.service.findByIdOrSlug(idOrSlug)
    if (!data) {
      throw new NotFoundException()
    }

    return { status: true, message: 'success', data }
  }
}
