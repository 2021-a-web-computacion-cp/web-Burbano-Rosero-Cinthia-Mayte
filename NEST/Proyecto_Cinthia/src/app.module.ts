import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './empleado/prisma.service';
import { EmpleadoModule } from './empleado/empleado.module';

@Module({
  imports: [EmpleadoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [AppService],
})
export class AppModule {}
