import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";
import { ApiProperty } from "@nestjs/swagger"


@Entity({ name: "tb_categorias" })
export class Categoria {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    nome: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    descricao: string

    // Indica o lado UM do relacionamento, indicando que esse campo se conecta ao campo Usuario da Model Produto
    @OneToMany(() => Apolice, (apolice) => apolice.categoria)
    @ApiProperty()
    apolice: Apolice[]

}
