// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { MovieRating } from '../users/rating.entity';
import { Movie } from '../movies/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, MovieRating, Movie]),
    JwtModule.register({
      secret: 'SECRET_KEY', // Replace with your own secret
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
