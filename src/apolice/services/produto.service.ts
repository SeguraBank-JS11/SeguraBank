import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";

/*
    @Injectable: Indica que é uma Classe de Serviço e pode ser inserida/injetada 
    diretamente em outras classes sem a necessidade de instância

    @InjectRepository(Produto): Decorator que inverte a dependência da Classe(Repository).
    Com isso, podemos criar objetos de Classes Repository sem precisar instanciar objetos.
    Além disso, indica ao Nest que a nossa Repository aponta para a Entidade Produto, isto é,
    os métodos de manipulação de BD dentro da Repository serão direcionados a tabela tb_produto
*/
@Injectable()
export class ProdutoService {

    // Inicia alguns recursos(Repository, Services) para a classe de Serviço funcionar
    constructor(
        @InjectRepository(Produto) // Aplica a inversão de dependência a nossa classe Repository
        private produtoRepository: Repository<Produto>,    // Criamos um Objeto da classe Repository voltado para Postagens
        private categoriaService: CategoriaService                    // Dentro do Construtor injetamos o categoriaService para podermos usar seus métodos 
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {    // Indica que queremos trazer também o relacionamento
                categoria: true,
                usuario: true
            }
        })
    }

    async findById(id: number): Promise<Produto> {
        // Verifica primeiro se a produto existe
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: {    // Indica que queremos trazer também o relacionamento
                categoria: true,
                usuario: true
            }
        })

        // Se a produto não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!produto) {
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND)
        }

        // Se a produto foi encontrada, retorna ela
        return produto
    }

    async findByTitulo(titulo: string): Promise<Produto[]> {
        // Verifica se existi produto com o parametro informado
        return await this.produtoRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {    // Indica que queremos trazer também o relacionamento
                categoria: true,
                usuario: true
            }
        })
    }

    async create(produto: Produto): Promise<Produto> {

        if (produto.categoria) {
            let categoria = await this.categoriaService.findById(produto.categoria.id)

            if (!categoria) {
                throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
            }

        }

        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {

        // Chama o método findById anteriro para pesquisar uma produto pelo id extraido do objeto produto
        let buscaProduto = await this.findById(produto.id);

        // Se a produto não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!buscaProduto || !produto.id) {
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        }

        if (produto.categoria) {
            let categoria = await this.categoriaService.findById(produto.categoria.id)

            if (!categoria) {
                throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
            }

        }

        // Se a produto foi encontrada, cadastra ela no BD e retorna ela
        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {

        // Chama o método findById anteriro para pesquisar uma produto pelo id extraido do objeto produto
        let buscaProduto = await this.findById(id);

        // Se a produto não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!buscaProduto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        // Se a produto foi encontrada, apaga ela no BD e retorna uma confirmação de exclusão
        return await this.produtoRepository.delete(id);

    }

}