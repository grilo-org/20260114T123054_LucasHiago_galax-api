import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKey } from './entities/acessKey.entity';
import { AccessKeyService } from './service/acessKey.service';
import { AcessKeyController } from './controller/acessKey.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey]),
  forwardRef(() => UsersModule)
],
  providers: [AccessKeyService],
  exports: [AccessKeyService],
  controllers: [AcessKeyController]
})
export class AcessKeyModule {}
