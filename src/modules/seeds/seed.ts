// src/seeds/seed.ts
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Movie } from '../movies/movie.entity';
import { MovieRating } from '../users/rating.entity';
import * as fs from 'fs';
import * as path from 'path';
import { initDb } from 'src/init-db';

// Function to get a random image from the static folder
const getRandomImage = () => {
  const imagesPath = path.join(__dirname, '../../../static/images'); // Path to your images
  const imageFiles = fs.readdirSync(imagesPath); // Read the files in the directory
  const randomIndex = Math.floor(Math.random() * imageFiles.length);
  return `static/images/${imageFiles[randomIndex]}`; // Return the image path
};

const seedData = async () => {
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = +process.env.DB_PORT || 3306;
  const dbUsername = process.env.DB_USERNAME || 'root';
  const dbPassword = process.env.DB_PASSWORD || '';
  const dbDatabase = process.env.DB_DATABASE || 'movies';

  // Initialize the database
  await initDb(dbHost, dbPort, dbUsername, dbPassword, dbDatabase);
  const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'movies',
    entities: [User, Category, Movie, MovieRating],
    synchronize: true,
  });

  // Create database if it doesn't exist
  await AppDataSource.initialize();
  await AppDataSource.query(
    `CREATE DATABASE IF NOT EXISTS ${AppDataSource.options.database}`,
  );
  await AppDataSource.query(`USE ${AppDataSource.options.database}`);

  // Close initial connection and reinitialize to synchronize entities
  await AppDataSource.destroy();
  await AppDataSource.initialize();

  // Seed categories
  const categories = ['Action', 'Horror', 'Comedy', 'Animated'];
  for (const name of categories) {
    const category = new Category();
    category.name = name;
    await AppDataSource.getRepository(Category).save(category);
  }

  // Seed movies with random images
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
    movie.image = getRandomImage(); // Assign a random image
    await AppDataSource.getRepository(Movie).save(movie);
  }

  await AppDataSource.destroy();
};

seedData().catch((error) => console.error(error));
