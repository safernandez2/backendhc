// reserva.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Habitacion } from '../habitaciones/habitacion.entity';  // Ajusta según la estructura de tu proyecto

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
  
  @Column({ name: 'estado', default: 'Pendiente' })  // Ajusta según tus necesidades
  estado: string;

  @Column({ name: 'numero_cliente'})
  numeroCliente: string;

  @ManyToOne(() => Habitacion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'habitacionid' })
  habitacion: Habitacion;
}
