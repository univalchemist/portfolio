import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

import { TOKEN_KEY } from '@root/constants'
import { AdminService } from '@modules/admin/admin.service'
import { Admin } from '@modules/admin/admin.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const admin = await this.adminService.findByEmail(email)
    if (admin) {
      const { password } = admin
      const verify = await compare(pass, password)
      if (verify) {
        return admin
      }
    }
    return null
  }

  async createAccessToken(admin: any) {
    const payload = { email: admin.email, id: admin.id }

    return this.jwtService.sign(payload)
  }

  async getAdminUserFromToken(token: string): Promise<Admin | undefined> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: TOKEN_KEY,
      })
      return await this.adminService.find(payload.id)
    } catch (e) {
      return
    }
  }
}
