import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ContactModule } from '@modules/contact/contact.module'
import { AdminModule } from '@modules/admin/admin.module'
import { BotService } from './telegramBot.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    forwardRef(() => ContactModule),
    forwardRef(() => AdminModule),
  ],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
