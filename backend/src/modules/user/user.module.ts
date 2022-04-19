import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import DropboxApi from '@modules/shared/uploadFiles'
import { ClientModule } from '@modules/client/client.module'
import { FeatureModule } from '@modules/feature/feature.module'
import { PortfolioModule } from '@modules/portfolio/portfolio.module'
import { ResumeModule } from '@modules/resume/resume.module'
import { ContactModule } from '@modules/contact/contact.module'

import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { User, UserSchema } from './user.dto'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FeatureModule,
    PortfolioModule,
    ResumeModule,
    forwardRef(() => ClientModule),
    forwardRef(() => ContactModule),
  ],
  providers: [UserResolver, UserService, DropboxApi],
  exports: [UserService],
})
export class UserModule {}
