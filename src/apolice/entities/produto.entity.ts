import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: "tb_produtos" })   // Indicando que a classe é uma Entitidade/Model
export class Produto {

    @PrimaryGeneratedColumn()   // Chave Primária e Auto Incremental
    id: number;

    @IsNotEmpty()   // Decorator usado para como Validador de Objetos no corpo da Requisição
    @Column({ length: 100, nullable: false })   // Tamanho Máximo: 100 | Regra do MySQL - NOT NULL
    titulo: string;

    @IsNumber()
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    valor: number;

    @IsNotEmpty()   // Decorator usado para como Validador de Objetos no corpo da Requisição
    @Column({ length: 100, nullable: false })   // Tamanho Máximo: 100 | Regra do MySQL - NOT NULL
    status: string;

    @IsNotEmpty()   // Decorator usado para como Validador de Objetos no corpo da Requisição
    @Column({ length: 100, nullable: false })   // Tamanho Máximo: 100 | Regra do MySQL - NOT NULL
    status: string;

    // Indica o lado MUITO do relacionamento, indicando que esse campo se conecta ao campo Produto da Model Categoria
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

    // Indica o lado MUITO do relacionamento, indicando que esse campo se conecta ao campo Produto da Model Usuario
    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}