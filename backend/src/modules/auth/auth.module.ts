import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { TOKEN_KEY } from '@root/constants'
import { AdminModule } from '@modules/admin/admin.module'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { AuthJwtStrategy } from './auth.jwt.strategy'

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: TOKEN_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, AuthResolver, AuthJwtStrategy],
})
export class AuthModule {}
