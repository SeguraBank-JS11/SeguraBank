import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Apolice } from "../entities/apolice.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";
import { UsuarioService } from "../../usuario/services/usuario.service";

@Injectable()
export class ApoliceService {
    constructor(
        @InjectRepository(Apolice)
        private apoliceRepository: Repository<Apolice>,
        private categoriaService: CategoriaService,
        private usuarioService: UsuarioService
    ) { }

    async findAll(): Promise<Apolice[]> {
        return await this.apoliceRepository.find({
            relations: {
                categoria: true,
                usuario: true
            }
        });
    }

    async findById(id: number): Promise<Apolice> {

        const apolice= await this.apoliceRepository.findOne({
            where: {
                id
            }, 
            relations: {
                categoria: true,
            }
        });

        if (!apolice)
            throw new HttpException('Apólice não encontrada!', HttpStatus.NOT_FOUND);

        return apolice;
    }

    async FindByTitulo(titulo: string): Promise<Apolice[]> {
        return await this.apoliceRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                categoria: true,
            }
        })
    }

    async create(apolice: Apolice): Promise<Apolice> {
        
        await this.categoriaService.findById(apolice.categoria.id)

        let usuario = await this.usuarioService.findById(apolice.usuario.id) //Aqui busco o objeto usuário que quero e faço isso usando o ID onvertido que recebi do apolice
        
        const idade = await this.usuarioService.calcularIdade(usuario)//Mando o objeto usuario lá para o usuarioService para ver se ele é maior de idade
        
        if (idade < 18)
            throw new HttpException('Não elegível para este tipo de seguro', HttpStatus.NOT_FOUND);
        
        return await this.apoliceRepository.save (apolice);
    }

    async update(apolice:Apolice): Promise<Apolice> {

        await this.findById(apolice.id)

        await this.categoriaService.findById(apolice.categoria.id)

        let usuario = await this.usuarioService.findById(apolice.usuario.id)
        const idade = await this.usuarioService.calcularIdade(usuario)
        
        if (idade < 18)
            throw new HttpException('Não é elegível para este tipo de seguro', HttpStatus.NOT_FOUND);

        return await this.apoliceRepository.save(apolice);
    }

    async delete(id: number): Promise<DeleteResult>{

        await this.findById(id)

        return await this.apoliceRepository.delete(id)
    }

}