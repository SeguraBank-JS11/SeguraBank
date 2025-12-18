import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { Apolice } from './apolice/entities/apolice.entity';
import { ApoliceModule } from './apolice/apolice.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

// Decorator - Etiqueta de Metadados
@Module({
  imports: [  // Configurando o TypeORM

    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],

    }),
    ApoliceModule,
    CategoriaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }