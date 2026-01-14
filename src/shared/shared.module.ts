import { Module, Global } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AcessKeyModule } from 'src/acessKey/acess-key.module';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AccessKeyGuard } from 'src/common/guards/userAcess.guard';

@Global()
@Module({
  imports: [
    AcessKeyModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: AccessKeyGuard
    },
  ],
})
export class SharedModule {}
