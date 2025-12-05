import { ClienteService } from '../services/cliente.service';
import { Cliente } from './../entities/cliente.entity';
import { Controller, Get, HttpCode, HttpStatus, Post, Put, Delete, Body, Param, ParseIntPipe } from "@nestjs/common";

@Controller ("/clientes")
export class ClienteController {
constructor (private readonly clienteService: ClienteService) {}
@Get ()
@HttpCode (HttpStatus.OK)
findall(): Promise< Cliente[] > {
return this.clienteService.findAll();
}

 @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clienteService.findById(id);
  }


@Post()
@HttpCode(HttpStatus.CREATED)
  create(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.create(cliente);
  }

@Put()
@HttpCode(HttpStatus.OK)
  update(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.update(cliente);
  }

@Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.clienteService.delete(id);
}

@Get('/nome/:nome')
@HttpCode (HttpStatus.OK)
findByNome(@Param('nome') nome: string): Promise<Cliente[]>{
return this.clienteService.findByNome(nome);
};

@Get('/estadosaude/:estadosaude')
@HttpCode (HttpStatus.OK)
findByEstadoSaude(@Param('estadosaude') estadosaude: string): Promise<Cliente[]>{
return this.clienteService.findByEstadoSaude(estadosaude);
}
}