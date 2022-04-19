import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PubSub } from 'graphql-subscriptions'

import { AdminModule } from '@modules/admin/admin.module'
import { UserModule } from '@modules/user/user.module'
import { BotModule } from '@modules/telegramBot/telegramBot.module'

import { ContactResolver } from './contact.resolver'
import { ContactService } from './contact.service'
import { Contact, ContactSchema } from './contact.dto'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => BotModule),
    forwardRef(() => AdminModule),
  ],
  providers: [
    ContactResolver,
    ContactService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [ContactService],
})
export class ContactModule {}
