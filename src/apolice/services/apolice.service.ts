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

    async findAll(): Promise <Apolice[]> {
        return await this.apoliceRepository.find({
            relations: {
                categoria: true,
                usuario: true
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
        
        //######## PUXANDO O OBJETO apolice.usuario E CONVERTENDO ELE EM NUMBER
        // console.log(apolice.usuario)
        const idText = String(apolice.usuario)//Primeiro puxo somente o dado que está em apolice.usuario, ou seja, pego todo o objeto 'apolice' e depois pego o dado no campo 'usuario' (que aqui é somente o id)
        //Mesmo que apolice.usuario seja somente o id ainda assim ele é puxado como um objeto, por isso precisamos converter o objeto apolice.usuario em String

        const idNum = Number(idText); //E aqui convertemos a String em um Number
        /*Usando apolice.usuario.id estava voltando como vazio por isso precisamos da conversão acima*/
        let usuario = await this.usuarioService.findById(idNum) //Aqui busco o objeto usuário que quero e faço isso usando o ID convertido que recebi do apolice
        
        const idade = await this.usuarioService.calcularIdade(usuario)//Mando o objeto usuario lá para o usuarioService para ver se ele é maior de idade
        
        if (idade < 18)
            throw new HttpException('Não elegível para este tipo de seguro', HttpStatus.NOT_FOUND);
        
        return await this.apoliceRepository.save (apolice);
    }

    async update (apolice: Apolice): Promise <Apolice> {

        await this.findById(apolice.id)

        await this.categoriaService.findById(apolice.categoria.id)

        const idText = String(apolice.usuario)
        const idNum = Number(idText);
        let usuario = await this.usuarioService.findById(idNum)
        const idade = await this.usuarioService.calcularIdade(usuario)
        
        if (idade < 18)
            throw new HttpException('Não é elegível para este tipo de seguro', HttpStatus.NOT_FOUND);

        return await this.apoliceRepository.save(apolice);
    }

    async delete (id: number): Promise <DeleteResult>{

        await this.findById(id)

        return await this.apoliceRepository.delete(id)
    }

}