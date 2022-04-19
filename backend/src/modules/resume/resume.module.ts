import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from '@modules/user/user.module'
import { ResumeResolver } from './resume.resolver'
import { ResumeService } from './resume.service'
import { Resume, ResumeSchema } from './resume.dto'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [ResumeResolver, ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
