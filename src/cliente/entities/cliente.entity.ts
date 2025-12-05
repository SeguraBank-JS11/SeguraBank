import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity ({name: "tb_clientes"})
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string 

    @IsNotEmpty()
    @Column({nullable: false})
    idade: number   

    @IsNotEmpty()
    @Column ({nullable: false })
    datanascimento: Date

    @IsNotEmpty()
    @Column ({length: 20, nullable: false})
    estadosaude: string
}