import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSub } from 'graphql-subscriptions'

import { UserModule } from '@modules/user/user.module'
import { AdminResolver } from './admin.resolver'
import { AdminService } from './admin.service'
import { Admin, AdminSchema } from './admin.dto'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    UserModule,
  ],
  providers: [
    AdminResolver,
    AdminService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [AdminService],
})
export class AdminModule {}
