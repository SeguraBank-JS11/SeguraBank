import { ClienteService } from '../services/cliente.service';
import { Cliente } from './../entities/cliente.entity';
import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

@Controller ("/clientes")
export class ClienteController {
constructor (private readonly clienteService: ClienteService) {}
@Get ()
@HttpCode (HttpStatus.OK)
findall(): Promise< Cliente[] > {
return this.clienteService.findAll();
}
}