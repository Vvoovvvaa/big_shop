import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entityes/user.entity';
import { UserDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    return users.map(({ password, ...rest }) => rest);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User with such id was not found!');
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async delete(id: number) {
    const result = await this.userRepository.delete(id);
    if (!result.affected)
      throw new NotFoundException('User with such id was not found!');
  }

  async create(user: Omit<UserDTO, 'id'>) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}