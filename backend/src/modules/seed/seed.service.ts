import { Command, Positional } from 'nestjs-command'
import { Injectable, Logger } from '@nestjs/common'

import { AdminService } from '@modules/admin/admin.service'
import { AdminType } from '@modules/admin/admin.enum'

@Injectable()
export class SeedService {
  constructor(private readonly adminService: AdminService) {}

  private readonly logger = new Logger(SeedService.name)

  @Command({
    command: 'create:admin <email> <password> <type>',
    describe: 'create a admin user',
  })
  async create(
    @Positional({
      name: 'email',
      describe: 'User Email',
      type: 'string',
    })
    email: string,
    @Positional({
      name: 'password',
      describe: 'User Password',
      type: 'string',
    })
    password: string,
    @Positional({
      name: 'type',
      describe: 'SuperAdmin or Admin(default Admin user)',
      type: 'string',
    })
    type: AdminType,
  ) {
    const data = { email, password, type }
    const admin = await this.adminService.findByEmail(email)
    if (admin) {
      this.logger.log(
        `Creating Admin failed. Admin(${admin.email}) already exists.`,
      )

      return
    }
    const _admin = await this.adminService.create(data)
    this.logger.log(`Admin(${_admin.email}) has been created.`)
  }
}
