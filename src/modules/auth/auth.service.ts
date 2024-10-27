import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(
    name: string,
    address: string,
    dob: Date,
    password: string,
    image?: string,
    categories?: string[],
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      name,
      address,
      dob,
      password: hashedPassword,
      categories,
      image,
    });
    return this.usersRepository.save(user);
  }

  async login(name: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { name } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username: user.name, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        id: user.id,
        name: user.name,
        dob: user.dob,
        address: user.address,
        categories: user.categories,
      };
    }
    return null;
  }
}
