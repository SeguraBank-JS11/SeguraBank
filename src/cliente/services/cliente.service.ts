import { Cliente } from './../entities/cliente.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";


@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>
    ) { }

    async findAll(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
    }

    async findById(id: number): Promise<Cliente> {

        let cliente = await this.clienteRepository.findOne({
            where: {
                id
            }
        });

        if (!cliente)
            throw new HttpException('Cliente não encontrada!', HttpStatus.NOT_FOUND);

        return cliente;
    }

    async findByNome(nome: string): Promise<Cliente[]> {
        return await this.clienteRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            }
        })
    }

}

