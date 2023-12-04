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

  async update(habitacionid: number, habitacionData: Habitacion): Promise<Habitacion> {
    try {
      // Cargar la entidad actual antes de la actualización
      const habitacion = await this.findById(habitacionid);
  
      if (!habitacion) {
        throw new NotFoundException('Habitación no encontrada');
      }
  
      // Actualizar solo las propiedades necesarias de la habitación
      Object.assign(habitacion, habitacionData);
  
      // Guardar la entidad actualizada en la base de datos
      await this.habitacionRepository.save(habitacion);
  
      // Devolver la entidad actualizada
      return habitacion;
    } catch (error) {
      console.error('Error al actualizar la habitación en la base de datos:', error);
      throw new InternalServerErrorException('Error interno del servidor al actualizar la habitación');
    }
  }
  

  
  
  
  


  async delete(habitacionid: number): Promise<void> {
    const habitacion = await this.findById(habitacionid);
    await this.habitacionRepository.remove(habitacion);
  }

}