import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { TOKEN_KEY } from '@root/constants'
import { AdminService } from '@modules/admin/admin.service'
import { Admin } from '@modules/admin/admin.dto'

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TOKEN_KEY,
    })
  }

  async validate(payload: any): Promise<Admin> {
    const admin = await this.adminService.find(payload.id)
    if (!admin) {
      throw new UnauthorizedException()
    }
    return admin
  }
}
