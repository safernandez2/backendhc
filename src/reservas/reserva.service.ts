// reservas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Reserva } from './reserva.entity';
import { Habitacion } from '../habitaciones/habitacion.entity';



@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

    @InjectRepository(Habitacion)
    private readonly habitacionRepository: Repository <Habitacion>,
  ) {}

  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find({relations:['habitacion']});
  }


  async create(reserva: Reserva): Promise<Reserva> { 
    return this.reservaRepository.save(reserva);

  }


  async findById(reservaid: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: {reservaid},
      relations: ['habitacion'],
     });
  
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${reservaid} no encontrada`);
    }
  
    return reserva;
  }

  async update(reservaid: number, reserva: Reserva): Promise<Reserva> {
    await this.reservaRepository.update(reservaid, reserva);
    return this.findById(reservaid);
  }

  async delete(reservaid: number): Promise<void> {
    await this.reservaRepository.delete(reservaid);
  }
  async getFechasReservadas(habitacionid: number): Promise<{ fechaInicio: string, fechaFin: string }[]> {
    const reservas = await this.reservaRepository
      .createQueryBuilder('reserva')
      .select(['reserva.fechaInicio', 'reserva.fechaFin'])
      .where('reserva.habitacionid = :habitacionid', { habitacionid })
      .getMany();
  
    return reservas.map((reserva) => ({
      fechaInicio: reserva.fechaInicio ? new Date(reserva.fechaInicio).toISOString().split('T')[0] : '', // Verifica si fechaInicio es nula o indefinida
      fechaFin: reserva.fechaFin ? new Date(reserva.fechaFin).toISOString().split('T')[0] : '', // Verifica si fechaFin es nula o indefinida
    }));
  }

  

}
