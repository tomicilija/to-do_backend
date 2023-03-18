import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import typeOrmModuleOptions from './config/orm.config';
import { Tasks } from './entities/tasks.entity';
import { Users } from './entities/users.entity';
import { UserModule } from './modules/user/user.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature([Users, Tasks]),
    UserModule,
    TasksModule
  ],
  controllers: [AppController],
})
export class AppModule {}
