import { IsString, IsNotEmpty, IsDateString, IsNumberString } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  hora: string;

  @IsNumberString()
  @IsNotEmpty()
  cover: string;

  @IsString()
  @IsNotEmpty()
  discotecaId: string;

}
