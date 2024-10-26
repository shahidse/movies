import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { MovieRating } from './rating.entity';
import { Movie } from '../movies/movie.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(MovieRating)
    private ratingsRepository: Repository<MovieRating>,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async updateProfile(id: any, updateData: Partial<User>) {
    const userExists = await this.usersRepository.findOne({ where: { id } });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.update(id, updateData);
    return this.usersRepository.findOne({ where: { id } });
  }

  async rateMovie(userId: any, movieId: any, rating: number) {
    // Validate the rating value
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    // Check if the user exists
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Find existing rating
    let movieRating = await this.ratingsRepository.findOne({
      where: { user: { id: userId }, movieId },
    });

    if (movieRating) {
      // Update existing rating
      movieRating.rating = rating;
      await this.ratingsRepository.save(movieRating);
    } else {
      // Create new rating
      movieRating = this.ratingsRepository.create({ user, movieId, rating });
      await this.ratingsRepository.save(movieRating);
    }

    // Calculate the new average rating for the movie
    const ratings = await this.ratingsRepository.find({
      where: { movieId },
    });

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
        : 0; // Handle case when there are no ratings

    // Update the movie's average rating (assuming you have a moviesRepository)
    const movie = await this.moviesRepository.findOne({
      where: { id: movieId },
    });
    if (movie) {
      movie.rating = averageRating;
      await this.moviesRepository.save(movie);
    }

    return movieRating;
  }

  async findById(id: any): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
