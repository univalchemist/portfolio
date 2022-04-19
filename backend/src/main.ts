import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { graphqlUploadExpress } from 'graphql-upload'
import { join } from 'path'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
  })
  app.use(graphqlUploadExpress())
  const configService = app.get(ConfigService)
  const port = configService.get<string>('PORT')
  app.setBaseViewsDir(join(__dirname, '..', 'src/templates'))
  app.setViewEngine('hbs')
  await app.listen(port)
}
bootstrap()
