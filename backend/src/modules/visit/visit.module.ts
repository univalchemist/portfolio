import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from '@modules/user/user.module'
import { AdminModule } from '@modules/admin/admin.module'
import { VisitResolver } from './visit.resolver'
import { VisitService } from './visit.service'
import { Visit, VisitSchema } from './visit.dto'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Visit.name, schema: VisitSchema }]),
    UserModule,
    AdminModule,
  ],
  providers: [VisitResolver, VisitService],
  exports: [VisitService],
})
export class VisitModule {}
