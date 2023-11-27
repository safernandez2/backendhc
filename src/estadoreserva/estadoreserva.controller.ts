// estado-reserva.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EstadoReservaService } from './estadoreserva.service';
import { EstadoReserva } from './estadoreserva.entity';

@Controller('estadoreserva')
export class EstadoReservaController {
  constructor(private readonly estadoReservaService: EstadoReservaService) {}

  @Get()
  async getAll(): Promise<EstadoReserva[]> {
    return this.estadoReservaService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') estadoreservaid: number): Promise<EstadoReserva> {
    return this.estadoReservaService.findById(estadoreservaid);
  }

  /*@Post('add')
  async create(@Body() estadoReserva: EstadoReserva): Promise<EstadoReserva> {
    return this.estadoReservaService.create(estadoReserva);
  }*/

  @Put('edit/:id')
  async update(
    @Param('id') estadoreservaid: number,
    @Body() estadoReserva: EstadoReserva,
  ): Promise<EstadoReserva> {
    return this.estadoReservaService.update(estadoreservaid, estadoReserva);
  }

  @Delete('delete/:id')
  async delete(@Param('id') estadoreservaid: number): Promise<void> {
    return this.estadoReservaService.delete(estadoreservaid);
  }
}
