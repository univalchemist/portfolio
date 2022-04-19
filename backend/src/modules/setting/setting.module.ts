import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { SettingResolver } from './setting.resolver'
import { SettingService } from './setting.service'
import { Setting, SettingSchema } from './setting.dto'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
  ],
  providers: [SettingResolver, SettingService],
  exports: [SettingService],
})
export class SettingModule {}
