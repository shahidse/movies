// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MoviesModule } from './modules/movies/movies.module';
import { User } from './modules/users/user.entity';
import { Category } from './modules/categories/category.entity';
import { Movie } from './modules/movies/movie.entity';
import { MovieRating } from './modules/users/rating.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('config.database.host');
        const port = configService.get<number>('config.database.port');
        const username = configService.get<string>('config.database.username');
        const password = configService.get<string>('config.database.password');
        const database = configService.get<string>('config.database.database');
        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          entities: [User, Category, Movie, MovieRating],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MoviesModule,
    CategoriesModule,
  ],
})
export class AppModule {}
