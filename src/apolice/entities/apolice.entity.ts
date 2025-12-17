import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: "tb_apolices"})
export class Apolice {

    @PrimaryGeneratedColumn()
    id: number 

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string

    @IsNotEmpty()
    @Column({nullable: false})
    valor: number    

    @IsNotEmpty()
    @Column({nullable: false})
    status: boolean    

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
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