import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entityes/user.entity';
import { RegisterDTO } from './dto/resgister.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDTO): Promise<{ access_token: string }> {
    const existingEmail = await this.userRepository.findOne({ where: { email: registerDto.email } });
    if (existingEmail) {
      throw new ConflictException('User with this email already are created');
    }

    const existingPhone = await this.userRepository.findOne({ where: { phone: registerDto.phone } });
    if (existingPhone) {
      throw new ConflictException('User with this phone number are created');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    const newUser = this.userRepository.create({ ...registerDto, password: hashedPassword });
    const savedUser = await this.userRepository.save(newUser);

    const payload = { sub: savedUser.id, email: savedUser.email };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async login(loginDto: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
