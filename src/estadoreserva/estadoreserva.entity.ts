// estado-reserva.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Reserva } from '../reservas/reserva.entity';

@Entity('estadoreserva')
export class EstadoReserva {
  @PrimaryGeneratedColumn({ name: 'estadoreservaid' })
  estadoreservaid: number;

  @Column({ name: 'reservaid' })
  reservaid: number;

  @Column({ name: 'estado' })
  estado: string;

  @ManyToOne(() => Reserva, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reservaid' })
  reserva: Reserva;
}
