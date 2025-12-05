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
}