// estado-reserva.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoReserva } from './estadoreserva.entity';
@Injectable()
export class EstadoReservaService {
  constructor(
    @InjectRepository(EstadoReserva)
    private readonly estadoReservaRepository: Repository<EstadoReserva>,
  ) {}

  async findAll(): Promise<EstadoReserva[]> {
    return this.estadoReservaRepository.find({ relations: ['reserva'] });
  }

  async findById(estadoreservaid: number): Promise<EstadoReserva> {
    const estadoReserva = await this.estadoReservaRepository.findOne({
      where: { estadoreservaid },
      relations: ['reserva'],
    });

    if (!estadoReserva) {
      throw new NotFoundException('Estado de reserva no encontrado');
    }

    return estadoReserva;
  }

  /*async create(estadoReserva: EstadoReserva): Promise<EstadoReserva> {
    return this.estadoReservaRepository.save(estadoReserva);
  }*/

  async update(estadoreservaid: number, estadoReserva: EstadoReserva): Promise<EstadoReserva> {
    await this.estadoReservaRepository.update(estadoreservaid, estadoReserva);
    return this.findById(estadoreservaid);
  }

  async delete(estadoreservaid: number): Promise<void> {
    await this.estadoReservaRepository.delete(estadoreservaid);
  }
}
