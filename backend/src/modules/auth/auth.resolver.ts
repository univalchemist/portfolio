import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UnauthorizedException, BadRequestException } from '@nestjs/common'

import { SignInResponse } from '@modules/shared/response'
import { Admin } from '@modules/admin/admin.dto'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  async signIn(
    @Args('email', { nullable: true }) email: string,
    @Args('password', { nullable: true }) password: string,
    @Args('accessToken', { nullable: true }) accessToken: string,
  ) {
    let admin: Admin | undefined = undefined
    if (accessToken) {
      admin = await this.authService.getAdminUserFromToken(
        accessToken.replace('Bearer ', ''),
      )
    } else {
      if (!email || !password) {
        throw new BadRequestException('Email and Password is required.')
      }
      admin = await this.authService.signIn(email, password)
    }
    if (!admin) {
      throw new UnauthorizedException()
    }

    const _accessToken = await this.authService.createAccessToken(admin)
    return {
      status: true,
      message: 'Sign in success',
      data: { accessToken: _accessToken, admin },
    }
  }
}
