// habitaciones.service.ts
import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from './habitacion.entity';
@Injectable()
export class HabitacionesService {
  constructor(
    @InjectRepository(Habitacion)
    private habitacionRepository: Repository<Habitacion>,
   
  ) {}

  async findAll(): Promise<Habitacion[]> {
    return this.habitacionRepository.find();
  }

  async findById(habitacionid: number): Promise<Habitacion> {
    const habitacion = await this.habitacionRepository.findOne({
        where: { habitacionid: habitacionid} as Partial<Habitacion>,
        });
    if (!habitacion) {
      throw new NotFoundException('Habitación no encontrada');
    }
    return habitacion;
  }

  async create(habitacion: Habitacion, imagenUrl: string): Promise<Habitacion> {
    habitacion.imagenUrl= imagenUrl;
    return this.habitacionRepository.save(habitacion);
  }

  async update(habitacionid: number, habitacion: Habitacion): Promise<Habitacion> {
    await this.habitacionRepository.update(habitacionid, habitacion);
    return this.findById(habitacionid);
  }
  
  
  
  


  async delete(habitacionid: number): Promise<void> {
    const habitacion = await this.findById(habitacionid);
    await this.habitacionRepository.remove(habitacion);
  }

}