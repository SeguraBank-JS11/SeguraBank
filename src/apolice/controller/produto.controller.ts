import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)     // Colocando essa Anotação aqui, indica que todos os endpoints são protegidos
@Controller("/produto")   // Indica que a Classe é uma Controller
export class ProdutoController {

    // Dentro do Construtor injetamos o produtoService para podermos usar seus métodos
    constructor(private readonly produtoService: ProdutoService) { }

    @Get()// Indica que esse método lida com Requisições do Tipo GET
    @HttpCode(HttpStatus.OK)    // Monta a Resposta HTTP para o Cliente com o status 200
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();  // Invoca a Service e chama o método correspondente
    }

    // @Get("/:id_post") Indica que esse método lida com Requisições do Tipo GET e que no seu endpoint será enviado um id como parametro
    // @Param captura o paramêtro envia pelo endpoint e o atribui ao parametro do método findById(id:number)
    // ParseIntPipe converte o parametro do endpoint de string para int. Ex: id: '1' => id: 1
    @Get("/:id_post")
    @HttpCode(HttpStatus.OK)    // Monta a Resposa HTTP para o Cliente com o status 200
    findById(@Param('id_post', ParseIntPipe) id_post: number): Promise<Produto> {
        return this.produtoService.findById(id_post)
    }

    @Get('/titulo/:titulo') // postagens/titulo/{texto}
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('titulo') titulo: string): Promise<Produto[]> {
        return this.produtoService.findByTitulo(titulo);
    }

    // @Post() Indica que esse método lida com Requisições do Tipo Post
    // @Body() Captura/Extrai o objeto que vem pelo Corpo da Requisição e passa para parametro do método 
    @Post() // Usado quando queremos Cadastrar/Criar/Salva alguma informação
    @HttpCode(HttpStatus.CREATED)   // Monta a Resposa HTTP para o Cliente com o status 201
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }

    // @Put() Indica que esse método lida com Requisições do Tipo Put
    // @Body() Captura/Extrai o objeto que vem pelo Corpo da Requisição e passa para parametro do método 
    @Put()// Usado quando queremos Atualizar alguma informação
    @HttpCode(HttpStatus.OK) // Monta a Resposa HTTP para o Cliente com o status 200    
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }

    // @Delete('/:ID') Indica que esse método lida com Requisições do Tipo DELETE e que no seu endpoint será enviado um id como parametro
    // @Param captura o paramêtro envia pelo endpoint e o atribui ao parametro do método delete(id:number)
    // ParseIntPipe converte o parametro do endpoint de string para int. Ex: id: '1' => id: 1
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) // Monta a Resposa HTTP para o Cliente com o status 204
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.produtoService.delete(id);
    }

}