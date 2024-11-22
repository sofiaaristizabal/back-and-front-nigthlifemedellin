import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { MinLength } from "class-validator";
import { Evento } from "src/eventos/entities/evento.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";

@Entity()
export class Discoteca{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text', {
        nullable:false
    })
    direccion:string;

    @Column('text', {
        nullable:false
    })
    latitud:string;

    @Column('text', {
        nullable:false
    })
    longitud:string;

    @Column('text', {
        nullable:true
    })
    descripcion:string;

    @Column('text', {
        nullable:true
    })
    horarios:string;

    @Column('text', {
        nullable:true,
        
    })
    contacto:string;

    @Column('text', {
        nullable:true
    })
    redSocial:string;

    @Column('text', {
        nullable:true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSvaiSV-1M4ifeVLW_XBYAUI9ucllKdvwHtA&s"
    })
    profileImage: string; 

    @Column('text', {unique:true})
    @MinLength(4)
    email:string;

    @Column('text')
    @MinLength(8)
    password:string;

    @Column('boolean', {default:true})
    isActive:boolean;

    @Column('text')
    @MinLength(1)
    fullName:string; 

    @Column('text')
    phoneNumber:string;


    @OneToMany(()=>Evento, (evento)=>evento.discoteca)
    eventos: Evento[];

    @ManyToOne(()=>Usuario, (usuario)=>usuario.discotecas)
    usuario:Usuario;
}
