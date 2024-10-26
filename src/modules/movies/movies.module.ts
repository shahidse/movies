// src/movies/movies.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Category } from '../categories/category.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    ClientsModule.registerAsync([
      {
        name: 'RECOMMENDATION_SERVICE',
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 8877,
          },
        }),
        inject: [],
      },
    ]),
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
