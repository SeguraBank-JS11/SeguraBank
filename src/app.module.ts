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
<<<<<<< HEAD
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
=======
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_segurabank',
      entities: [Produto, Categoria, Usuario],
      synchronize: true,
>>>>>>> 3bec0aa3337d96b0b2fa20db1ff73e8881d93e14
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