import { Body, Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/users.dto';
import { AuthGuard } from 'src/guards/RoleGuards/AuthGuards/auth.guard';
import { RolesGuard } from 'src/guards/RoleGuards/role.guard';
import { Roles } from 'src/decorators/role.decorator';

@UseGuards(AuthGuard,RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @Roles('admin','manager')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('manager','admin')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Roles('admin')
  create(@Body() userData: Omit<UserDTO, 'id'>) {
    return this.usersService.create(userData);
  }

  @Delete(':id')
  @Roles("admin")
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}