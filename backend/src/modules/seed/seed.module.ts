import { Module } from '@nestjs/common'
import { CommandModule } from 'nestjs-command'

import { AdminModule } from '@modules/admin/admin.module'
import { SeedService } from './seed.service'

@Module({
  imports: [CommandModule, AdminModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
