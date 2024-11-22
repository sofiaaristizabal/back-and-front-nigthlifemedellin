import { IsString,  MinLength, MaxLength, IsNotEmpty,   IsUrl, IsOptional, IsEmail, Matches, IsNumberString } from "class-validator";
import { CreateUsuarioDto } from "src/usuarios/dto/create-usuario.dto";

export class CreateDiscotecaDto{

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password too weak' })
    password:string;
    
    @IsString()
    @MinLength(1)
    fullName:string;

    @IsString()
    @MinLength(7)
    phoneNumber:string; 

    @IsString()
    latitud:string; 

    @IsString()
    longitud:string; 

    @IsString()
    @MinLength(5)
    @MaxLength(50)
    direccion:string;

    @IsUrl()
    @IsOptional()
    profileImage:string;

    @IsString()
    @MaxLength(300)
    @IsOptional()
    descripcion:string;

    @IsString()
    @IsOptional()
    horarios:string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    contacto:string;

    @IsString()
    @IsUrl( {}, { message: 'Invalid URL format' })
    @IsOptional()
    redSocial:string;

    @IsString()
    @IsOptional()
    menu:string;
}
