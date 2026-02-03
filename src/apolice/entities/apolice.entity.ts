import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: "tb_apolices"})
export class Apolice {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number 

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty()
    titulo: string

    @IsNotEmpty()
    @Column({nullable: false})
    @ApiProperty()
    valor: number    

    @IsNotEmpty()
    @Column({nullable: false})
    @ApiProperty()
    status: boolean    

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    @ApiProperty()
    descricao: string


    @ManyToOne(() => Categoria, (categoria) => categoria.apolice, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

    @ManyToOne(() => Usuario, (usuario) => usuario.apolice, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
    
}