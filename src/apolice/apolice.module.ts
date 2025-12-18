import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apolice } from "./entities/apolice.entity";
import { ApoliceService } from "./services/apolice.service";
import { ApoliceController } from "./controller/apolice.controller";
import { CategoriaModule } from "../categoria/categoria.module";
import { UsuarioModule } from "../usuario/usuario.module";

@Module({
    imports: [TypeOrmModule.forFeature([Apolice]), CategoriaModule, UsuarioModule],
    providers: [ApoliceService],
    controllers: [ApoliceController],
    exports: [ApoliceService],
})
export class ApoliceModule {}