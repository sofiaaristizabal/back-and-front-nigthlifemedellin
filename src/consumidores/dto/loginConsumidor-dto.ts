import { IsString, IsEmail, Matches, MaxLength, MinLength } from "class-validator";

export class LoginConsumidorDto{

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(12)
    @MaxLength(50)
    password:string;
    
}