import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [PrismaModule, AuthModule, TasksModule],
})
export class AppModule {}
