import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import DropboxApi from '@modules/shared/uploadFiles'
import { UserModule } from '@modules/user/user.module'
import { ClientResolver } from './client.resolver'
import { ClientService } from './client.service'
import { Client, ClientSchema } from './client.dto'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [ClientResolver, ClientService, DropboxApi],
  exports: [ClientService],
})
export class ClientModule {}
