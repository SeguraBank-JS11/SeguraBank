import { Cliente } from './../entities/cliente.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";


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

    async create(cliente: Cliente): Promise<Cliente> {
        return await this.clienteRepository.save(cliente);
    }

    async update(cliente: Cliente): Promise<Cliente> {
        
        let buscaCliente = await this.findById(cliente.id);

        if (!buscaCliente || !cliente.id)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);
        
        return await this.clienteRepository.save(cliente);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let buscaCliente = await this.findById(id);

        if (!buscaCliente)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

        return await this.clienteRepository.delete(id);

}

}