import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() userData: Omit<UserDTO, 'id'>) {
    return this.usersService.create(userData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}