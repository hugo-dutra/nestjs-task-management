import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5665,
      username: 'root',
      password: 'had_71048170187',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
      logging: ['query', 'error']
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }


