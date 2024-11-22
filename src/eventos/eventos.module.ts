import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { Discoteca } from 'src/discotecas/entities/discoteca.entity';
import { DiscotecasService } from 'src/discotecas/discotecas.service';
import { DiscotecasModule } from 'src/discotecas/discotecas.module';
@Module({
  controllers: [EventosController],
  providers: [EventosService, DiscotecasService],
  imports:[TypeOrmModule.forFeature([Evento, Discoteca]), DiscotecasModule],
  exports:[]
})
export class EventosModule {}
