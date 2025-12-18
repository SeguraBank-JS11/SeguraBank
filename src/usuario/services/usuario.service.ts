import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { ApoliceService } from '../../apolice/services/apolice.service';
// import { CategoriaService } from '../../categoria/services/categoria.service';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        // private apoliceService: ApoliceService,
        // private categoriaService: CategoriaService,
        private bcrypt: Bcrypt  // Dentro do Construtor injetamos o arquivo BCRYPT para podermos usar seus métodos
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async findById(id: number): Promise<Usuario> {
        let usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: {
                apolice: true
            }
        });

        if (!usuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async calcularIdade(usuario: Usuario): Promise<number> {
        const hoje = new Date();
        let nascimento = new Date(usuario.dataNascimento)
        let idade = hoje.getFullYear() - nascimento.getFullYear();

        if (hoje.getMonth() < nascimento.getMonth() ||
         (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())
        ){
            idade--;
        }

        return idade;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        let usuarioBusca = await this.findByUsuario(usuario.usuario);

        if (!usuarioBusca) {
            // Antes de cadastrar o usuario chamamos a função de Criptografia construída no arquivo bcrypt
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)

            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException("O Usuário ja existe!", HttpStatus.BAD_REQUEST);

    }

    async update(usuario: Usuario): Promise<Usuario> {
        let usuarioUpdate: Usuario = await this.findById(usuario.id) // Função para localizar o usuario pelo ID
        let usuarioBusca = await this.findByUsuario(usuario.usuario) // Função para localizar o usuario pelo email
        
        if (!usuarioUpdate)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        if (usuarioBusca && usuarioBusca.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado, digite outro!', HttpStatus.BAD_REQUEST);

        // let apolice = await this.apoliceService.findAll()
        // if (!apolice){
        //     // const idText = String(usuario)
        //     // const idNum = Number(idText);
        //     // let usuario = await this.usuarioService.findById(idNum)
        //     const idade = await this.calcularIdade(usuario)
        //     if (idade < 18)
        //         throw new HttpException('Este usuário já possui uma apólice de seguro e por isso não pode ter sua idade alterada para menos que 18 anos', HttpStatus.NOT_FOUND);
        // }


        // Antes de atualizar o usuario chamamos a função de Criptografia construída no arquivo bcrypt
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }
}