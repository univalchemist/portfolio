import { NestFactory } from '@nestjs/core'
import { CommandModule, CommandService } from 'nestjs-command'

import { AppModule } from './app.module'
// eslint-disable-next-line prettier/prettier
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule)
  app.select(CommandModule).get(CommandService).exec()
})()
