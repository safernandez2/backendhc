// reservas.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasController } from './reserva.controller';
import { ReservasService } from './reserva.service';
import { Reserva } from './reserva.entity';
import { EstadoReserva } from '../estadoreserva/estadoreserva.entity';
import {EstadoReservaService} from '../estadoreserva/estadoreserva.service'
import { Habitacion } from '../habitaciones/habitacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, EstadoReserva, Habitacion ])],
  controllers: [ReservasController],
  providers: [ReservasService, EstadoReservaService],
})
export class ReservasModule {}
