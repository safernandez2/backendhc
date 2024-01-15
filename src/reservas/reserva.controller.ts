// reserva.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ReservasService } from './reserva.service';
import { Reserva } from './reserva.entity'; // Ajusta según la estructura de tu proyecto

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get()
  async getAll(): Promise<Reserva[]> {
    return this.reservasService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') reservaid: number): Promise<Reserva> {
    return this.reservasService.findById(reservaid);
  }
  @Get('fechasReservadas/:habitacionid')
  async getFechasReservadas(@Param('habitacionid') habitacionid: number): Promise<{ fechaInicio: string, fechaFin: string }[]> {
    return this.reservasService.getFechasReservadas(habitacionid);
  }

  @Post()
  async create(@Body() reserva: Reserva): Promise<Reserva> {
    return this.reservasService.create(reserva);
  }

  @Put(':id')
  async update(@Param('id') reservaid: number, @Body() reserva: Reserva): Promise<Reserva> {
    return this.reservasService.update(reservaid, reserva);
  }

  @Delete(':id')
  async delete(@Param('id') reservaid: number): Promise<void> {
    return this.reservasService.delete(reservaid);
  }
  

}
