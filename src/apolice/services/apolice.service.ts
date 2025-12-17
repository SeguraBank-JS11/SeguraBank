import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Apolice } from "../entities/apolice.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class ApoliceService {
    constructor(
        @InjectRepository(Apolice)
        private apoliceRepository: Repository<Apolice>,
        private categoriaService: CategoriaService
    ) { }

    async findAll(): Promise <Apolice[]> {
        return await this.apoliceRepository.find({
            relations: {
                categoria: true,
            }
        });
    }

    async findById(id: number): Promise <Apolice> {

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

    async FindByTitulo(titulo: string): Promise <Apolice[]> {
        return await this.apoliceRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                categoria: true,
            }
        })
    }

    async create (apolice: Apolice): Promise <Apolice> {

        await this.categoriaService.findById(apolice.categoria.id)

        return await this.apoliceRepository.save (apolice);
    }

    async update (apolice: Apolice): Promise <Apolice> {

        await this.findById(apolice.id)

        await this.categoriaService.findById(apolice.categoria.id)

        return await this.apoliceRepository.save(apolice);
    }

    async delete (id: number): Promise <DeleteResult>{

        await this.findById(id)

        return await this.apoliceRepository.delete(id)
    }

}