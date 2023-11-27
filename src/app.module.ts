import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitacionesModule } from './habitaciones/habitaciones.module';  // Ajusta según la estructura de tu proyecto
import { Habitacion } from './habitaciones/habitacion.entity';
import { ReservasModule } from './reservas/reserva.module';
import { Reserva } from './reservas/reserva.entity';
import { EstadoReservaModule } from './estadoreserva/estadoreserva.module';
import { EstadoReserva } from './estadoreserva/estadoreserva.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'hosteriacap',
      entities: [Habitacion, Reserva, EstadoReserva],
      synchronize: false,
    }),
    HabitacionesModule, 
    ReservasModule,
    EstadoReservaModule,
     // Ajusta según la estructura de tu proyecto
  ],
  
})
export class AppModule {}
