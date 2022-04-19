import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from '@modules/user/user.module'
import { FeatureResolver } from './feature.resolver'
import { FeatureService } from './feature.service'
import { Feature, FeatureSchema } from './feature.dto'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feature.name, schema: FeatureSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [FeatureResolver, FeatureService],
  exports: [FeatureService],
})
export class FeatureModule {}
