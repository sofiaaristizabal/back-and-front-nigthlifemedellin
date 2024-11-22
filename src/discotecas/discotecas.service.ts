import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateDiscotecaDto } from './dto/create-discoteca.dto';
import { UpdateDiscotecaDto } from './dto/update-discoteca.dto';
import { Discoteca } from './entities/discoteca.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LoginDiscotecaDto } from './dto/loginDiscoteca-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DiscotecasService {

  constructor(@InjectRepository(Discoteca) 
  private readonly discotecasRepository: Repository<Discoteca>
  )
  {}

  async create(createDiscotecaDto: CreateDiscotecaDto) {

    try{

    const discoteca = this.discotecasRepository.create(createDiscotecaDto) 
    discoteca.password = await bcrypt.hash(discoteca.password, 10);
    await this.discotecasRepository.save(discoteca)
    return discoteca;
    }catch (err){
      console.log(err);
      throw new BadRequestException(err.detail);
    }
    
  }

  async findAll() {

    const discotecas = await this.discotecasRepository.find({})
    return discotecas;
  }

  async findOne(id: string) {
    const discoteca = await this.discotecasRepository.findOne({where:{id}})
    if(!discoteca){
      throw new NotFoundException (`the discoteca with id #${id} was not found `)
    }
    return discoteca;
  }

  async findDiscoteca(fullName: string) {
    const discoteca = await this.discotecasRepository.findOne({where: {fullName},});
    
    if(!discoteca){
      throw new NotFoundException (`the discoteca with id #${fullName} was not found `)
    }
    return discoteca;
  }

  async update(id: string, updateDiscotecaDto: UpdateDiscotecaDto) {
    
    const discoteca = await this.discotecasRepository.preload({id:id,...updateDiscotecaDto})
    await this.discotecasRepository.save(discoteca);
    if(!discoteca){
      throw new NotFoundException (`the discoteca with id #${id} was not found `)
    }
    return discoteca;
  }

  async remove(id: string) {
    
    const discoteca = await this.discotecasRepository.delete({id:id});
    return discoteca;
  }

  async login (loginDiscotecaDto: LoginDiscotecaDto){

    try {
      const {email, password} = loginDiscotecaDto;
      const discoteca = await this.discotecasRepository.findOneBy({email})
      if(!discoteca){
        throw new UnauthorizedException('Invalid credentials');
      }

      const isValid = bcrypt.compareSync(password, discoteca.password);
      if(!isValid){
        throw new UnauthorizedException('Invalid credentials')
      }

      const {fullName, id} = discoteca;
      //const jwt = this.jwtService.sign({email, fullName});
      return {discoetca: {fullName, email, id}};
    } catch(err){
      console.log(err);
      throw new UnauthorizedException(err.detail);
    }
  }
}
