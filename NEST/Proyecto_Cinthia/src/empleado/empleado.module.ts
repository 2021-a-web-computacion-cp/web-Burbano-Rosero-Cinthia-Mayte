import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { PrismaService } from './prisma.service';
import { EmpleadoController } from './empleado.controller';

@Module({
  imports: [],
  providers: [EmpleadoService, PrismaService],
  exports: [EmpleadoService],
  controllers: [EmpleadoController],
})
export class EmpleadoModule {}
