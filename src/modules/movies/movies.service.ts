// src/movies/movies.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../users/user.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @Inject('RECOMMENDATION_SERVICE') private client: ClientProxy,
  ) {}

  async findAll() {
    return this.moviesRepository.find();
  }
  async find(id) {
    return this.moviesRepository.find({
      where: {
        categoryId: id,
      },
    });
  }
  async searchMovies(query: string) {
    return this.moviesRepository
      .createQueryBuilder('movie')
      .where('movie.title LIKE :query', { query: `%${query}%` })
      .getMany();
  }
  async getRecommendedMovies(user: User) {
    const res = await this.client
      .send({ cmd: 'recommend-movies' }, user.id)
      .toPromise();
    return res;
  }
}
