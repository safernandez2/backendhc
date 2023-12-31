// reserva.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Habitacion } from '../habitaciones/habitacion.entity';  // Ajusta según la estructura de tu proyecto
import { EstadoReserva } from '../estadoreserva/estadoreserva.entity';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn({ name: 'reservaid' })
  reservaid: number;

  @Column({ name: 'habitacionid' })
  habitacionid: number;

  @Column({ name: 'nombre_cliente' })
  nombreCliente: string;

  @Column({ name: 'correo_cliente' })
  correoCliente: string;

  @Column({ name: 'fecha_inicio', type: 'timestamp' })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'timestamp' })
  fechaFin: Date;
  
  @ManyToOne(() => Habitacion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'habitacionid' })
  habitacion: Habitacion;
}
