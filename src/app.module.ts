import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AcessKeyModule } from './acessKey/acess-key.module';
import { PaymentsModule } from './payments/payments.module';
//import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AcessKeyModule,
    PaymentsModule
    //SharedModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
