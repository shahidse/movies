// src/movies/movie.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
  @Column({ default: 'http://example.com/john.png' })
  image: string;
  @Column()
  categoryId: number;

  @Column({ default: 1 })
  rating: number; // Average rating
}
