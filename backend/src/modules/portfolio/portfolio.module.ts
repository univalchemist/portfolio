import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import DropboxApi from '@modules/shared/uploadFiles'
import { UserModule } from '@modules/user/user.module'
import { PortfolioResolver } from './portfolio.resolver'
import { PortfolioService } from './portfolio.service'
import { Portfolio, PortfolioSchema } from './portfolio.dto'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Portfolio.name, schema: PortfolioSchema },
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [PortfolioResolver, PortfolioService, DropboxApi],
  exports: [PortfolioService],
})
export class PortfolioModule {}
