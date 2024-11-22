import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Discoteca } from 'src/discotecas/entities/discoteca.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    @InjectRepository(Discoteca)
    private readonly discoetcaRepository: Repository<Discoteca>
  ) {}

  async create(createEventoDto: CreateEventoDto) {
    try {

      const {discotecaId, ...eventoData} = createEventoDto;

      const discoteca = await this.discoetcaRepository.findOneBy({id: discotecaId})

      if(!discoteca){
        throw new NotFoundException(`Discoteca con ID ${discotecaId} no encontrado`);
      }

      const evento = this.eventoRepository.create({...eventoData, discoteca});
      return await this.eventoRepository.save(evento);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.eventoRepository.find({relations: ['discoteca']});
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    const evento = await this.eventoRepository.findOneBy({ id });
    
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
    return evento;
  }

  async update(id: string, updateEventoDto: UpdateEventoDto) {
    const evento = await this.eventoRepository.preload({
      id,
      ...updateEventoDto,
    });

    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }

    return await this.eventoRepository.save(evento);
  }

  async remove(id: string) {
    const evento = await this.findOne(id);
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
    return await this.eventoRepository.remove(evento);
  }
}
