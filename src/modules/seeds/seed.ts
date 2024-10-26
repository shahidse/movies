// src/seeds/seed.ts
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Movie } from '../movies/movie.entity';
import { MovieRating } from '../users/rating.entity';

const seedData = async () => {
  const AppDataSource = new DataSource({
    type: 'mysql', // Change to 'mysql'
    host: 'localhost',
    port: 3306, // Default MySQL port
    username: 'root',
    password: '',
    database: 'movies',
    entities: [User, Category, Movie, MovieRating],
    synchronize: true,
  });

  await AppDataSource.initialize();

  // Seed categories
  const categories = ['Action', 'Horror', 'Comedy', 'Animated'];
  for (const name of categories) {
    const category = new Category();
    category.name = name;
    await AppDataSource.getRepository(Category).save(category);
  }

  // Seed movies (example data)
  const movieData = [
    {
      title: 'Action Movie 1',
      description: 'An action-packed movie',
      categoryId: 1,
    },
    {
      title: 'Action Movie 2',
      description: 'More action awaits',
      categoryId: 1,
    },
    {
      title: 'Action Movie 3',
      description: 'Action like never before',
      categoryId: 1,
    },
    { title: 'Horror Movie 1', description: 'A scary movie', categoryId: 2 },
    {
      title: 'Horror Movie 2',
      description: 'More scares for the brave',
      categoryId: 2,
    },
    {
      title: 'Horror Movie 3',
      description: 'Terrifying thrills',
      categoryId: 2,
    },
    {
      title: 'Comedy Movie 1',
      description: 'Laugh out loud moments',
      categoryId: 3,
    },
    {
      title: 'Comedy Movie 2',
      description: 'A hilarious journey',
      categoryId: 3,
    },
    {
      title: 'Comedy Movie 3',
      description: 'More laughs guaranteed',
      categoryId: 3,
    },
    {
      title: 'Animated Movie 1',
      description: 'Fun for the whole family',
      categoryId: 4,
    },
    {
      title: 'Animated Movie 2',
      description: 'Colorful adventures await',
      categoryId: 4,
    },
    {
      title: 'Animated Movie 3',
      description: 'Animation at its best',
      categoryId: 4,
    },
    {
      title: 'Action Movie 4',
      description: 'Thrilling chases and fights',
      categoryId: 1,
    },
    { title: 'Comedy Movie 4', description: 'Laughter and joy', categoryId: 3 },
    {
      title: 'Horror Movie 4',
      description: 'The fear continues',
      categoryId: 2,
    },
  ];

  for (const data of movieData) {
    const movie = new Movie();
    Object.assign(movie, data);
    await AppDataSource.getRepository(Movie).save(movie);
  }

  await AppDataSource.destroy();
};

seedData().catch((error) => console.error(error));
