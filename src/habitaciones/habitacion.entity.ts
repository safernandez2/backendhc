// habitacion.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('habitaciones')
export class Habitacion {
  @PrimaryGeneratedColumn({ name: 'habitacionid' })
  habitacionid: number;

  @Column({ name: 'nombre_habitacion' })
  nombreHabitacion: string;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'capacidad' })
  capacidad: number;

  @Column({default: false})
  disponible: boolean;

  @Column({name:'imagen_url', nullable:true,type: 'text'})
  imagenUrl:string | null;
}
