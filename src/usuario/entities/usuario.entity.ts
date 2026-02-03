import { IsDate, IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Apolice } from "../../apolice/entities/apolice.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity({ name: "tb_usuarios" })    // Indicando que a classe é uma Entitidade/Model
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    senha: string

    @IsNotEmpty()
    @Column({ type: 'date', nullable: false })
    @ApiProperty()
    dataNascimento: Date;

    @Column({ length: 5000 })
    @ApiProperty()
    foto: string

    @IsNotEmpty()
    @Column({ length: 10, nullable: false })
    @ApiProperty()
    tipo: string

    // Indica o lado UM do relacionamento, indicando que esse campo se conecta ao campo Usuario da Model Produto
    @OneToMany(() => Apolice, (apolice) => apolice.usuario)
    @ApiProperty()
    apolice: Apolice[]

}