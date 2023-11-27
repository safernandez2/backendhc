// estado-reserva.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoReservaController } from './estadoreserva.controller'; 
import { EstadoReservaService } from './estadoreserva.service'; 
import { EstadoReserva } from './estadoreserva.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([EstadoReserva])],
  controllers: [EstadoReservaController],
  providers: [EstadoReservaService],
})
export class EstadoReservaModule {}
