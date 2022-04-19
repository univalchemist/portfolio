import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthModule } from '@modules/auth/auth.module'
import { SeedModule } from '@modules/seed/seed.module'
import { UserModule } from '@modules/user/user.module'
import { FeatureModule } from '@modules/feature/feature.module'
import { PortfolioModule } from '@modules/portfolio/portfolio.module'
import { ResumeModule } from '@modules/resume/resume.module'
import { ClientModule } from '@modules/client/client.module'
import { SettingModule } from '@modules/setting/setting.module'
import { ContactModule } from '@modules/contact/contact.module'
import { VisitModule } from '@modules/visit/visit.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      cors: {
        origin: true,
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders:
          'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_HOST_URL'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    FeatureModule,
    PortfolioModule,
    ResumeModule,
    SeedModule,
    ClientModule,
    SettingModule,
    ContactModule,
    VisitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
