// habitaciones.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from './habitacion.entity';
import { HabitacionesController } from './habitaciones.controller';
import { HabitacionesService } from './habitaciones.service';
@Module({
  imports: [TypeOrmModule.forFeature([Habitacion, ])],
  controllers: [HabitacionesController],
  providers: [HabitacionesService],
})
export class HabitacionesModule {}
