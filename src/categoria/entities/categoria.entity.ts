import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";


@Entity({ name: "tb_categorias" })
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    descricao: string

    // Indica o lado UM do relacionamento, indicando que esse campo se conecta ao campo Usuario da Model Produto
    @OneToMany(() => Apolice, (apolice) => apolice.categoria)
    apolice: Apolice[]

}
