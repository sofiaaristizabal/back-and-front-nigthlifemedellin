import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DiscotecasModule } from './discotecas/discotecas.module';
import { EventosModule } from './eventos/eventos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumidoresModule } from './consumidores/consumidores.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [UsuariosModule, DiscotecasModule, EventosModule,
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({

      type:'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities:true,
      synchronize:true,
      ssl:{
        rejectUnauthorized:false
      }
      /*type:'postgres',
      host:process.env.DB_HOST,
      port:+process.env.DB_PORT,
      username: process.env.DB_USER,
      password:process.env.DB_PASS,
      database:process.env.DB_NAME,
      autoLoadEntities:true,
      synchronize:true */
    }), ConsumidoresModule, ReservasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
