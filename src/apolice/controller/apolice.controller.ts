import { Body, Controller, Delete, Get,  HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Apolice } from "../entities/apolice.entity";
import { ApoliceService } from "../services/apolice.service";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)     // Colocando essa Anotação aqui, indica que todos os endpoints são protegidos

@ApiTags('Apolice')
@ApiBearerAuth()
@Controller("/apolices")
export class ApoliceController {
    constructor(private readonly apoliceService: ApoliceService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise <Apolice[]> {
        return this.apoliceService.findAll();
    }

    @Get ('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number ): Promise <Apolice> {
        return this.apoliceService.findById(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findAllByTitulo(@Param('titulo') titulo: string): Promise <Apolice[]>{
        return this.apoliceService.FindByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() apolice: Apolice): Promise <Apolice> {
        return this.apoliceService.create(apolice);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() apolice: Apolice): Promise <Apolice> {
        return this.apoliceService.update(apolice);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number ){
        return this.apoliceService.delete(id);
    }

}