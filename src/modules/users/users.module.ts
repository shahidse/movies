import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MovieRating } from './rating.entity';
import { Movie } from '../movies/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, MovieRating, Movie])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
