import { PartialType } from "@nestjs/mapped-types";
import { CreateDiscotecaDto } from "./create-discoteca.dto";
import { IsString, IsUrl } from "class-validator";

export class UpdateImageDto  extends PartialType(CreateDiscotecaDto){

    @IsString()
    @IsUrl()
    profileImage: string; 
}