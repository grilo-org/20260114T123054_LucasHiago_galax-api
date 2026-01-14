import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './service/users.service';
import { UsersController } from './controllers/users.controller';
import { AcessKeyModule } from 'src/acessKey/acess-key.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  forwardRef(() => AcessKeyModule)
],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
