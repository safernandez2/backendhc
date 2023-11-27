// habitaciones.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, InternalServerErrorException, UploadedFiles, BadRequestException } from '@nestjs/common';
import { HabitacionesService } from './habitaciones.service'; // Ajusta según la estructura de tu proyecto
import { Habitacion } from './habitacion.entity'; // Ajusta según la estructura de tu proyecto
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('habitaciones')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('imagenUrl', {
      storage: diskStorage({
        destination: './uploads',  // Puedes ajustar la carpeta de destino según tu estructura de archivos
        filename: (req, file, callback) => {
          const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body() habitacion: Habitacion): Promise<Habitacion> {
    try {
      console.log('Datos recibidos en el backend:', habitacion);
      console.log('Archivo recibido:', file);

      // Resto de la lógica...

      const result = await cloudinary.uploader.upload(file.path);
      const imageUrl = result.secure_url;

      return this.habitacionesService.create(habitacion, imageUrl);
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }


  @Get()
  async getAll(): Promise<Habitacion[]> {
    return this.habitacionesService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') habitacionid: number): Promise<Habitacion> {
    return this.habitacionesService.findById(habitacionid);
  }

  @Put(':id')
  async update(@Param('id') habitacionid: number, @Body() habitacion: Habitacion): Promise<Habitacion> {
    return this.habitacionesService.update(habitacionid, habitacion);
  }

  @Delete(':id')
  async delete(@Param('id') habitacionid: number): Promise<void> {
    return this.habitacionesService.delete(habitacionid);
  }
}
